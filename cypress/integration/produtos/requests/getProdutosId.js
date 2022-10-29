Cypress.Commands.add('getProdutos', (id) => {
    cy.api({
        method: 'GET',
        url: '/produtos/' + id,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})