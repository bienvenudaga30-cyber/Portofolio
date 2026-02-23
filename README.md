# Portfolio — [Bienvenu DAGA]

> Data Analyst & Designer-Développeur · Sèmè City Institute of Technology

Portfolio minimaliste, mobile-first, sans dépendance externe lourde.

---

## 🗂 Arborescence

```
portfolio/
├── index.html              ← Page principale
├── css/
│   └── style.css           ← Tous les styles
├── js/
│   └── main.js             ← Interactions (menu, scroll, fade-in)
├── images/
│   ├── logo.png            ← Logo (utilisé comme favicon)
│   ├── profile.jpg         ← Votre photo (section Hero)
│   └── projects/
│       ├── sakila.jpg      ← Image projet Sakila
│       └── mimic.jpg       ← Image projet MIMIC-III
└── README.md
```

---

## 🎨 Design System

| Élément       | Valeur                        |
|---------------|-------------------------------|
| Fond          | `#0A0A0A` (noir profond)      |
| Texte         | `#F5F4F0` (blanc cassé)       |
| Accent        | `#C8F04D` (citron électrique) |
| Gris texte    | `#C0BDB5`                     |
| Font display  | **Syne** (Google Fonts)       |
| Font body     | **DM Sans** (Google Fonts)    |

---

## ✏️ Personnalisation rapide

1. **Votre nom** : Remplacez toutes les occurrences de `[Votre Nom]` dans `index.html` et `css/style.css`
2. **Email** : Remplacez `votre@email.com` dans les liens `mailto:`
3. **Liens sociaux** : Mettez à jour les URLs LinkedIn et GitHub
4. **Photo** : Placez votre photo dans `images/profile.jpg`
5. **Logo** : Placez votre logo dans `images/logo.png`
6. **Images projets** : Ajoutez `sakila.jpg` et `mimic.jpg` dans `images/projects/`
7. **Disponibilité** : Modifiez le texte du badge dans la section Hero si besoin
8. **Projet 3** : Remplacez la carte "Prochain projet" quand vous aurez un 3ème projet

---

## 🚀 Déploiement

### GitHub Pages (gratuit)

```bash
# 1. Initialiser un dépôt Git
git init
git add .
git commit -m "Initial portfolio"

# 2. Créer un repo GitHub nommé : votrenom.github.io
# 3. Pousser le code
git remote add origin https://github.com/votrenom/votrenom.github.io.git
git branch -M main
git push -u origin main

# ✅ Accessible sur : https://votrenom.github.io
```

### Netlify (drag & drop)

1. Allez sur [netlify.com](https://netlify.com) → **Add new site**
2. Faites glisser le dossier `portfolio/` dans la zone de dépôt
3. ✅ Le site est en ligne en 30 secondes avec une URL Netlify

### Netlify via CLI

```bash
npm install -g netlify-cli
netlify deploy --dir=. --prod
```

---

## 📋 Checklist avant mise en ligne

- [ ] Remplacer `[Votre Nom]` partout
- [ ] Ajouter `images/logo.png`
- [ ] Ajouter `images/profile.jpg`
- [ ] Ajouter `images/projects/sakila.jpg`
- [ ] Ajouter `images/projects/mimic.jpg`
- [ ] Mettre à jour email et liens sociaux
- [ ] Tester sur mobile (Chrome DevTools)
- [ ] Ajouter les URLs des projets dans les boutons "Voir le projet →"

---

## 🛠 Technologies

- HTML5 sémantique
- CSS3 (variables, Grid, Flexbox, animations)
- JavaScript Vanilla ES6+
- Google Fonts (Syne + DM Sans)
- Aucun framework — zéro dépendance

---

*Conçu & développé avec soin.*
