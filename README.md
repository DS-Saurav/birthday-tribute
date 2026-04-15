# 🎂 Birthday Tribute Website

A premium, glassmorphism-style birthday tribute site built with **React + Vite + Tailwind CSS**.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## 🌍 Deploy to Vercel / Netlify

```bash
npm run build
# Then drag the /dist folder to netlify.com/drop
# OR connect your GitHub repo to Vercel
```

---

## ✏️ Personalize (src/App.jsx — top of file)

| Variable           | What to change                       |
|--------------------|--------------------------------------|
| `HER_NAME`         | Her name                             |
| `TOGETHER_SINCE`   | Your relationship start date         |
| `HERO_SUBTITLE`    | Hero subtitle line                   |
| `TIMELINE`         | Captions / dates for each photo      |
| `GALLERY`          | Notes for each gallery photo         |
| `REASONS`          | Your personal reasons                |

---

## 🎵 Add Music

Drop a file named **`music.mp3`** into the `/public/` folder.
Romantic suggestions: *Perfect – Ed Sheeran*, *Can't Help Falling in Love*, or any personal song.

---

## 📁 Directory Structure

```
birthday-tribute/
├── public/
│   ├── images/          ← All 17 photos (img1.jpg – img17.jpg)
│   └── music.mp3        ← ADD YOUR SONG HERE
├── src/
│   ├── App.jsx          ← Main app + all sections
│   ├── index.css        ← Glassmorphism styles + animations
│   └── main.jsx         ← Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ✨ Features

- 💫 **Sparkle / heart cursor trail** — follows mouse & touch
- 🌌 **Animated starfield** background
- 🌸 **Floating petals** on hero
- 📖 **Animated timeline** with scroll-reveal
- 🖼️ **Memory grid** with handwritten-note modals
- 🎠 **3D carousel** of reasons
- ⏱️ **Live days counter** (days / hours / minutes / seconds)
- 🎂 **Virtual cake** + gold confetti explosion
- 🎵 **Background music player** with visualizer
- 📱 **Mobile-first** responsive design
