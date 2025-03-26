import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

function routes() {
  return [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Favourites',
      path: '/favourites',
    },
  ].map((route) => {
    route.url = `${Cypress.config().baseUrl}${route.path}`
    return route
  })
}

function textContentMatcher(textMatch) {
  function hasText(node) {
    if (typeof textMatch === 'string') {
      return node.textContent === textMatch
    } else {
      return textMatch.test(node.textContent)
    }
  }

  return (_content, node) => {
    if (!hasText(node)) {
      return false
    }

    const childrenDontHaveText = Array.from(node?.children || []).every((child) => !hasText(child))

    return childrenDontHaveText
  }
}

function getPageRouteFromName(pageName) {
  return routes().find((route) => route.name === pageName)
}

When('the user manually navigates to the {string} screen', (pageName) => {
  cy.visit(`${getPageRouteFromName(pageName).path}`)
})

Then('the user should be on the {string} screen', (pageName) => {
  cy.location('pathname').should('eq', getPageRouteFromName(pageName).path)
})

Then('the API responds with the full spells list', () => {
  cy.interceptSpells(200)
})

Then('the API throws an error when getting the full spells list', () => {
  cy.interceptSpells(500)
})

Then('the API responds the filtered spells list', () => {
  cy.interceptSpellsWithTypeQueryParam(200, 'Charm')
})

Then('the API responds with one spell details', () => {
  cy.interceptSpellById(200)
})

Then('the API throws an error when getting spell details', () => {
  cy.interceptSpellById(500)
})

Then('the API throws an error when getting the filtered spells list', () => {
  cy.interceptSpellsWithTypeQueryParam(500, 'Charm')
})

Then('the spells list should contain the following items', (list) => {
  list.hashes().forEach((row, index) => {
    cy.get('section[aria-label="Spells container"]')
      .find('div[aria-label="Spell item"]')
      .eq(index)
      .within(() => {
        cy.findByText(textContentMatcher(row.name)).should('contain.text', row.name)
        cy.findByText(textContentMatcher(row.tag)).should('contain.text', row.tag)
        cy.findByText(textContentMatcher(row.description)).should('contain.text', row.description)
      })
  })
})

Then('the pagination should be hidden', () => {
  cy.get('nav[aria-label="Pagination"]').should('not.exist')
})

Then('the {string} text should be visible', (text) => {
  cy.findByText(text).should('be.visible')
})

Then('the {string} input should be hidden', (text) => {
  cy.get(`input[placeholder="${text}"]`).should('not.exist')
})

Then('the {string} dropdown should be hidden', (text) => {
  cy.get(`[role="combobox"][aria-label="${text}"]`).should('not.exist')
})

Then('they type {string} in the {string} input', (text, input) => {
  cy.get(`input[placeholder="${input}"]`).type(text)
})

Then('they select {string} in the {string} dropdown', (text, dropdown) => {
  cy.get(`[role="combobox"][aria-label="${dropdown}"]`).click()
  cy.findByRole('listbox').within(() => {
    cy.findByText(text).click()
  })
})

When('the {string} button is pressed', (name) => {
  cy.findByRole('button', { name: name }).click()
})

When('the {string} card is pressed', (name) => {
  cy.get('div[aria-label="Spell item"]')
    .first()
    .within(() => {
      cy.findByText(name)
    })
    .click()
})

When('the user presses the favourite button on the {string} card', (name) => {
  cy.get('div[aria-label="Spell item"]')
    .filter((_, el) => Cypress.$(el).find('h2').text().trim() === name)
    .within(() => {
      cy.findByRole('button', { name: 'Favourite' }).click()
    })
})
