const { ViewSets } = require('../faci-common/facy')
const router = require('express').Router();
require('../../src/models/cities');
class Cities extends ViewSets {
    constructor() {
        super('Cities');
    }
}
const cities = new Cities();

router.route('/cities/:id')
    .get(async (req, res, next) => {
        let items = await cities.retrieve(req.params.id);
        res.json(items);
    })
    .put(async (req, res, next) => {
        let items = await cities.update(req.params.id, req.body);
        res.json(items);
    })
    .delete(async (req, res, next) => {
        let items = await cities.delete(req.params.id);
        res.json(items);
    })

router.route('/cities')
    .get(async (req, res, next) => {
        let items = await cities.listAll();
        res.json(items);
    })
    .post(async (req, res, next) => {
        let items = await cities.insert(req.body);
        res.json(items);
    })

exports.routes = router;