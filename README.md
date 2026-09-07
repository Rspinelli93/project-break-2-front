# Project Break · Storefront

A vanilla JavaScript frontend for the Project Break product API. It renders a clothing catalogue, filters products by category, and includes a separate administration dashboard.

**Collection:** Featured applications · [Project directory](https://github.com/Rspinelli93/Rspinelli93/blob/main/PROJECTS.md)

**Related repository:** [project-break-2-2025](https://github.com/Rspinelli93/project-break-2-2025)

## Run locally

Serve the repository with a local static HTTP server, for example using Python 3:

```bash
git clone https://github.com/Rspinelli93/project-break-2-front.git
cd project-break-2-front
python3 -m http.server 8000
```

Open `http://localhost:8000`. No build step is required.

## Implementation notes

The API base address is currently hard-coded in `app.js` and `dashboard/app.js`. Point those requests at your own running Project Break backend when working locally. The repository’s hosted endpoint has not been verified as available.

## Repository guide

- [`app.js`](app.js)
- [`dashboard/`](dashboard/)
- [`index.html`](index.html)
- [`style.css`](style.css)

---

[Back to my GitHub profile](https://github.com/Rspinelli93)
