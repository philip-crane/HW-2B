# Secure Login Form (HW 2B)

An extremely simple HTML login page based loosely on the OWASP Juice Shop login, but this time to resist SQL injectio nand XSS. Built with:
- HTML
- Node.js 22.5 or above required
- JavaScript
- Express
- SQLite thru "node:sqlite"

## Security Measures
- Email and password fields with client-side validation: no empty fields, email must contain "@", password must be at least 8 characters
- The same validation repeated on the server, since client-side checks can be bypassed
- Parameterized SQLite queries to prevent SQL injection
- Passwords hashed with bcrypt
- Messages rendered with `textContent` so injected HTML/JS is shown as plain text

## Run
```bash
npm install
npm start
```
Open http://localhost:4000 and log in with test account:

- Email: `test@test.com`
- Password: `password123`

## Project structure
```
server.js            Express server, validation, login API
public/index.html    Login form
public/client.js     Client-side validation and fetch to /api/login
public/style.css     Styles
```

## Credits
Apart from regular documentation (npmjs), the project was scaffolded using this [tutorial](https://medium.com/@lamjed.gaidi070/how-to-secure-a-node-js-and-express-rest-api-application-7022f062d148), and exact syntax and security practices were gathered from [here](https://www.ceos3c.com/javascript/creating-a-secure-login-system-with-javascript/).