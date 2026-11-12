# Mradul Varshney: Portfolio

Personal portfolio, hosted at **https://mradulv.vercel.app**.

Built with React, Vite, Tailwind CSS, Framer Motion and Three.js (react-three-fiber).

## Develop

```bash
cd client
npm install
npm start        # dev server
npm run build    # production build in client/dist
```

## Editing content

All text, projects, experience and links live in [`client/src/Data/profile.js`](client/src/Data/profile.js).
The components only render what is in that file.

To show a resume button, put the PDF in `client/public/` and set `profile.resume` to its path.

## Contact form

The form sends via EmailJS when these env vars are set (e.g. in Vercel). Otherwise it falls back to a `mailto:` link.

```
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```
