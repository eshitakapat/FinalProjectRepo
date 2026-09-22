const serverless = require("serverless-http");

// ... your existing express setup (app.use(...), app.get(...), etc.) ...

// Instead of app.listen(5000, ...), export the serverless handler
module.exports = app;
module.exports.handler = serverless(app);