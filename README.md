# Emailjar

An example open source application built with Nuxt 3.

> **Warning**
> This app is a work in progress. I'm building this in public. You can follow the progress on Twitter [@fayazara](https://twitter.com/fayazara).
> See the roadmap below.

## About this project

This project is inspired by [@shadcn's](https://twitter.com/shadcn) Taxonomy [Project](https://tx.shadcn.com/). I wanted to build something similar with Nuxt 3, Turso, and Vue.

## What does this app do btw?
A simple CRUD app app, which will save email collections. You can create a collection add emails to it. Maybe for forms, newsletter subscription forms etc. 

## Features (WIP)

- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Metadata files
- Server and Client Components
- API Routes and Middlewares
- ORM using **Drizzle ORM**
- Database on **Turso**
- UI Components built using **Nuxt UI**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [ ] Add Collections
- [ ] Add Emails
- [ ] Subscriptions using Stripe
- [ ] Make the api public to add new emails
- [ ] Api key management

## Local Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
