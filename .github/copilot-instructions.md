<!-- Auto-generated guidance tailored to this repository. Edit if project structure changes. -->
# Copilot instructions for this codebase

Purpose
- Help AI coding agents be productive in this small Express + Mongoose server.

Quick overview
- Runtime: Node.js app; entrypoint is `app.js` (project root). Package scripts: `npm start` runs `nodemon app.js` (see `package.json`).
- Web framework: `express` (routes live in `routes/`).
- Data layer: `mongoose` models live in `models/` (example: `models/user.js`).
- Controller pattern: controllers are expected under `controllers/` and used by route handlers (see `controllers/user.js` and `routes/user.js`).

What to expect when editing
- Many files are scaffolds or minimal. `app.js`, `routes/user.js`, and `controllers/user.js` may be empty placeholders — confirm intent before large rewrites.
- Keep API wiring minimal: export controller functions from `controllers/*` and import them in `routes/*` to attach to an `express.Router()` which is then mounted in `app.js`.

Project-specific patterns and examples
- Mongoose models: `models/user.js` defines a `mongoose.Schema` and should export the model via `module.exports = mongoose.model('User', userSchema)`.
  - Example pattern found: define schema fields as `{ name: { type: String } }`.
- Routes/controllers: follow this pattern:
  - `controllers/user.js` should export functions like `exports.createUser = async (req,res)=>{...}`.
  - `routes/user.js` should create a router, `const router = express.Router()`, `router.post('/', createUser)`, and `module.exports = router`.
  - `app.js` should `const userRoutes = require('./routes/user')` and `app.use('/users', userRoutes)`.

Dev commands and debugging
- Install deps: `npm install` (project already lists `express` and `mongoose`).
- Start in dev: `npm start` (runs `nodemon app.js`). If `nodemon` is missing, install globally or run `npx nodemon app.js`.
- When debugging, ensure MongoDB is reachable (this repo does not include a DB config file). Look for environment-based connection strings in `app.js` or add `process.env.MONGO_URI` and document it.

Integration points and missing config to watch for
- Database connection: no visible DB connection in repository root files — expect `app.js` to perform `mongoose.connect(...)`. Avoid hardcoding credentials; use `process.env` keys.
- External services: none discovered in the current source — search for `fetch`, `axios`, or `request` before adding network calls.

Editing rules for AI agents
- Minimalist edits: prefer small, local changes (add missing exports, complete an empty controller) rather than full refactors.
- Preserve public APIs: if you add or change route paths, update `routes/` and `controllers/` together and note the change in this file.
- Do not add new top-level dependencies without asking; this repo is intentionally small.

Where to look first (high signal files)
- `package.json` — scripts and installed deps
- `app.js` — app wiring, middleware, and DB connection (may be empty)
- `models/user.js` — example Mongoose schema
- `routes/user.js` and `controllers/user.js` — where route handlers belong

If uncertain, ask the maintainer
- If a file is empty or incomplete (e.g., `app.js`), ask whether to scaffold a standard Express app wiring or to implement a specific feature.

Contact/Next steps
- After applying a change, run `npm start` and report any runtime errors and stack traces so they can be iteratively fixed.

-- End of guidance
