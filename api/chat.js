// =============================================================
//  Vercel Serverless Function — Proxy sécurisé pour Claude API
//  Fichier : /api/chat.js
//  
//  SETUP :
//  1. Créez un compte sur https://vercel.com
//  2. Dans votre dashboard Vercel → Settings → Environment Variables
//     Ajoutez : ANTHROPIC_API_KEY = sk-ant-votre-vraie-clé
//  3. Déployez avec : vercel deploy (ou push sur GitHub lié à Vercel)
// =============================================================

export default async function handler(req, res) {

  // ── CORS : autoriser uniquement votre domaine ──────────────
  // Remplacez par votre vrai domaine en production
  const allowedOrigins = [
    'https://bienvenudaga.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:5500',    // Live Server VS Code
    'http://localhost:5500',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ── Préflight OPTIONS ──────────────────────────────────────
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ── Seule méthode acceptée ─────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Récupération de la question ────────────────────────────
  const { question, language } = req.body;
  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'Question manquante ou invalide.' });
  }

  // ── Sécurité : longueur max ────────────────────────────────
  if (question.length > 500) {
    return res.status(400).json({ error: 'Question trop longue (max 500 caractères).' });
  }

  // ── Contexte portfolio (système prompt) ───────────────────
  const lang = language || 'fr';
  const systemPrompt = `
Tu es l'assistant IA du portfolio de Bienvenu DAGA. Réponds en ${lang === 'fr' ? 'français' : lang === 'es' ? 'espagnol' : lang === 'de' ? 'allemand' : 'anglais'}.
Sois concis (3-5 phrases max), chaleureux et professionnel.
Réponds UNIQUEMENT en te basant sur ces informations :

━━━ IDENTITÉ ━━━
Nom complet : Kossoba Destin Bienvenu DAGA
Rôle : Étudiant en Digitalisation & Data Science
Établissement : Sèmè City Institute of Technology and Innovation (SCITI), Cotonou, Bénin
Localisation : Cotonou, Bénin, Afrique de l'Ouest

━━━ CONTACT ━━━
Email : bienvenudaga30@gmail.com
LinkedIn : linkedin.com/in/kossoba-destin-bienvenu-daga-4496b8396
GitHub : github.com/bienvenudaga30-cyber
Site web : bienvenudaga.vercel.app

━━━ COMPÉTENCES ━━━
Data : Python, R, SQL, Machine Learning, Statistiques, Data Visualization, Pandas, NumPy, Matplotlib, Seaborn
Design : UI/UX Design, Figma, Motion Design, Identité visuelle, Design graphique, Vidéo publicitaire, Print & Branding
Build : HTML, CSS, JavaScript, Sites responsives, Mobile-first, Performance web, GitHub, Netlify, SEO

━━━ PROJETS ━━━
1. Mortalité & durée de séjour en ICU hospitalière
   - Base de données : MIMIC-III
   - Technologies : Python, Pandas, Matplotlib, Seaborn, EDA
   - Description : Analyse exploratoire approfondie pour identifier des indicateurs clés de santé en soins intensifs. Visualisations synthétisant des informations médicales denses en insights actionnables.

2. Analyse des tendances commerciales — Vidéothèque Sakila
   - Technologies : SQL, Python, R, Dashboard, Business Analytics
   - Description : Interrogation et nettoyage de la base Sakila pour révéler préférences clients, pics saisonniers et performances films. Dashboards pour décisions stratégiques.

━━━ PARCOURS ━━━
2025 – présent : Étudiant en Digitalisation & Data Science, SCITI / Sèmè City
2025 : Projet ICU MIMIC-III (analyse de données médicales)
2025 : Projet Sakila Business Analytics

━━━ LANGUES ━━━
Français (courant), Anglais (intermédiaire)

━━━ PHILOSOPHIE ━━━
"La data rencontre le design. L'analytique rencontre la créativité."
Bienvenu combine la rigueur analytique d'un data scientist et l'agilité créative d'un designer-développeur.
Ouvert aux collaborations, projets data, stages et opportunités freelance ou académiques.

Si on te demande quelque chose hors de ce contexte, réponds poliment que tu ne peux répondre qu'aux questions concernant le portfolio de Bienvenu DAGA.
`.trim();

  // ── Appel à l'API Anthropic ────────────────────────────────
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,   // ← clé sécurisée côté serveur
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',  // Rapide et économique pour le Q&A
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: question.trim() }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', err);
      return res.status(502).json({ error: 'Erreur API Anthropic. Veuillez réessayer.' });
    }

    const data = await response.json();
    const reply = data.content?.map(b => b.text || '').join('') || '';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Erreur serveur interne.' });
  }
}
