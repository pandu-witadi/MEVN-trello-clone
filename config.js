//
//
//
let cfApp = {
    appName: "MEVN-trello-clone",
    appVersion: "0.1.0",
    port: 3030,
    baseURL : "http://localhost",

    // mongodb setting
    dburl : 'mongodb://127.0.0.1:27017/',
    dbname : 'MEVN-trello-clone',

    saltLength: 10,
    // secret_key for JWT (JSONWebToken)
    secret_str : "this-auth-token",
    token_exp:  10 * 60 // 2 minutes
}
cfApp.publicURL = cfApp.baseURL + ':' + cfApp.port.toString()
cfApp.apiURL = cfApp.publicURL + '/api'

module.exports = cfApp
