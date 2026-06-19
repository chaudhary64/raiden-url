# URL Shortener — API Routes

Base URL: `http://localhost:3000`

---

## Auth Routes — `/auth`

| Method | Endpoint | Expects | Returns |
|--------|----------|---------|---------|
| `POST` | `/auth/signup` | `body: { name, email, password }` | `201` user object + `accessToken` + `refreshToken` (cookie) |
| `POST` | `/auth/login` | `body: { email, password }` | `201` user object + `accessToken` + `refreshToken` (cookie) |
| `PUT` | `/auth/user` | `query: ?id=&name=` | `200` updated user object |
| `DELETE` | `/auth/user` | `query: ?id=` | `200` deleted user object |

---

## Link Routes — `/links`

| Method | Endpoint | Expects | Returns |
|--------|----------|---------|---------|
| `GET` | `/links/all` | `query: ?userId=` | `200` array of all links for that user |
| `POST` | `/links` | `body: { id (userId), originalUrl }` | `200` new link object with generated short code |
| `PUT` | `/links/edit` | `body: { linkId, originalUrl }` | `200` updated link object |
| `DELETE` | `/links/:linkId` | `param: linkId` | `200` deleted link object |

---

## Error Responses

| Status | Meaning |
|--------|---------|
| `400` | Missing required field |
| `401` | Invalid credentials |
| `404` | Resource not found |
| `409` | User already exists |
| `500` | Internal server error |
