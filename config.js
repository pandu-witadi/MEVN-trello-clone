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

    // secret_key for JWT (JSONWebToken)
    secret_str : "this-auth-token",
    refresh_token_time:  2 * 60 // 2 minutes
}
cfApp.publicURL = cfApp.baseURL + ':' + cfApp.port.toString()
cfApp.apiURL = cfApp.publicURL + '/api'

module.exports = cfApp
