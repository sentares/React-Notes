````md
# 📝 Notes App

A modern, fast, and feature-rich Markdown note-taking app built with **React 19**, **TypeScript**, and **Vite 6**. It includes beautiful UI components from Mantine, Firebase integration, live Markdown preview with syntax highlighting, and Progressive Web App (PWA) support.

---

## 🚀 Tech Stack

- **React 19** + **React DOM**
- **TypeScript 5**
- **Vite 6** + [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react-swc)
- **Mantine 8** (`core`, `form`, `modals`, `hooks`)
- **React Router DOM v7** for routing
- **Firebase 11** for backend/data storage
- **SimpleMDE**, **Marked**, and **Prism** for Markdown editing & highlighting
- **PWA support** via `vite-plugin-pwa`

---

## 📦 Installation

```bash
npm install
````

---

## 📂 Available Scripts

| Script            | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Run the app in development mode |
| `npm run build`   | Build the app for production    |
| `npm run preview` | Preview the production build    |
| `npm run lint`    | Run ESLint against the codebase |

---

## ✨ Features

* 📝 Write and preview **Markdown** with code highlighting
* 🌗 Fully themeable with **dark/light mode**
* 💡 Syntax highlighting powered by **Prism**
* 🧠 Form validation with **Mantine Form**
* 🔥 Integration with **Firebase** for storage and auth
* ⚙️ Type-safe, modular, and scalable codebase
* 📲 PWA-ready for offline usage


---


## 🔐 Environment Variables

Create a `.env` file in the root to provide your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
...
```

---

## 🔌 PWA Support

`vite-plugin-pwa` is used to make the app installable and usable offline. Be sure to configure your `vite.config.ts` accordingly.
