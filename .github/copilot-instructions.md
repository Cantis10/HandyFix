# Copilot Instructions for HandyFix

This project is a **minimal Node/Express API** deployed on Vercel. The agent should treat
it as a single-file server that is intended to stay small and easy to modify.

## Architecture & Big Picture

- `server.js` is the only JavaScript entry point. It uses `express` (v5.x) with
  commonJS (`require`) modules. All route handlers live inline.
- There is no database or ORM. The `/users` endpoint returns a hard‑coded list;
  `/post` echoes back the JSON body with a simple transformation. Additional
  business logic can be added directly in `server.js` or factored into new
  modules if things grow.
- Environment variables are loaded via `dotenv` (already listed in
  `package.json`) but aren’t currently used. New secrets should be referenced as
  `process.env.FOO` and documented in readme or `.env.example` if added.
- Deployment is configured for Vercel via `vercel.json`. The spec routes **all
  requests** to `server.js`, so nothing else runs.

## Developer Workflow

1. **Install dependencies**: `npm install` in the repo root.
2. **Run locally**: `npm start` or `node server.js`. The server listens on
   `process.env.PORT` (default 3000).
3. **Tests**: there are no tests. Do not assume any testing framework is set up.
4. **Lint/format**: none included. Keep code style consistent with existing
   file (2‑space indentation, semicolons).
5. **Adding dependencies**: run `npm install --save <pkg>` and verify `package.json`
   updates; `npm install` will be run automatically by the dev container.
6. **Deployment**: Vercel uses the `vercel.json` build/routing config. Pushing to
   `main` should trigger automatic deploys.

> ⚠️ The repo currently has no CI or GitHub Actions. Don't expect pre‑merge
> checks unless added explicitly.

## Conventions & Patterns

- **Routes**: define them with `app.get/post/...` in `server.js`. Example:

  ```js
  app.post('/post', (req, res) => {
    const data = req.body;
    if (data.message) {
      data.message = data.message.toUpperCase();
    }
    res.json(data);
  });
  ```

- **JSON**: `app.use(express.json())` enables body parsing. Always send/receive
  JSON responses.
- Avoid using ES modules; the `package.json` field `"type": "commonjs"` is
  authoritative.

## Integration Points

- No external APIs are currently consumed, but if you add them, mock them in
  the same file for simplicity or abstract into helpers under a new directory.
- `dotenv` is configured; place a `.env` file at the project root for local
  secrets. The build on Vercel will ignore `.env` (use Vercel dashboard.env
  vars instead).

## How to Extend

When adding features:

1. If routes become numerous, create a folder like `routes/` and require them
   from `server.js` (commonJS style).
2. Keep `server.js` as the entry for Vercel; don’t rename or move it unless
   `vercel.json` is updated accordingly.
3. For any new environment variables, document them in README and add a
   `.env.example` with placeholder values.

## Notes for AI Agents

- The project is intentionally simple; don’t over‑engineer. Most pull requests
  will involve adding or modifying a small number of routes or response
  payloads.
- There are no tests, so when proposing code changes the agent should either
  suggest adding new tests (and implement them manually) or clearly call out
  that testing would be required.
- Avoid adding unnecessary dependencies unless a real need arises.
- If the task involves deployment, mention that Vercel uses `vercel.json` and
  the default `@vercel/node` builder.

---

Please review this guidance and let me know if any sections are unclear or
missing details you’d like agents to follow. Feedback helps refine the
instructions.