var mongoose = require( 'mongoose' );
var gracefulShutdown;

var dbURI = 'mongodb://localhost/dracula-dossier-clues';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

//if (process.platform === "win32") {
//    require("node-sigint");
//}

//if (process.platform === "win32") {
//    require("readline").createInterface({
//        input: process.stdin,
//        output: process.stdout
//    }).on("SIGINT", function () {
//        process.emit("SIGINT");
//    });
//}

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
	console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

require('./clues');