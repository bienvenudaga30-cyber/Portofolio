// server.js - Backend simple pour gérer les emails
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route pour envoyer les emails
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, company, message } = req.body;
        
        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
        }
        
        // Configuration du transporteur
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        
        // Email pour vous
        const mailOptionsToYou = {
            from: process.env.EMAIL_USER,
            to: 'bienvenudaga30@gmail.com',
            subject: `Nouveau message portfolio de ${name}`,
            text: `
Nom: ${name}
Email: ${email}
Entreprise: ${company || 'Non spécifié'}
Message: ${message}
            
Date: ${new Date().toLocaleString('fr-FR')}
            `,
            html: `
<h2>Nouveau message depuis votre portfolio</h2>
<p><strong>Nom:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Entreprise:</strong> ${company || 'Non spécifié'}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
<hr>
<p><em>Envoyé le ${new Date().toLocaleString('fr-FR')}</em></p>
            `
        };
        
        // Email de confirmation pour le visiteur
        const mailOptionsToVisitor = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirmation - Message reçu',
            text: `Bonjour ${name},

Merci de m'avoir contacté. J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.

Cordialement,
Bienvenu DAGA
            `,
            html: `
<h2>Confirmation de réception</h2>
<p>Bonjour ${name},</p>
<p>Merci de m'avoir contacté. J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.</p>
<p>Cordialement,<br><strong>Bienvenu DAGA</strong></p>
            `
        };
        
        // Envoyer les emails
        await transporter.sendMail(mailOptionsToYou);
        await transporter.sendMail(mailOptionsToVisitor);
        
        res.json({ success: true, message: 'Email envoyé avec succès' });
        
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
