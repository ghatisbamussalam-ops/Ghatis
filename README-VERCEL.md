# Ghatis Bamussalam — Vercel deployment package

This is a static website (HTML, CSS, JavaScript and images). The website files are at the project root; `index.html` is the entry page.

## Deploy with Vercel

Vercel's usual dashboard workflow imports a Git repository. If you are using only a phone, the simplest reliable route is:
1. Create a repository on GitHub.
2. Upload/extract all files in this package into the repository root (keep the `assets/` folder).
3. In Vercel, choose **Add New → Project**, import that repository, and deploy.
4. Leave the framework preset as **Other** and do not set a build command. The output directory should be the project root (`.`) / default static output.

If you already have a Vercel project connected to a GitHub repository, upload these files to that repository and Vercel should redeploy automatically.

`vercel.json` adds basic security headers and browser caching for assets. No build step is required.
