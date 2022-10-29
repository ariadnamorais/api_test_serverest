import { faker } from '@faker-js/faker';

const postUsuarios = require('./requests/postUsuarios')
const getUsuariosId = require('../usuarios/requests/getUsuariosId')

describe('GET /usuarios', function () {

    context('Sucesso', function () {

        it('Buscar usuário', function () {

            const email = faker.internet.email()
            const nome = 'Antonio'
            const senha = '123124'
            const admin = 'true'

            cy.postUsuarios(nome, email, senha, admin)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                    var _id = Cypress.env('_id')
                    cy.getUsuariosId(_id)
                        .then(function (response) {
                            expect(response.status).to.eql(200)
                            expect(response.body).to.have.property('_id', _id)
                            expect(response.body).to.have.property('nome', nome)
                            expect(response.body).to.have.property('password', senha)
                            expect(response.body).to.have.property('administrador', admin)
                            expect(response.body).to.have.property('email', email)
                        })
                })
        })
    })

    context('Falha', function () {

        it('User não encontrado', function () {

            cy.getUsuariosId('test@@')
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('message', 'Usuário não encontrado')

                })
        })
    })
})