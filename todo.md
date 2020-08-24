For Backend
[x] Add creds to dotenv
[x] Connect to database
[x] Parse the incoming request
[x] Validate the request body
[x] Check if code is already prsent in DB
[x] Store url in the DB
[x] If code was not provide then use nanoid to generate one
[x] MongoDB Atlassian cloud database
[x] Consistent response message
[x] Route to redirect url when user calls
[x] Add rate limiter to incoming requests
[] {Priority+++} Move constants to utils/constants.js
[] Perf: Make mogodb queries faster
[x] Add cache to minimize db queries

---

Full Stack steps taken: shortener.pranjal.me

- Frontend
  [] Created a Vue app
  [] Used Vuex for state management
  [] Used Vue Formulate ⚡️ for forms
  [] Written bundle shipping scripts

- Backend
  [] Created NodeJS api with MongoDB database
  [] Used lru cache for Node API
  [] Used MongoDB atlas for production DB
  [] Used YUP for schema validation
  [] Added rate limiter to API
  [] Added speed limiter to API
  [] Created a digital ocean droplet
  [] Setup ubuntu server, added user and other tools
  [] Enabled firewall and some basic security steps
  [] Used Nginx for reverse proxy
  [] Used lets encrypt for SSL certificate
  [] Used Namecheap as DNS provider
