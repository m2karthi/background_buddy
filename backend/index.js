const express = require('express');
const app = express();
const { loginTest } = require('./test/login_test');
// const { rescheduler } = require('./test/rescheduler_tets');

// const { testFetchingFacultyData } = require('./test/faculty_test');



// Run the login test for admin
loginTest();
// rescheduler()
// testFetchingFacultyData();






// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
