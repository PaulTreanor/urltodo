# UrlTodo
A simple todo list that can be shared with others.

The link is the list. 

## Implementation
UrlTodo is a Next.js SPA app built with ShadCN. 

## Running locally (not obvious) 
Local dev servers seem to handle URL routing differently than built React apps. If you try to run UrlTodo with a normal `npm run dev` script the encoded URL fragments will be dropped by the browser (directing to the app with an empty list).

Instead you must build the app and serve the `/out` directory over `http-server`. You can do this with the `serve-build` command. 

```bash
npm run serve-build
# output at http://127.0.0.1:8080
```