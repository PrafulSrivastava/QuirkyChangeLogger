## 🕵️ QuirkyChangeLogger: Turn Your Git Commit History into a Dramatic Tale

QuirkyChangeLogger is an AI-powered GitHub App that listens to your main branch commits and turns your project's commit history into an unfolding dramatic narrative. Whether it's a tense showdown between developers, a heroic bug fix, or the tragic fall of a deprecated feature, QuirkyChangeLogger weaves it all into a story worth telling.

## 🚀 How It Works

Every time a new commit is pushed to the main branch:
- The bot fetches the entire commit history.
- It consolidates all commit messages into a structured narrative.
- Using an LLM, it transforms the timeline into a dramatic story featuring fictionalized authors, conflicts, and resolutions.
- The story is posted as a comment on the most recent commit — bringing your repo to life.

## 📍 Where to Find the Story:
- After every push to main, scroll to the last commit on GitHub.
- Open the "Comments" section to read the latest AI-generated episode of your repo's journey.

## 🧩 Project Overview

This repository runs two integrated services via Docker Compose:

1. **MonitoringBot** – a [GitHub ProBot](https://probot.github.io/)-based automation bot (`/monitoring_bot`).
2. **Assistant** – a [CrewAI](https://www.crewai.com/)-based LLM agent (`/assistant`).

Both services rely on `.env` configuration files for secrets and environment variables. These files are excluded from version control for security reasons.

---

## 🛠️ Prerequisites

Before you begin, ensure you have:

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose **installed and running**.
- A valid **Gemini API key** for the Assistant. [the API key is free for use]
- Create two empty .env files, one in assistant and other in monitoring_bot directories.

---

## 🧠 Configure the Assistant (LLM Service)
Create a .env file in the assistant/ directory using the following template:

```dotenv
# LLM model identifier (e.g., Gemini Flash)
MODEL=gemini/gemini-2.0-flash-001


# API key for your LLM provider
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Open the /assistant/Dockerfile.assistant file. and populate the **BOT_TYPE** argument with the bot personality of your choice.
- **dramatist**: A codebase historian with the soul of a playwright. Transforms commits into sweeping literary epics full of heroism, conflict, and poetic refactors.

- **oracle**: A cryptic prophet who sees the future in your past commits. Outputs mystical changelogs styled as riddles and divine foresight.

- **detective**: A noir investigator piecing together your codebase like a crime scene. Every commit is a clue, every bug a suspect.

- **captain**: A starship commander chronicling your project’s journey across the digital galaxy. Commit logs become mission stardates, and authors become bridge officers.

- **bard**: A wandering minstrel who sings your commits as rhymed ballads. Merges, bug fixes, and releases are all turned into lyrical stanzas.
---

## 🚀 Launch with Docker Compose

The root of the project contains a `docker-compose.yml` that references both services and automatically loads each `.env` file from the respective folders.

To build and start the services:

```bash
docker-compose up --build
```
---

## 🚀 Launch with Docker Compose

The root of the project contains a `docker-compose.yml` that references both services and automatically loads each `.env` file from the respective folders.

To build and start the services:

```bash
docker-compose up --build
```
---

## 🕹️ Configure the GitHub Monitoring Bot
Once the services are up, the console will display a local URL like:

```arduino
http://localhost:3000
```
👉 Follow These Steps in Your Browser:
- Open the URL above.

- Register a new GitHub App through the interface.
- During setup, select the repositories you want the bot to monitor.
- Save the configuration.
- ℹ️ This process will automatically populate environment variables inside the .env file in the monitoring_bot/ directory.
- 🔄 Restart the Server
After the .env file is updated, restart the server for changes to take effect:

```bash
docker-compose down
docker-compose up
```
---

## 🔐 Required GitHub App Permissions (Verification step, in case the end to end flow does not work)
Ensure the following permissions and event subscriptions are defined in your **app.yml** (used for GitHub App manifest creation):

```yaml
default_events:
  - commit_comment
  - issue_comment
  - issues
  - pull_request
  - pull_request_review
  - pull_request_review_comment
  - push
  - repository

default_permissions:
  issues: write
  metadata: read
  pull_requests: write
  statuses: write
```

