import { faker } from '@faker-js/faker';

const postUsuarios = require('../usuarios/requests/postUsuarios')
const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')

describe('DELETE /usuarios', function () {

    context('Sucesso', function () {

        it('Deletar usuário', function () {

            const email = faker.internet.email()

            cy.postUsuarios('Antonio', email, '123124', 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })

            var _id = Cypress.env('_id')
            cy.deleteUsuarios(_id)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.have.property('message', 'Registro excluído com sucesso')

                })
        })
    })

    context('Falha', function () {

        it('Id incorreto', function () {

            cy.deleteUsuarios(987)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.have.property('message', 'Nenhum registro excluído')

                })
        })
    })
})

//tentar deletar com coisa no carrinho