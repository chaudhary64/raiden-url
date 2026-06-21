# URL Shortener — Server API

A REST API for shortening URLs, built with **Express**, **Drizzle ORM**, **PostgreSQL**, and **JWT authentication**.

Base URL: `http://localhost:3000`

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or use the included Docker Compose)
- pnpm

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy and fill in environment variables
cp .env.example .env

# 3. Push the schema to your database
pnpm db-push

# 4. Start the dev server
pnpm dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ACCESS_TOKEN_SECRET` | Secret for signing JWT access tokens (15 min expiry) |
| `REFRESH_TOKEN_SECRET` | Secret for signing JWT refresh tokens (7 day expiry) |
| `NANOID_SIZE` | Length of generated short codes (e.g. `8`) |

---

## Authentication

Protected routes require a valid **access token** in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

Tokens are obtained from the `/auth/login` or `/auth/signup` responses.  
Use `GET /refresh` to silently rotate tokens before the access token expires.

---

## Routes

### Public — `/auth`

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| `POST` | `/auth/signup` | `{ name, email, password }` | `201` — `{ user, accessToken, refreshToken }` + sets `refresh_token` cookie |
| `POST` | `/auth/login` | `{ email, password }` | `200` — `{ user, accessToken, refreshToken }` + sets `refresh_token` cookie |

---

### Protected — `/auth` 🔒

> Requires `Authorization: Bearer <accessToken>` header.  
> The user identity is taken from the token — no need to send an `id` field.

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| `PUT` | `/auth/user` | `{ name }` | `200` — `{ user }` updated user object |
| `DELETE` | `/auth/user` | — | `200` — `{ user }` deleted user object |

---

### Protected — `/links` 🔒

> All link routes require `Authorization: Bearer <accessToken>`.  
> Ownership is enforced — you can only edit or delete your own links.

| Method | Endpoint | Body / Query | Response |
|--------|----------|------|----------|
| `GET` | `/links/all` | — | `200` — `{ links }` array of the authenticated user's links |
| `POST` | `/links` | `{ originalUrl }` | `200` — `{ link }` newly created link with short code |
| `PUT` | `/links/edit` | `{ linkId, originalUrl }` | `200` — `{ link }` updated link object |
| `DELETE` | `/links/delete` | `query: ?linkId=` | `200` — `{ link }` deleted link object |

---

### Token Refresh — `/refresh`

| Method | Endpoint | Cookie | Response |
|--------|----------|--------|----------|
| `GET` | `/refresh` | `refresh_token` (httpOnly cookie) | `200` — `{ accessToken, refreshToken }` + rotates `refresh_token` cookie |

> Token rotation is applied: the old session is invalidated and a new one is created on every refresh.

---

### Short-link Redirect — Public

| Method | Endpoint | Response |
|--------|----------|----------|
| `GET` | `/:short_code` | `301` — permanent redirect to the original URL |

> Example: `GET /abc12345` → redirects to `https://example.com/some/long/path`

---

## Error Responses

| Status | Meaning |
|--------|---------|
| `400` | Missing required field (e.g. no `originalUrl`, no `linkId`) |
| `401` | Unauthorized — missing, invalid, or expired token |
| `403` | Forbidden — you do not own this resource |
| `404` | Resource not found |
| `409` | Conflict — user with that email already exists |
| `500` | Internal server error |

---

## Project Structure

```
server/
├── app.js                      # Express app entry point
├── controllers/
│   ├── auth/
│   │   ├── signup.controller.js
│   │   ├── login.controller.js
│   │   ├── update.controller.js
│   │   └── delete.controller.js
│   ├── link/
│   │   ├── get.controller.js
│   │   ├── create.controller.js
│   │   ├── edit.controller.js
│   │   └── delete.controller.js
│   └── refresh/
│       └── get.controller.js
├── middlewares/
│   └── authenticate.middleware.js  # JWT Bearer token verification
├── repositories/
│   ├── user.repository.js
│   ├── session.repository.js
│   └── links.repository.js
├── routes/
│   ├── auth.routes.js
│   └── links.routes.js
├── services/
│   └── token.service.js            # Token pair generation
├── models/                         # Drizzle schema definitions
├── utils/
│   ├── tokens.js                   # JWT sign/verify helpers
│   ├── hash.js                     # bcrypt helpers
│   └── cookie.js                   # Cookie options
└── db/
    └── index.js                    # Drizzle DB instance
```
