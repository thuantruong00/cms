import app from './src/app';

const PORT: number = 8002;

//test
const initController = require('./src/controllers/cms/init.controller');
const main = () => {
  app.listen(PORT, async () => {
    initController.Init();
    console.log('HTTP Server is running on ', PORT);
  });
};

main();

