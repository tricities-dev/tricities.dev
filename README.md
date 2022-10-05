# TriDev Website Base Init w/ Typescript

[![Netlify Status](https://api.netlify.com/api/v1/badges/5ed32b41-84a9-4b10-8205-ddecaab3182c/deploy-status)](https://app.netlify.com/sites/tricitiesdev/deploys)


## Intro

Welcome to the TriDev public website repository!

The TriDev community is yours, and as such, this is an opportunity help contribute and truly make the public face of TriDev your own.

Feel free to add suggestions to Issues and submit pull requests for Issues that aren't taken. Happy hacking! 

## Developing

Once you've cloned this project, you'll need to run `npm install` to grab all of the dependencies necessary.

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Emulating production

Some parts of the running app are Netlify's serverless Functions and other features like URL redirects at the network level. For these, you can run `netlify dev` to spin up the app within the Netlify CLI and view and test the app from within a real Netlify context.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
