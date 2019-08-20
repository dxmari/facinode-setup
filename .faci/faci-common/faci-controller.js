const path = require('path');
const fs = require('fs');
const Cryptr = require('cryptr');

const { secret } = require('../../src/generics/env_constants')

var options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
};
var cryptr;
exports.initiate = async () => {
    if (secret) {
        cryptr = new Cryptr(secret);
    }
    let projectDetails = await getProjectDetails();
    // console.log(projectDetails);
}

const getProjectDetails = () => {
    return new Promise(((resolve, reject) => {
        let filePath = path.dirname(__dirname) + '/project.env';
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                reject();
            }
            let textContent = data.toString();
            let result = {};
            let contentArr = textContent.split('\n'), value;
            for (let cnt = 0; cnt < contentArr.length; cnt++) {
                value = contentArr[cnt].split('=');
                if (value[0]) {
                    result[value[0]] = value[1];
                }
            }
            resolve(result);
        });
    }))
}

const appendProjectDetails = (str) => {
    let filePath = path.dirname(__dirname) + '/project.env';
    fs.appendFileSync(filePath, '\n' + str);
}

const createSuperAdminUser = (projectDetails) => {
    const { User } = require('./../../facy-imports');
    return new Promise((resolve, reject) => {
        var params = {
            username: projectDetails.username,
            email: projectDetails.email,
            password: projectDetails.password,
            is_super_admin: true
        }
        User.findOneAndUpdate({
            username: projectDetails.username,
            is_super_admin: true
        }, params, options).then((user) => {
            resolve(user);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

exports.authKey = function randomString(len) {
    var p = "abcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '');
};

const encryptKey = function (key, keyLen = 32) {
    return pbkdf2.pbkdf2Sync(key, secret, 1, keyLen, 'sha512').toString('hex');
}

const encodeKey = function (key) {
    return cryptr.encrypt(key);
}

const decodeKey = function (key) {
    return cryptr.decrypt(key);
}

const processRoutes = function (req, res) {
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
        param: req.params.id,
        id: idx
    }
    res.json(result);
}

exports.createSuperAdminUser = createSuperAdminUser;