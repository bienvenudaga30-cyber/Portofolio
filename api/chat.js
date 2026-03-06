// =============================================================
//  Vercel Serverless Function — Proxy sécurisé pour Gemini API
//  Fichier : /api/chat.js
//
//  SETUP Vercel :
//  Settings → Environment Variables → Ajouter :
//  GEMINI_API_KEY = AIzaSy... (votre clé Google AI Studio)
// =============================================================

export default async function handler(req, res) {

  // ── CORS ──────────────────────────────────────────────────
  const allowedOrigins = [
    'https://bienvenudaga.vercel.app',
    'https://bienvenudaga30-cyber.github.io',  // ← votre GitHub Pages
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── Validation ────────────────────────────────────────────
  const { question, language } = req.body;
  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'Question manquante.' });
  }
  if (question.length > 500) {
    return res.status(400).json({ error: 'Question trop longue (max 500 caractères).' });
  }

  // ── Contexte portfolio ────────────────────────────────────
  const lang = language || 'fr';
  const repLang = lang === 'fr' ? 'français' : lang === 'es' ? 'espagnol' : lang === 'de' ? 'allemand' : 'anglais';

  const systemPrompt = `
Tu es l'assistant IA du portfolio de Bienvenu DAGA. Réponds en ${repLang}.
Sois concis (3-5 phrases max), chaleureux et professionnel.
Réponds UNIQUEMENT en te basant sur ces informations :

IDENTITÉ
Nom : Kossoba Destin Bienvenu DAGA
Rôle : Étudiant en Digitalisation & Data Science
École : Sèmè City Institute of Technology and Innovation (SCITI), Cotonou, Bénin

CONTACT
Email : bienvenudaga30@gmail.com
LinkedIn : linkedin.com/in/kossoba-destin-bienvenu-daga-4496b8396
GitHub : github.com/bienvenudaga30-cyber

COMPÉTENCES
Data : Python, R, SQL, Machine Learning, Statistiques, Pandas, NumPy, Matplotlib, Seaborn
Design : UI/UX, Figma, Motion Design, Identité visuelle, Branding
Build : HTML, CSS, JavaScript, Responsive, GitHub, Netlify, SEO

PROJETS
1. Mortalité & durée de séjour en ICU — base MIMIC-III — Python, Pandas, Seaborn
2. Analyse commerciale Vidéothèque Sakila — SQL, Python, R, Dashboard

PARCOURS
2025 : Étudiant SCITI — Digitalisation & Data Science
2025 : Projet ICU MIMIC-III
2025 : Projet Sakila Business Analytics

PHILOSOPHIE
"La data rencontre le design. L'analytique rencontre la créativité."
Ouvert aux collaborations, stages, freelance et opportunités académiques.

Si la question ne concerne pas ce portfolio, réponds poliment que tu ne peux répondre qu'aux questions sur Bienvenu DAGA.
`.trim();

  // ── Appel Gemini API ──────────────────────────────────────
  try {
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt + '\n\nQuestion : ' + question.trim() }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Gemini API error:', err);
      return res.status(502).json({ error: 'Erreur API Gemini. Vérifiez votre clé.' });
    }

    const data  = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Désolé, pas de réponse.';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Erreur serveur interne.' });
  }
}
