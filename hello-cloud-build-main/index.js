const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello, World! Welcome to the Express API for GCP Demo.');
});

// Data endpoint
app.get('/api/data', (req, res) => {
    res.json({
        message: 'This is some sample data.',
        timestamp: new Date().toISOString()
    });
});

// Start the server only if this script is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = app; // Export for testing purposes 