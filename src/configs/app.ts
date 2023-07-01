import express from 'express';
import apiEndpoints from '../routes/endpoints';
import authenticateToken from '../middlewares/authenticateToken';
import searchInRedis from '../middlewares/redisCacheMiddleware';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT ?? 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middlewares
app.use('/v1/api', authenticateToken);
app.use('/v1/api', searchInRedis);

apiEndpoints(app);

export default app;
