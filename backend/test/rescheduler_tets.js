const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function rescheduler() {
    // Set up the Selenium WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the page containing the Vue component
        await driver.get('http://localhost:8080/admin/rescheduler');

        // Wait for the Vue component to load
        await driver.wait(until.elementLocated(By.css('.title')), 5000);

        // Get the exam cards
        const examCards = await driver.findElements(By.css('.title'));

        // Assert that there are exams present
        assert(examCards.length > 0, 'No exams found.');

        // Iterate over each exam card
        for (const examCard of examCards) {
            // Get the exam title
            const examTitle = await examCard.getText();

            // Assert that the exam title is not empty
            assert(examTitle.trim() !== '', 'Exam title is empty.');

            // Print the exam title
            console.log('Exam Title:', examTitle);
        }

        // Example: Click on the "Accept" button for the first exam
        // const acceptButton = await driver.findElement(By.css('v-btn[color="green"]'));
        // await acceptButton.click();

        // Example: Assert that the status of the first exam is now "Accepted Request"
        // const examStatus = await driver.findElement(By.css('.body-2.description')).getText();
        // assert.strictEqual(examStatus, 'Accepted Request', 'Exam status is not "Accepted Request".');

        console.log('Test completed successfully.');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

module.exports = { rescheduler }
