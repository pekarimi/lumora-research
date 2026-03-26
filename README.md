# Lumora Research Website

## Quick Start (run locally)

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v16 or higher)

### Steps

1. **Unzip** this folder somewhere on your computer

2. **Open Terminal** and navigate to the folder:
   ```
   cd lumora-local
   ```

3. **Install dependencies:**
   ```
   npm install
   ```

4. **Start the development server:**
   ```
   npm start
   ```

5. The site will open automatically at **http://localhost:3000**

## Deploying to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect it as a React app and deploy it
4. You can then add a custom domain (e.g., lumoraresearch.com)

## Project Structure

```
lumora-local/
├── package.json          # Dependencies & scripts
├── public/
│   └── index.html        # HTML shell
├── src/
│   ├── index.js          # Entry point
│   └── lumora-research.jsx  # Main component (all code here)
└── README.md
```

## Notes

- All styles are embedded in the JSX file (no separate CSS files needed)
- Project images are currently base64-encoded for preview; swap them with file paths for production
- To replace the headshot placeholder, add your photo to `public/` and update the component
# lumora-research
