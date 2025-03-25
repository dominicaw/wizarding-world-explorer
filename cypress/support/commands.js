/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('interceptSpells', (status) => {
  cy.intercept('GET', '/Spells', {
    statusCode: status,
    body: [
      {
        id: '6306bb66-11a0-4b7d-b046-fb88cd26c57a',
        name: 'Bedazzling Hex',
        incantation: null,
        effect: 'Disguises things',
        canBeVerbal: null,
        type: 'Hex',
        light: 'None',
        creator: null,
      },
      {
        id: '1e64f7ff-b1df-4c82-a192-c54051aaa6aa',
        name: 'Bewitched Snowballs',
        incantation: null,
        effect: 'Bewitches snowballs to follow and harass a designated target',
        canBeVerbal: null,
        type: 'Charm',
        light: 'Transparent',
        creator: null,
      },
      {
        id: 'abc98f1e-80de-4793-8d8c-df23ad293e65',
        name: 'Bluebell Flames',
        incantation: null,
        effect: 'Conjures bluebell flames',
        canBeVerbal: true,
        type: 'Charm',
        light: 'BrightBlue',
        creator: null,
      },
    ],
  })
})

Cypress.Commands.add('interceptSpellsWithTypeQueryParam', (status, queryParam) => {
  cy.intercept('GET', `/Spells?Type=${queryParam}`, {
    statusCode: status,
    body: [
      {
        id: '1e64f7ff-b1df-4c82-a192-c54051aaa6aa',
        name: 'Bewitched Snowballs',
        incantation: null,
        effect: 'Bewitches snowballs to follow and harass a designated target',
        canBeVerbal: null,
        type: 'Charm',
        light: 'Transparent',
        creator: null,
      },
      {
        id: 'abc98f1e-80de-4793-8d8c-df23ad293e65',
        name: 'Bluebell Flames',
        incantation: null,
        effect: 'Conjures bluebell flames',
        canBeVerbal: true,
        type: 'Charm',
        light: 'BrightBlue',
        creator: null,
      },
    ],
  })
})
