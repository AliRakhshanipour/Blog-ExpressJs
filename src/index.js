import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { ErrorHandler } from './common/error-handlers.js'; // Adjust naming for consistency
import { dbAuthenticate } from './configs/database.config.js';
import passport from './configs/passport.config.js';
import { syncModels } from './models/index.js';
import { MainRoutes } from './routes/index.js';

config(); // Load environment variables

const bootstrap = async () => {
  try {
    // Application Instance
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    // Configure session
    app.use(
      session({
        secret: process.env.SECRET_KEY || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        // You may also configure cookie options here
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await dbAuthenticate();
    await syncModels();

    app.use('/', MainRoutes);
    ErrorHandler(app);

    // Creating Server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Application bootstrap failed:', error.message);
    process.exit(1);
  }
};

// Start the application
await bootstrap();
