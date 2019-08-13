const { router, auth_routes } = require('../../facy-imports')


router.use('/', (req, res) => {
    let route_name = '';
    let urlArr = req.url.split('/');
    let idx = -1;
    for (let cnt = urlArr.length - 1; cnt > 0; cnt--) {
        route_name = urlArr[cnt];
        idx = router.stack.findIndex(e => {
            if (e.route && e.route.path == route_name) {
                return true;
            }
            return false;
        });
        if (idx >= 0) {
            req.params.id = urlArr[cnt + 1];
            break;
        }
    }

    var result = {
        path: req.url,
        method: req.method,
        param : req.params.id,
        id: idx
    }
    res.json(result);
})

router.use('/auth', auth_routes);

module.exports = router;
