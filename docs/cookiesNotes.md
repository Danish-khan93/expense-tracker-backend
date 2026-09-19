# Cookies

## What are Cookies?

Cookies are small pieces of data stored by the browser and automatically sent with HTTP requests to the server.

## `cookie-parser`

`cookie-parser` is Express middleware used to **read/parse cookies** from incoming requests.

```text
Browser
   ↓
Cookie
   ↓
Express
   ↓
cookie-parser
   ↓
req.cookies
```

## `res.cookie()`

Express uses `res.cookie()` to **set a cookie** in the browser.

```text
Server
   ↓
res.cookie()
   ↓
Browser stores cookie
```

## Authentication Cookies

For JWT authentication:

```text
Access Token  → 15 minutes
Refresh Token → 7 days
```

Both can be stored in **HttpOnly cookies**.

### Important Options

* `httpOnly: true` → JavaScript cannot directly access the cookie.
* `secure: true` → Cookie is sent only over HTTPS.
* `sameSite: "strict"` → Restricts cross-site cookie sending.
* `maxAge` → Defines how long the cookie remains valid.

## Important Difference

```text
cookie-parser
→ READ cookies

res.cookie()
→ SET cookies

JWT
→ CREATE / VERIFY tokens
```

## Token Flow

```text
Login
  ↓
Create Access Token + Refresh Token
  ↓
Store both in cookies
  ↓
Access Token expires after 15 min
  ↓
Refresh Token is used to get a new Access Token
  ↓
Refresh Token expires after 7 days
  ↓
User must login again
```
