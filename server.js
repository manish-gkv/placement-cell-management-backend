import express from 'express';

import connectDatabase from './config/database.js';

const App = express();

App.listen(3000, async () => {
  await connectDatabase();
  console.log('Server is running on port 3000');
  
});