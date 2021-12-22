const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rimraf = require("rimraf");

const { series, watch } = gulp;

function cleanStylesOutput() {
  rimraf.sync("./app/styles/compiled/*");
}

function buildStyles() {
  const plugins = [autoprefixer({}), cssnano()];
  return gulp
    .src("./styles/entry/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./app/styles/compiled"));
}


exports.cleanStylesOutput = cleanStylesOutput;
exports.buildStyles = buildStyles;

exports.compileStylesForProduction = function compileStylesForProduction() {
  cleanStylesOutput();
  buildStyles();
}

exports.watchAndCompileStyles = function watchAndCompileStyles() {
  cleanStylesOutput();
  buildStyles();
  watch("./styles/**/*.scss", { queue: false }, function () {
    cleanStylesOutput();
    buildStyles();
  });
};
