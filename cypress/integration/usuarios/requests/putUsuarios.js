Cypress.Commands.add('putUsuarios', (_id, nome, email, senha, admin) => {
    cy.api({
        method: 'PUT',
        url: '/usuarios/' + _id,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": admin
        }, failOnStatusCode: false
    })
})