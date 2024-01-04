const express = require('express');
const dotenv = require('dotenv');
const logger = require('./logger');
dotenv.config();

const setupCluster = require('./cluster');
const connectToDatabase = require('./dbconnection');

setupCluster(startApp);

function startApp() {
    const createRateLimiter = require('./middlewares/rateLimiter');
    const app = express();

    const PORT = process.env.PORT || 3000;
    const rateLimiterMiddleware = createRateLimiter(10, 60 * 5000);
    const uri = process.env.DATABASE_URI;

    connectToDatabase(uri);

    app.use(express.json());
    app.use(rateLimiterMiddleware);

    const authRoutes = require('./routes/auth');
    const noteRoutes = require('./routes/notes');

    app.use('/api/auth', authRoutes);
    app.use('/api/notes', noteRoutes);

    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}
