const { Builder, By, until } = require('selenium-webdriver');

async function testFetchingFacultyData() {
    // Set up Selenium WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the web page containing the faculty table
        await driver.get('http://localhost:8080/admin/faculties');

        // Wait until the table is loaded (you can adjust the timeout as needed)
        await driver.wait(until.elementLocated(By.css('.fac')), 20000);

        // Get the rows of the table
        const rows = await driver.findElements(By.css('.fac tbody tr'));
        console.log(rows);

        // Iterate through the rows and extract the faculty data
        for (const row of rows) {
            console.log("row", row);

            const cells = await row.findElements(By.css('td'));
            console.log("cells", cells);


            if (cells.length >= 7) {
                // Extract the data from the cells
                const name = await cells[0].getText();
                const designation = await cells[1].getText();
                const email = await cells[2].getText();
                const mobile = await cells[3].getText();
                const doj = await cells[4].getText();
                const gender = await cells[5].getText();
                const qualification = await cells[6].getText();

                console.log('Name:', name);
                console.log('Designation:', designation);
                console.log('Email:', email);
                console.log('Mobile:', mobile);
                console.log('DOJ:', doj);
                console.log('Gender:', gender);
                console.log('Qualification:', qualification);
                console.log('------------------------');
            } else {
                console.log('Invalid row format: not enough cells');
            }
        }
    } finally {
        // Quit the WebDriver instance
        await driver.quit();
    }
}

// Run the test
module.exports = { testFetchingFacultyData };

