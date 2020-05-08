# Aut Firebase with Google and Email

## Setup Firebase

- Create a project at the [Create a project at the Firebase console](https://console.firebase.google.com/).
- Get your authentication credentials from the Firebase console under Project settings > General> Your apps Add a new web app if you don't already have one. Under Firebase SDK snippet choose Config to get the configuration as JSON. Set the appropriate environment variables in the `.env` file at the root of this project.

```API_KEY=xxxxxxxxx
AUTH_DOMAIN=xxxxxxxxxxx
DATABASE_URL=xxxxxxxxxx
PROJECT_ID=xxxxxxxxxxx
STOROGE_BUCKET=xxxxxxxx
MESSAGING_SENDER_ID=xxxxxxxx
APP_ID=xxxxxxxxxx
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```
