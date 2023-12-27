const cmsRoute = require('./cms/index');
const websiteRoute = require('./website/index');


function routes(app) {
	app.use('/cms', cmsRoute);
	app.use('/', websiteRoute);

}

module.exports.routes = routes;