'use strict';
const { express, AppConfig, db_connection } = require('./facy-imports');
const { initiate } = require('./.faci/faci-common/faci-controller');
var routes = require('./src/routers/routes');
require('./src/models/index');
const model_routes = require('./.faci/model-list/index');
class Facinode {

    constructor() {
        this.app = express;
        this.app_initiate();
    }

    async app_initiate() {
        new AppConfig(this.app).includeConfig(this.app);
        this.includeRoutes();
        await db_connection.connect();
        setTimeout(() => {
            initiate();
        }, 500);
    }

    includeRoutes() {
        this.app.use('/', routes);
        for (let routes_list in model_routes) {
            this.app.use('/', model_routes[routes_list])
        }
    }
}

const facy = new Facinode();
module.exports = facy.app;