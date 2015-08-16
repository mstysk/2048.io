'use strict';

var gulp = require("gulp");
var watchify = require("gulp-watchify");

var less = require("gulp-less");

gulp.task("build", [
    "build:less",
]);

gulp.task("build:less", function(){
    return gulp.src("./src/less/2048.less")
            .pipe(less())
            .pipe(gulp.dest("./www/dist/css"));
});

var watching = false;
gulp.task("enable-watch-mode", function(){
    watching = true;
});
gulp.task("browserify", watchify(function(watchify){
    return gulp.src("./src/app/app.js")
            .pipe(watchify({
                watch: watching,
                debug: true
            }))
            .pipe(gulp.dest("./www/dist/js"));
}));
gulp.task("watch", ["build", "enable-watch-mode", "browserify" ], function(){
    gulp.watch("./src/less/**/*.less", ["build:less"] );
});

gulp.task("default", ['build', "browserify"]);
