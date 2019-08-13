const { path, fs, Cryptr, ENV_CONSTANTS } = require('./../../facy-imports');
const { secret } = ENV_CONSTANTS;
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
    // await createSuperAdminUser(projectDetails);
    console.log(projectDetails);
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
            email: projectDetails.email,
            password: projectDetails.password,
            first_name: projectDetails.first_name,
            last_name: projectDetails.last_name || '',
            is_super_admin: true
        }
        User.findOneAndUpdate({
            email: projectDetails.email,
            is_super_admin: true
        }, params, options).then((user) => {
            console.log(user);
            resolve(user);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

const authKey = function randomString(len) {
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