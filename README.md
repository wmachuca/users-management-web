# Proyecto base React (Vite)

Estructura mínima y entendible para iniciar rápido un proyecto en React.

## Estructura de directorios

```
.
├── index.html
├── package.json
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Header.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── assets/           # (opcional) imágenes, fuentes, etc.
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── vite.config.js
└── .gitignore
```

- `src/components/`: Componentes reutilizables.
- `src/pages/`: Vistas/páginas de la app.
- `src/assets/`: Recursos estáticos (opcional, también puedes usar `public/`).

## Requisitos
- Node.js 18+

## Scripts
- `npm run dev`: Levanta el servidor de desarrollo.
- `npm run build`: Genera la build de producción en `dist/`.
- `npm run preview`: Sirve localmente la build generada.

## Inicio rápido

```bash
npm install
npm run dev
```

Abre el navegador en la URL que indique Vite (por defecto: http://localhost:5173).

## Notas
- Este proyecto usa Vite por su simplicidad y velocidad.
- Si prefieres TypeScript, se puede migrar fácilmente cambiando archivos a `.tsx` y agregando `typescript` + configuración.


## Tailwind CSS

Este proyecto viene configurado con Tailwind CSS.

Cómo usarlo:
- Clona/instala dependencias: `npm install`
- Ejecuta en desarrollo: `npm run dev`
- Usa utilidades de Tailwind directamente en `className`, p. ej.:
  - `<div className="p-4 bg-slate-800 text-gray-100">Hola</div>`

Configuración relevante:
- `tailwind.config.js`: paths de contenido `./index.html` y `./src/**/*.{js,jsx,ts,tsx}`
- `postcss.config.js`: habilita `tailwindcss` y `autoprefixer`
- `src/index.css`: incluye `@tailwind base; @tailwind components; @tailwind utilities;`

Nota: Puedes combinar utilidades de Tailwind con estilos propios en `src/index.css` o módulos CSS.
