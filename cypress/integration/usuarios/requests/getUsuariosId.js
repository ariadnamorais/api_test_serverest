Cypress.Commands.add('getUsuariosId', (id) => {
    cy.api({
        method: 'GET',
        url: '/usuarios/' + id,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})