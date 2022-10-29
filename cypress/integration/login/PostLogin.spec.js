import { faker } from '@faker-js/faker';


const postLogin = require('./requests/postLogin')
const postUsuarios = require('../usuarios/requests/postUsuarios')
const getUsuariosEmail = require('../usuarios/requests/getUsuarios')
const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')


describe('POST /login', function () {


    context('Sucesso', function () {

        const randomEmail = faker.internet.email()
        const nome = 'Teste'
        const password = '123124'

        beforeEach('Prepara DB', function () {

            cy.postUsuarios(nome, randomEmail, password, 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })
        })

        it('Login com sucesso', () => {
            cy.postLogin(randomEmail, password)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                })
        })

    })

    context('Falha', function () {

        const randomEmail = faker.internet.email()
        const nome = faker.name.firstName()
        const password = '123124'

        before('Prepara DB', function () {
            cy.postUsuarios(nome, randomEmail, password, 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })
        })

        it('Login inválido - Apenas email', () => {
            cy.postLogin(faker.internet.email())
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('password', 'password é obrigatório')
                })
        })

        it('Login inválido - Apenas senha', () => {
            cy.postLogin({ password: password })
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('email', 'email deve ser uma string')
                })
        })

        it('Login inválido - Email e Senha vazios', () => {
            cy.postLogin()
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('email', 'email é obrigatório')
                    expect(response.body).to.have.property('password', 'password é obrigatório')
                })
        })
    })
})
