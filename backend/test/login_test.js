require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

// const { testFetchingFacultyData } = require('./faculty_test');



async function loginTest() {
    // Set up Selenium WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('http://localhost:8080/');

        // Wait for the email input field to be visible
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);

        // Find and enter the email
        const emailInput = await driver.findElement(By.css('input[type="email"]'));
        await emailInput.sendKeys('test@test.com');

        // Find and enter the password
        const passwordInput = await driver.findElement(By.css('input[type="password"]'));
        await passwordInput.sendKeys('123456', Key.RETURN);
        // Wait for the login process to complete and verify the redirect URL
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl === 'http://localhost:8080/admin/faculties';
        }, 5000);

        // Verify successful login
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl === 'http://localhost:8080/admin/faculties') {
            console.log('Login test passed: Successfully logged in.');
            // testFetchingFacultyData();


        } else {
            console.log('Login test failed: Unable to log in or incorrect redirect URL.');
        }
    } finally {
        // Quit the WebDriver
        // await driver.quit();
    }
}

// Export the loginTest function
module.exports = { loginTest };