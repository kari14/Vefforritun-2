var gulp = require("gulp");
var less = require('gulp-less');
//var browserify = require("browserify");
//var reactify = require("reactify");
//var source = require("vinyl-source-stream");

/*
gulp.task("compile", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("default",["copy"],function(){
    console.log("Gulp completed...");
});*/
gulp.task('compile-less', function() {
    gulp.src(['stylesheets/less/*.less'])
        .pipe(less())
        .pipe(gulp.dest('assets/styles'))
});

gulp.task('default', function() {
    gulp.run('compile-less');

    gulp.watch('stylesheets/less/**', function(event) {
        gulp.run('compile-less');
    });
});
