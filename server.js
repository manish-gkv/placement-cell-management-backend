import express from 'express';
import cors from 'cors';
import connectDatabase from './config/database.js';
import { PORT } from './utils/constant.js';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';

const App = express();

App.use(express.json());
App.use(cors());
App.use('/api', apiRoutes);
App.use('/auth', authRoutes);

const startServer = async () => {
  try{
    await connectDatabase();
    App.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  catch(error) {
    console.error('Error starting server:', error);
  }
}

startServer();