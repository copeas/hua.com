// gulp插件

// 1、http插件（服务器插件）
// gulp-connect
const gulp = require("gulp");
// gulp 服务器插件
const connect = require("gulp-connect");
// // gulp 合并插件
var concat = require("gulp-concat")
// // gulp js压缩插件
var uglify=require("gulp-uglify");
// // babel 插件  编译插件
var babel = require("gulp-babel");
// // gulp-clean-csc  css压缩插件
var cleanCss = require("gulp-clean-css");
// // sass编译插件
// var sass = require("gulp-sass-china")
var sass = require("gulp-sass");
sass.compiler = require("node-sass");

gulp.task("connect",function(){
    connect.server({
        port:85,
        root:"dist/",
        livereload:true,
        middleware:function(connect,opt){ //中间件选项
            // console.log(opt)
            var Proxy=require("gulp-connect-proxy");
            opt.route="/proxy";
            var proxy =new Proxy(opt);
            return [proxy]
        }
    })
})
gulp.task("html",()=>{
   
    return gulp.src("./src/pages/*.html").pipe(gulp.dest("dist/")).pipe(connect.reload());

})

gulp.task("css",()=>{
   
    return gulp.src("./src/sass/*.scss").pipe(gulp.dest("dist/css/")).pipe(connect.reload());

})
// script 转存指令
gulp.task("js",()=>{
    return gulp.src(["./src/scripts/*.js"])   
    .pipe(
        gulp.dest("dist/scripts/")
    )
    .pipe(connect.reload());
})
gulp.task("img",()=>{
    return gulp.src(["./src/images/**"])   
    .pipe(
        gulp.dest("dist/images/")
    )
    .pipe(connect.reload());
})
gulp.task("php",()=>{
    return gulp.src(["./src/php/**"])   
    .pipe(
        gulp.dest("dist/php/")
    )
    .pipe(connect.reload());
})
// gulp.task("icon",()=>{
//     return gulp.src(["./iconfonnt/**"])   
//     .pipe(
//         gulp.dest("dist/iconfont/")
//     )
//     .pipe(connect.reload());
// })
gulp.task("sass",()=>{
    return gulp.src("./src/sass/*.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css/"))
    .pipe(connect.reload());
})
gulp.task("watch",()=>{
    gulp.watch("./src/pages/*.html",["html","css","js","img","php","sass"]);
    gulp.watch("./src/sass/*.scss",["html","css","js","img","php","sass"])
    // gulp.watch("./src/stylesheets/*css",["html","css","js","img","php","sass"]);
    gulp.watch("./src/scripts/*.js",["html","css","js","img","php","sass"]);
    gulp.watch("./src/images/**",["html","css","js","img","php","sass"]);
    gulp.watch("./src/php/**",["html","css","js","img","php","sass"]);
})
gulp.task("default",["watch","connect"]);

// // 压缩css文件
// gulp.task("css",()=>{
//      return gulp.src(["style/*.scss"])
//     .pipe(cleanCss())
//     .pipe(gulp.dest("dist/css"))
// })


