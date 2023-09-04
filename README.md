# Feedbackjar

An open source feedback management, public roadmap, and changelog platform. The goal of feedbackjar is to empower product teams to effortlessly gather feedback, track issues, and seamlessly manage them with public roadmaps and provide updates via changelogs.

Unlike Open source projects, Github acts as a de facto feedback management platform, most businesses, apps and platforms are not open source, they miss out on the same experience that open source projects enjoy. Feedbackjar aims to solve this problem by providing a platform to do the same

![Feedbackjar preview](https://feedbackjar.app/feedbackjar-dashboard.png)

> **NOTE**
> The initial project, named Emailjar, was envisioned as a fictional app aimed at collecting email addresses, functioning as a simple CRUD application. It drew inspiration from [@shadcn's](https://twitter.com/shadcn) Taxonomy [Project](https://tx.shadcn.com/), as mentioned in this [tweet](https://twitter.com/fayazara/status/1673915381499727872). I wanted to build something similar with Nuxt 3, Turso, and Vue. However, after receiving feedback from some people and considering the lack of real-world use cases for Emailjar, I have decided to pivot the project towards an actual platform that solves a genuine problem. The new project, Feedbackjar, will be an alternative to Canny.io, Beamer, Frill etc.

## What does this platform actually do?

Most applications need a way to collect feedback, report bugs, and track issues. We will provide you tools to do so and manage them in an efficient way.

- Collect feedback from your users, using our widgets for React, Vue, HTML projects, apis for mobile apps etc. You will also get public pages for collecting feedback.
- Manage feedback and issues, close, mark them as resolved etc or move them to the public board where others can vote them up or down.
- Move issues to the public roadmap, where your users can see what is being worked on and what is coming next.
- Publish changelogs and updates to your users, feedbackjar will also provide you widgets/apis for embedding the changelogs on your website or app and it will even provide you standalone pages for your changelogs.

## Features

- Collect Feedback
- Manage Feedback
- Public Roadmap
- Changelogs
- Embeddable Widgets
- APIs
- Public Pages
- Authentication via Github, Google, Email password
- Self hostable
- Open source
- Webhooks
- Integrations with Slack, Discord, Telegram, etc.

## v0.1 Public release roadmap

We plan to get the feedback collection and management features out as soon as possible, we wui

- [x] Kickstart the project
- [x] Add a landing page
- [x] Project layout, routing, and navigation
- [x] Authentication via Github
- [ ] Projects CRUD
  - [x] Create projects
  - [x] List projects
  - [x] View project
  - [ ] Update project
  - [ ] Delete project
- [ ] Feedback CRUD
  - [x] Create feedback
  - [x] List feedback
  - [x] View feedback
  - [ ] Update feedback
  - [ ] Delete feedback
- [] Feedback Dashboard
  - [x] Feedback Details - View
  - [ ] Feedback Details - Edit
- [ ] Feedback Management -
  - [ ] Update status
  - [ ] Update priority
- [ ] Feedback Widget - Embeddable widget for collecting feedback
- [ ] Feedback Analytics
  - [x] Stats queried by project
- [ ] Feedback Widget Documentation
- [ ] Feedback API and API key management.

## v0.2 Future tasks

- [ ] Public Roadmap
- [ ] Changelogs
- [ ] Embeddable Changelog Widget
- [ ] Embeddable Public Roadmap Widget
- [ ] Public Pages

## v0.3 Future tasks

- [ ] User management
- [ ] Team management
- [ ] Integrations
- [ ] Webhooks

## Cloud release

- [ ] Subscriptions using Stripe - Free and Paid plans

## If you want to setup the project locally

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
yarn db:migrate # You only need to run this the first time and when you make changes to the database schema

yarn dev # For starting the development server

yarn db:deploy # For deploying the migrations to your turso
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

## Environment variables needed

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

1. Make sure you have pushed the migration files to your production server, you can do so using `yarn db:deploy`, Drizzle ORM will read the config and run the migrations on your production database, i.e Turso DB.
2. Make sure you have set the environment variables on your production server.
