describe('Test Salsita testing page', () => {
    it('Open Salsita testing page', () => {
        cy.visit('https://salsita-qa-homework.netlify.app/')
    })
    it('Click Enter to get to Code page',() => {
        cy
          .get('.enterButton')
          .click()
          .url().should('eq', 'https://salsita-qa-homework.netlify.app/code')
          .get('form')
          .should('exist')
    })
    it('Find hidden input and pass its value to Code input',() => {
        cy
          .get('input[name=secret]')
          .then(($hiddenInput) => {
            const secretValue = $hiddenInput.val();
            cy
              .get('#code').type(secretValue)
              .should('have.value', secretValue)
        });
    })
    it('Check the checkbox to confirm you are robot',() => {
        cy.get('#isRobot')
          .should('not.be.checked')
          .check()
          .should('be.checked')
    })
    it('Submit the form to get to the Lists page',() => {
        cy
          .get('form')
          .submit()
          .url().should('include', '/lists')
          .get('#summary')
          .should('be.visible')
    })
    it('Check that Famous quotes part is visible and contains proper quotes',() => {
        cy
            .get('[qa-id="Famous"]')
            .should('be.visible')
            // Find all the <li> elements with quotes.
            .get('[qa-id="Famous"] li').should('have.length', 5).each(($li) => {
            // Find the first <span> element in current <li>.
            cy.wrap($li).find('span:first').invoke('text')
                .then((text) => {
                //Perform check of uniqueness for each text
                    cy.get('[qa-id="Famous"] li').find('span:first').invoke('text').should((allText) => {
                        // Count occurences of the text in all spans.
                        const count = allText.split(text).length - 1;
                        // The text should appear exactly once.
                        expect(count).to.equal(1);
                    })
                })
            })
    })
    it('Check that Awesome quotes part is visible and contains quotes',() => {
        cy
          .get('[qa-id="Awesome"]')
          .should('be.visible')
          .get('[qa-id="Awesome"] li').should('have.length', 5).each(($li) => {
            cy.wrap($li).find('span:first').invoke('text')
                .then((text) => {
                    cy.get('[qa-id="Awesome"] li').find('span:first').invoke('text').should((allText) => {
                        const count = allText.split(text).length - 1;
                        expect(count).to.equal(1);
                    })
                })
            })
    })
    it('Sum up the scores at quotes and check is equal as Total score. ',() => {
        cy.get('.score').then(($scores) => {
            const scoreTexts  = $scores.map((index, $score) => {
              // Inside the callback function, you can access the text of each element separately
              return Cypress.$($score).text();
            }).get();

            // Filter out empty score texts and parse them into integers
            const scores = scoreTexts
                .filter((scoreText) => scoreText.trim() !== '')
                .map((scoreText) => parseInt(scoreText));
            
            // Calculate the sum of quote scores
            const quoteScore = scores.reduce((acc, curr) => acc + curr, 0);
            
            expect(quoteScore).to.be.a('number');
    
            cy.get('#summary').invoke('text')
                .then((totalScoreText) => {
                const totalScore = parseInt(totalScoreText.replace('Total score: ',''), 10);
    
                expect(totalScore).to.be.a('number');
                expect(totalScore).to.equal(quoteScore);
                })
        });
    })

})
