Cypress.Commands.add('getUsuarios', (tipo, dado) => {
    cy.api({
        method: 'GET',
        url: '/usuarios?' + tipo + '=' + dado,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})