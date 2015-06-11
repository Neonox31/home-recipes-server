// Load dependencies
var nconf = require('nconf');
var mongoose = require("mongoose");

// Load sensihome dependencies
var Api = require("./api.js");

(function(log, err, exit) {

/** Get the package.json **/
try {
    var appPackage = require(__dirname + '/../package.json');
} catch (e) {
    err(e);
    exit();
}

/** Init config **/

nconf.argv().env();
nconf.file({ file: __dirname + '/../config/config.json' });

/** Init database **/
mongoose.connect(nconf.get("database:uri"));

/** Init api **/
api = new Api();

/** Start application **/
log("%s v%s started", appPackage.name, appPackage.version);

})(console.log, console.error, process.exit);