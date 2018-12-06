

const gulp = require("gulp");

const connect = require("gulp-connect");

var concat = require('gulp-concat');

var uglify = require("gulp-uglify");

var babel = require("gulp-babel");

var cleanCss = require("gulp-clean-css");

var sass = require("gulp-sass-china");


gulp.task('connect', function() {
    connect.server({
        port:85,
        root:"dist/",
        livereload:true,
   
        middleware:function(connect , opt){
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    })
});


gulp.task("html", ()=>{
    return gulp.src("*.html").pipe(gulp.dest("dist/")).pipe(connect.reload());;
})

gulp.task("watch", ()=>{
    gulp.watch("*html",["html","sass"]);
    gulp.watch("sass/*.scss",["html","sass"]);
    gulp.watch("js/*.js",["html","js"])
    gulp.watch("images/*.*",["html","images"])
 
})
gulp.task("images",()=>{
    return gulp.src("images/*.*")
    .pipe(gulp.dest("dist/images/"))
})

//默认自动转到dist文件夹下
gulp.task("default",["watch","connect","images","js"]);

// script 转存指令;

gulp.task("js", ()=>{
    return gulp.src(["js/*.js"])
    // .pipe(concat("mian.js"))
    // .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
})

gulp.task("css", ()=>{
    return gulp.src(["css/*.css"])
           .pipe(cleanCss())
           .pipe(gulp.dest("dist/css"))
})

gulp.task("sass", () =>{
    return gulp.src(["sass/*.scss"])
           .pipe(sass().on("error",sass.logError))
           .pipe(gulp.dest("dist/css"))
})



gulp.task("es6",()=>{
    return gulp.src("script/es2015/es6.js")
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest("dist/script"));
})