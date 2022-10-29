import { faker } from '@faker-js/faker';

const postUsuarios = require('./requests/postUsuarios')
const getUsuariosId = require('../usuarios/requests/getUsuariosId')
const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')
const putUsuarios = require('../usuarios/requests/putUsuarios')

describe('PUT /usuarios', function () {

    context('Sucesso', function () {

        const email = faker.internet.email()
        const nome = 'Antonio Rodrigues Santos'
        const senha = 'antoniosantos@123124'
        const admin = 'true'

        //Insere usuario
        before('Prepara DB', function () {
            cy.postUsuarios(nome, email, senha, admin)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })
        })

        it('Edita usuário', function () {

            const _id = Cypress.env('_id')
            const putnome = 'Put Email'
            const putemail = faker.internet.email()
            const putsenha = '123124'
            const putadmin = 'false'

            //Edita usuario
            cy.putUsuarios(_id, putnome, putemail, putsenha, putadmin)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
                })

            //valida edição
            cy.getUsuariosId(_id, putnome, putemail, putsenha, putadmin)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.have.property('_id', _id)
                    expect(response.body).to.have.property('nome', putnome)
                    expect(response.body).to.have.property('password', putsenha)
                    expect(response.body).to.have.property('administrador', putadmin)
                    expect(response.body).to.have.property('email', putemail)
                })

            //exclui usuario
            cy.deleteUsuarios(_id)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                })
        })

        it('Insere usuário com put', function () {

            const putnome = 'Put Email'
            const putemail = faker.internet.email()
            const putsenha = '123124'
            const putadmin = 'false'

            //Insere usuario com put
            cy.putUsuarios('idinexistente@@', putnome, putemail, putsenha, putadmin)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                    Cypress.env('_idx', response.body._id)
                })
        })
    })

    context('Falha', function () {

        const nome = 'Put Email'
        const email = faker.internet.email()
        const senha = '123124'
        const admin = 'false'

        before('Prepara DB', function () {
            cy.postUsuarios(nome, email, senha, admin)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })
        })

        it('Tenta inserir usuario com put de email em uso', function () {

            const _id = Cypress.env('_id')
            cy.putUsuarios('idinexistente@@', nome, email, senha, admin)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('message', 'Este email já está sendo usado')
                })
                
            //deleta usuario criado no teste
            cy.deleteUsuarios(_id)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                })
        })
    })
})