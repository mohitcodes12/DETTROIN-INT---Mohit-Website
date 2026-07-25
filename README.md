# Krishna International School — Website Redesign

> Submission for the Dettroin Full Stack Developer Internship — Round 1 (Website Redesign Challenge)

**Full Name:** [YOUR FULL NAME]
**Intern ID:** [YOUR INTERN ID]
**Email Address:** [YOUR EMAIL]
**GitHub Username:** [YOUR GITHUB USERNAME]
**Selected Website:** https://kisaligarh.com/ (Krishna International School, Aligarh)
**Live Demo Link:** [PASTE YOUR VERCEL URL HERE AFTER DEPLOYING]

## Technologies Used
- HTML5
- CSS3 (custom properties / design tokens, no framework)
- Vanilla JavaScript (no libraries)
- Google Fonts (Fraunces, Inter, IBM Plex Mono)
- Deployed on Vercel

## Key Improvements Made
The original site (kisaligarh.com) is a small, dated, non-responsive page with
outdated content (references to the 2015 session) and no consistent visual
identity. This redesign:

- **Modern visual identity:** introduced a deliberate navy / gold / forest-green
  palette and a serif + sans type pairing, replacing the ad-hoc default styling
  of the original.
- **Responsive layout:** fully responsive from mobile to desktop using CSS Grid
  and Flexbox, with a collapsible mobile navigation menu.
- **Improved navigation & structure:** split content into clear pages (Home,
  About, Academics, Admissions, Contact) instead of one dense homepage.
- **Accessibility:** visible keyboard focus states, semantic HTML, alt text on
  images, and reduced-motion support for the animated ticker.
- **Performance:** no build tooling or heavy frameworks — plain static HTML/CSS/JS
  that loads instantly, using system-friendly Google Fonts with `swap`.
- **Interaction design:** an animated "achievement ticker," scroll-reveal
  animations, and a validated admission enquiry form (client-side only, as
  there is no backend in scope for this assignment).

## Project Structure
```
kis-redesign/
├── index.html
├── about.html
├── academics.html
├── admissions.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Running Locally
No build step required. Either:
1. Open `index.html` directly in a browser, or
2. Serve it locally: `npx serve .` (or any static server) from the project folder.
