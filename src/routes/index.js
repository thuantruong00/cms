// const websiteRoute = require('./website/index');
const { cmsRouter } = require('./cms/index.js');

const routes = (app) => {
  app.use('/cms', cmsRouter);
  // app.use('/', websiteRoute);
};

module.exports = routes;
