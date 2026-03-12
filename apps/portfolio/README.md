# Navneet Dabral — Portfolio

A modern, high-performance static portfolio built with the 2026 frontend stack. 

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## 🚀 Tech Stack Highlights
Migrated from an old Next.js setup to a fully static Astro application:
- **[Astro](https://astro.build/)**: 100/100 Lighthouse performance with zero-JS static output.
- **[React 19](https://react.dev/)**: Used via Astro Islands (`client:load`) strictly for the interactive UIs. 
- **[Tailwind CSS v4](https://tailwindcss.com/)**: CSS-first configuration powered by Lightning CSS.
- **[Motion](https://motion.dev/)**: The rebranded Framer Motion for buttery-smooth React component animations.
- **GitHub Actions**: Automated CI/CD directly publishing to GitHub Pages.

## 🧞 Getting Started

First, install dependencies:
```bash
npm install
```

Start the local development server:
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) right in your browser. Astro's HMR will instantly reflect any code changes.

## 📁 Project Structure

```text
/
├── src/
│   ├── components/       # Interactive React islands (experiece, tech, nav)
│   ├── layouts/          # Astro shell layouts (Layout.astro)
│   ├── pages/            # Astro rendering pages (index.astro mounts the React islands)
│   └── styles/           # Global Tailwind CSS definitions
├── public/               # Static assets like images
├── .github/workflows/    # CI/CD action script
└── astro.config.ts       # Astro core configuration
```

## 🌍 Deployment

This site is statically exported using `output: 'static'` inside Astro and uses a GitHub Actions workflow (`.github/workflows/astro.yml`) to automatically build and deploy the `dist/` directory to GitHub Pages upon every push to the `master` branch.
