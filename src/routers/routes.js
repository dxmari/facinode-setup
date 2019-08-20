const { router, auth_routes } = require('../../facy-imports')


router.use('/auth', auth_routes);
module.exports = router;