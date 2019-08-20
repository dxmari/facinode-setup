'use strict';

const { router, auth_controller } = require('../../../facy-imports')

/**
* @api {post} auth/login
*/

router.post('/login/', auth_controller.login)

module.exports = router