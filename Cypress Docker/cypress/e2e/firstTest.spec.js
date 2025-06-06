/// <reference types="cypress" />

describe('Test with backend', () => {

    beforeEach('login to the app', () => {
        cy.intercept({ method: 'Get', path: 'tags' }, { fixture: 'tags.json' })
        //cy.intercept('GET', 'https://api.realworld.io/api/tags', { fixture: 'tags.json' })
        cy.loginToApplication()
    })

    it('verify correct request and response', () => {

        //POST - creazione dell'articolo
        cy.intercept('POST', 'https://api.realworld.io/api/articles/').as('postArticles') //Aliasing an intercepted route

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('This is the title')
        cy.get('[formcontrolname="description"]').type('This is a the description')
        cy.get('[formcontrolname="body"]').type('This is a the body of the article')
        cy.contains('Publish Article').click()

        cy.wait('@postArticles').then(xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(201)
            expect(xhr.request.body.article.body).to.equal('This is a the body of the article')
            expect(xhr.response.body.article.description).to.equal('This is a the description')
        })
    })

    it('interceptiong and modifying the request and response', () => {

        //POST - creazione dell'articolo
        //cy.intercept('POST', '**/articles/', (req) => {
        //    req.body.article.description = "This is a the description 2"
        // }).as('postArticles') 

        cy.intercept('POST', '**/articles/', (req) => {
            req.reply(res => {
                expect(res.body.article.description).to.equal("This is a the description")
                res.body.article.description = "This is a the description 2"
            })
        }).as('postArticles')

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('This is the title')
        cy.get('[formcontrolname="description"]').type('This is a the description')
        cy.get('[formcontrolname="body"]').type('This is a the body of the article')
        cy.contains('Publish Article').click()
        cy.wait('@postArticles').then(xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(201)
            expect(xhr.request.body.article.body).to.equal('This is a the body of the article')
            expect(xhr.response.body.article.description).to.equal('This is a the description 2')
        })
    })

    it('verify popular tags', () => {
        cy.get('.tag-list')
            .should('contain', 'cypress')
            .and('contain', 'testing')
            .and('contain', 'automation')
            .and('contain', 'welcome')
    })

    it('verify global feed likes count', () => {
        cy.intercept('GET', 'https://api.realworld.io/api/articles/feed*', { "articles": [], "articlesCount": 0 }) //See staticResponse argument
        cy.intercept('GET', 'https://api.realworld.io/api/articles*', { fixture: 'articles.json' }) //Stubbing a response with a fixture

        cy.contains('Global Feed').click()
        cy.get('app-article-list button').then(heartList => {
            expect(heartList[0]).to.contain('1')
            expect(heartList[1]).to.contain('5')
        })

        cy.fixture('articles').then(file => {
            const articleLink = file.articles[1].slug
            file.articles[1].favoritesCount = 6
            cy.intercept('POST', 'https://api.realworld.io/api/articles/' + articleLink + '/favorite', file)
        })

        cy.get('app-article-list button').eq(1).click().should('contain', 6)
    })

    it('delete a new article in a global feed', () => {

        const bodyRequest =
        {
            "article": {
                "title": "Request from API",
                "description": "API Testing",
                "body": "Cypress is amazing"
            }
        }

        cy.get('@token').then(token => {

            cy.request({
                url: 'https://api.realworld.io/api/articles/',
                headers: { 'Authorization': 'Token ' + token },
                method: 'POST',
                body: bodyRequest
            }).then(response => {
                expect(response.status).to.equal(201)
            })

            cy.contains('Global Feed').click().wait(2000)
            /* cy.get('.article-preview').should('be.visible').then(() => {
                cy.get('.article-preview').first().click()
            }) */

            cy.get('.article-preview').first().click()

            //cy.get('.article-actions').then(ele => cy.log(ele.text()))

            cy.get('.article-actions').should('be.visible').then(() => {
                cy.contains('Delete Article').click()
            })

            //cy.get('.article-actions').contains('Delete Article').click()

            cy.request({
                url: 'https://api.realworld.io/api/articles?limit=10&offset=0',
                headers: { 'Authorization': 'Token ' + token },
                method: 'GET',
            }).its('body').then(body => {
                expect(body.articles[0].title).not.equal('Request from API')
            })
        })
    })

    it.only('delete a new article in a global feed - auth headless', () => {

        const userCredentials = {
            "user": {
                "email": Cypress.env("username"),
                "password": Cypress.env("password")
            }
        }

        const bodyRequest =
        {
            "article": {
                "title": "Request from API",
                "description": "API Testing",
                "body": "Cypress is amazing"
            }
        }

        cy.request('POST', Cypress.env('apiUrl')+'/api/users/login', userCredentials).its('body').then(body => {
            const token = body.user.token

            cy.request({
                url: Cypress.env('apiUrl')+'/api/articles/',
                headers: { 'Authorization': 'Token ' + token },
                method: 'POST',
                body: bodyRequest
            }).then(response => {
                expect(response.status).to.equal(201)
            })

            cy.contains('Global Feed').click().wait(2000)
            /* cy.get('.article-preview').should('be.visible').then(() => {
                cy.get('.article-preview').first().click()
            }) */

            cy.get('.article-preview').first().click()

            //cy.get('.article-actions').then(ele => cy.log(ele.text()))

            cy.get('.article-actions').should('be.visible').then(() => {
                cy.contains('Delete Article').click()
            })

            //cy.get('.article-actions').contains('Delete Article').click()

            cy.request({
                url: 'https://api.realworld.io/api/articles?limit=10&offset=0',
                headers: { 'Authorization': 'Token ' + token },
                method: 'GET',
            }).its('body').then(body => {
                expect(body.articles[0].title).not.equal('Request from API')
            })
        })
    })
})