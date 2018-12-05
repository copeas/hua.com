// gulp 的插件;

// 1. http插件; (服务器插件);
// gulp connect;
const gulp = require("gulp");
// gulp 服务器插件;
const connect = require("gulp-connect");
const proxy = require("http-proxy-middleware");
// gulp 合并插件;
var concat = require('gulp-concat');
// gulp 压缩插件;
var uglify = require("gulp-uglify");
// babel 插件;
var babel = require("gulp-babel");
// css 插件;
var cleanCss = require("gulp-clean-css");
// sass 编译插件;
var sass = require("gulp-sass-china");


gulp.task("connect",()=>{
    connect.server({
        port:"82",
	    root:"dist",
        middleware:function(){
            return[
                proxy("/api",{
                    target:"http://localhost:3000",
                    pathRewrite:{
                        '^/api' : '/',  //rewrite path
                    }
                })
            ]
        }
    })
});
// 如何发起一个代理请求 : 
// localhost:82/proxy/目标;

gulp.task("html", ()=>{
    return gulp.src("*.html").pipe(gulp.dest("dist/")).pipe(connect.reload());;
})

gulp.task("watch", ()=>{
    gulp.watch("*.html",["html","sass"]);
   
    gulp.watch("sass/*.scss",["html","sass"]);
    gulp.watch("script/*.js",["html","script"])
})

gulp.task("default",["watch","connect"]);

// script 转存指令;

gulp.task("script", ()=>{
    return gulp.src(["script/*.js","!script/libs/jquery.js"])
    // .pipe(concat("mian.js"))
    //.pipe(uglify())
    .pipe(gulp.dest("dist/script"));
})

gulp.task("css", ()=>{
    return gulp.src(["styles/*.css"])
           .pipe(cleanCss())
           .pipe(gulp.dest("dist/css"))
})

gulp.task("sass", () =>{
    return gulp.src(["sass/*.scss"])
           .pipe(sass().on("error",sass.logError))
           .pipe(gulp.dest("dist/css"))
})

// 编译 ? es6 => es5;

gulp.task("es6",()=>{
    return gulp.src("es6/*.js")
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest("dist/script"));
})
