# Secure content backend + admin panel

This project now includes a secure Node/Express backend with an owner-only admin panel that lives inside the `My Content` portal. All content (thumbnail, title, description, link) is stored in `server/data/content.json` and exposed through protected APIs.

## Prerequisites
- Node.js 18+

## Setup
1. Install dependencies  
   `npm install`
2. Create backend env vars from the template  
   Copy `server/env.example` to `server/.env` and fill in:
   - `ADMIN_EMAIL` / `ADMIN_NAME` for Rupanta
   - `ADMIN_PASSWORD_HASH` generated via:  
     `node server/scripts/hashPassword.js "your-strong-password"`
   - `JWT_SECRET` any long random string
3. Start the backend (port 5000 by default)  
   `npm run server`
4. In another terminal, start the frontend  
   `npm run dev`

You can also run both with `npm run dev:full` (requires a shell that supports that script).

## Admin flow (owner only)
- Open the site and go to **My Content**.
- Use the Owner Login card to sign in (email + password that match the env hash).
- Create, edit, or delete content directly in the portal. Thumbnail uploads are saved under `server/uploads` and served via `/uploads/*`.
- Public content grids update immediately after CRUD operations.

## API routes
- `POST /api/auth/login` — set secure session cookie
- `POST /api/auth/logout`
- `GET /api/auth/me` — session check
- `GET /api/content` — public content list
- `POST /api/content` — create (auth)
- `PUT /api/content/:id` — update (auth)
- `DELETE /api/content/:id` — delete (auth)
