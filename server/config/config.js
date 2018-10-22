
let config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    secret: process.env.JWT || 'Captain America',
    db: {
        url: 'mongodb://jassi_10:mumma2010@ds237363.mlab.com:37363/biteatnight'
    }
}
//mongodb://localhost:27017/biteAtNight


process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;

try {
    envConfig = require(`./${config.env}`);
    envConfig = envConfig || {}
} catch (e) {
    envConfig = {}
}

module.exports = Object.assign(config, envConfig);