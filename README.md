# Feedbackjar

An open-source application built with Nuxt 3, Turso, Tailwindcss, Nuxt UI components, Stripe for collecting user feedback on websites and apps.

> **NOTE**
> Project Pivot
> This project was initially named Emailjar and was intended to be a simple CRUD app for collecting email addresses. However, after receiving feedback from users and considering the lack of real-world use cases for Emailjar, I have decided to pivot the project to a new direction. The new project, Feedbackjar, aims to provide a platform for gathering valuable feedback from users on websites and apps. I believe this pivot will make the project more relevant and useful to the open-source community.

## About this project

This project is inspired by [@shadcn's](https://twitter.com/shadcn) Taxonomy [Project](https://tx.shadcn.com/). I wanted to build something similar with Nuxt 3, Turso, and Vue.

## What does this app do btw?

Feedbackjar is a platform that allows website and app owners to collect feedback from their users. It provides a simple and user-friendly interface for users to submit their feedback, helping businesses improve their products and services. The feedback can include suggestions, bug reports, feature requests, and more.

## Features (WIP)

- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Authentication via Github (More coming soon)
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
- Written in **TypeScript** (WIP)

## Roadmap

- [x] Kickstart the project
- [ ] Add a landing page
- [ ] Project layout, routing, and navigation
- [ ] Authentication via Github
- [ ] Add Websites
- [ ] Collect Feedback
- [ ] Feedback Dashboard
- [ ] Feedback Management - Reply to feedback, mark as resolved, etc.
- [ ] Feedback Widget - Embeddable widget for collecting feedback
- [ ] Feedback Analytics
- [ ] Feedback Widget Documentation
- [ ] Feedback API and API key management.
- [ ] Subscriptions using Stripe - Free and Paid plans
- [ ] Add a billing page.
- [ ] Add a settings page.

## Local Setup

Pre-requisites:

- Node 16.x or higher
- Yarn or NPM or PNPM (change the manager accordingly in the commands below)

1. Install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn migrate # You only need to run this the first time and when you make changes to the database schema

yarn dev # For starting the development server
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

## Environment Variables

| Variable Name               | Description                |
| --------------------------- | -------------------------- |
| `NUXT_GITHUB_CLIENT_ID`     | Github OAuth Client ID     |
| `NUXT_GITHUB_CLIENT_SECRET` | Github OAuth Client Secret |
| `NUXT_SESSION_SECRET`       | Session Secret             |
| `NUXT_SESSION_PASSWORD`     | Session Password           |
| `TURSO_DB_URL`              | Turso DB URL               |
| `TURSO_DB_TOKEN`            | Turso DB Token             |

### How to get these values?

**<u>Github OAuth Client ID and Client Secret</u>**

create a [GitHub Oauth Application](https://github.com/settings/applications/new) and enter the below values when prompted, you will need to create two github applications, one for development and one for production.

Development

1. Homepage url: http://localhost:3000
2. Callback url: http://localhost:3000/api/auth/github

Production

1. Homepage url: https://<YOUR_APPLICATION_URL>
2. Callback url: https://<YOUR_APPLICATION_URL>/api/auth/github

**<u>Nuxt session</u>**
You can create a session secret and password using the below command:

```bash
openssl rand -base64 32
```

**<u>Turso DB URL and Token</u>**

1. Sign up for Turso at https://turso.tech
2. Install the Turso CLI with the [docs here.](https://docs.turso.tech/tutorials/get-started-turso-cli/step-01-installation)
3. Login to Turso CLI with `turso auth login`
4. Create a new database with `turso db create feedbackjar`
5. Create a new token with `turso db tokens create feedbackjar`
6. Copy the token and the database url and add them to your environment variables.

You can read more about Turso DB [here](https://docs.turso.tech/reference/turso-cli).

## Pre Deployment Notes

Before you deploy the application to production

1. Make sure you have pushed the migration files to your production server, you can do so using `yarn push`, Drizzle ORM will read the config and run the migrations on your production server.
2. Make sure you have set the environment variables on your production server.
