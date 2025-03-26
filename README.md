# Wizarding World Explorer

This project displays all the spells from the Harry Potter universe and includes filtering, searching and favourting.

## About the project

Due to time constraints, I prioritized refining the spell list functionality, ensuring it was polished and user-friendly. Given the relatively straightforward component logic, I determined that unit tests were not essential in this scenario. Instead, I opted for end-to-end tests, which provided broader coverage across various use cases and allowed for effective mocking of API responses.

## Project Architecture

```
wizarding-world-explorer/
├── public/
│   ├── _redirects              # Netlify redirects configuration
│   ├── favicon.ico
├── src/
│   ├── assets/                 # Static assets like CSS and images
│   ├── components/
│   │   ├── Common/             # Shared components
│   │   ├── Spells/             # Components related to spells
│   ├── hooks/                  # Tanstack hooks
│   ├── router/                 # Vue Router configuration
│   ├── theme/                  # Custom PrimeVue theme configuration
│   ├── utils/                  # Utility functions and API logic
│   ├── views/                  # Page-level components
│   ├── App.vue                 # Root Vue component
│   ├── main.ts                 # Entry point for the Vue app
├── cypress/
│   ├── e2e/                    # End-to-end test files
│   ├── fixtures/               # Mock data for Cypress tests
│   ├── integration/            # Cucumber feature files for Cypress
│   ├── support/                # Custom Cypress commands and setup
│   ├── tsconfig.json           # TypeScript configuration for Cypress
├── .vscode/
│   ├── extensions.json         # Recommended VSCode extensions
│   ├── settings.json           # VSCode workspace settings
├── .env                        # Environment variables
├── cypress.config.ts           # Cypress configuration
├── index.html                  # HTML entry point for the app
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
```

## View the project

https://wizarding-world-explorer.netlify.app/

## Run the project

```sh
npm run dev
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e
```
