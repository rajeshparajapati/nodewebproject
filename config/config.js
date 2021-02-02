'use strict';

const config = {
    live: {
        SECRET: 'crm@$12&*01',
        WEB_URL: 'http://localhost:3000/api/',
        WEB_ADMIN_URL: 'http://localhost:4200/',
        WEB_FRONTEND_URL: 'http://localhost:4200/',
        DIRCTORY_PATH:'http://localhost:3000/',
        EMAIL_FROM: '"uniquesoftsolutions" <no-reply@uniquesoftsolutions.com>',
        SMTP: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            port: 465,
            authUser: 'testmail@gmail.com',
            authpass: 'testtttt'
        },
        DATABASE: {
            dbname: 'chowki',
            host: 'mongodb://localhost:27017/',
            username: '',
            password: ''
        },
     
    },
    local: {
        SECRET: 'crm@$12&*01',
        WEB_URL: 'http://localhost:3000/api/',
        WEB_ADMIN_URL: 'http://localhost:4200/',
        WEB_FRONTEND_URL: 'http://localhost:4200/',
        DIRCTORY_PATH:'http://localhost:3000/',
        EMAIL_FROM: '"uniquesoftsolutions" <no-reply@uniquesoftsolutions.com>',
        SMTP: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            port: 465,
            authUser: 'testmail@gmail.com',
            authpass: 'testtttt'
        },
        DATABASE: {
            dbname: 'chowki',
            host: 'mongodb://localhost:27017/',
            username: '',
            password: ''
        },     
    },
};
module.exports.get = function get(env) {
    return config[env] || config.local;
}