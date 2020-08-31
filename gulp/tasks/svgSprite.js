const gulp = require("gulp");
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");

module.exports = function svgSprite() {
  return gulp
    .src("src/assets/img/icons/*.svg")
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
		.pipe(gulp.dest("dist/assets/img"))
		.pipe(gulp.src("src/assets/img/icons/*.svg"))
		.pipe(gulp.dest("dist/assets/img/icons"));
};
