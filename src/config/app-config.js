const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
class AppConfig {

    constructor(app) {
        this.app = app;
    }
    includeConfig() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(fileUpload());
    }
}

module.exports = AppConfig;
