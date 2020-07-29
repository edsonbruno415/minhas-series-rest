const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        console.error('Error: ', err);
    }
    console.log('Application is runnning...');
});

