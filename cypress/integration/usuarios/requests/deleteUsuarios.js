Cypress.Commands.add('deleteUsuarios', (id) => {
    cy.api({
        method: 'DELETE',
        url: '/usuarios/' + id,
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})