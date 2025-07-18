import express from 'express';

import connectDatabase from './config/database.js';
import { PORT } from './utils/constant.js';

const App = express();

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