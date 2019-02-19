import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import fs from 'fs';

const config = require('./gulp-config');

const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const bs = browserSync.create();
const calc = require('postcss-calc');
const colours = require('ansi-colors');
const combineDuplicateSelectors = require('postcss-combine-duplicated-selectors');
const cssMqPacker = require('css-mqpacker');
const csso = require('postcss-csso');
const discardDuplicates = require('postcss-discard-duplicates');
const fLog = require('fancy-log');
const plugins = require('gulp-load-plugins')();
const preCss = require('precss');
const reporter = require('postcss-reporter');
const scssSyntax = require('postcss-scss');
const stylelint = require('stylelint');
const clearFix = require('postcss-clearfix');

if (argv.production) {
    fLog(colours.bgGreen.black(' ------------------- '));
    fLog(colours.bgGreen.black(' | Production mode | '));
    fLog(colours.bgGreen.black(' ------------------- '));
} else {
    fLog(colours.bgCyan.black(' -------------------- '));
    fLog(colours.bgCyan.black(' | Development mode | '));
    fLog(colours.bgCyan.black(' -------------------- '));
}

let plumberError = function (error) {
    fLog(colours.bgRed.white('Error (' + error.plugin + '): ') + colours.white(error.message));
}

function cssLint() {
    return gulp.src('src/css/**/*.css')
        .pipe(plugins.postcss([
            stylelint(),
            reporter({
                clearReportedMessages: true,
                clearAllMessages: false,
                throwError: false,
                positionless: 'last'
            })
        ], {
            syntax: scssSyntax
        }))
    ;
}

function css(done) {
    return gulp.src(config.postcss.src)
        .pipe(plugins.plumber({
            errorHandler: plumberError
        }))
        .pipe(plugins.sourcemaps.init({
            loadMaps: true
        }))
        .pipe(plugins.postcss([
            preCss,
            clearFix,
            combineDuplicateSelectors,
            cssMqPacker,
            calc,
            autoprefixer({
                cascade: true
            }),
            discardDuplicates,
            reporter({
                clearReportedMessages: true,
                clearAllMessages: true,
                throwError: false,
                positionless: 'last',
            }),
        ], {
            syntax: scssSyntax
        }))
        .pipe(plugins.if(argv.production, plugins.postcss([csso])))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(plugins.size({
            title: 'CSS',
            showFiles: false,
            showTotal: true
        }))
        .pipe(gulp.dest(config.postcss.dest))
        .pipe(plugins.plumber.stop())
        .pipe(browserSync.stream({
            match: '**/*.css'
        }))
    ;
};

function html() {
    return gulp.src(config.html.src)
        .pipe(plugins.plumber({
            errorHandler: plumberError
        }))
        .pipe(plugins.fileInclude({
          prefix: '@',
        }))
        .pipe(plugins.if(argv.production, plugins.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeComments: true
        })))
        .pipe(plugins.size({
            title: 'HTML',
            showFiles: false,
            showTotal: true
        }))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest(config.html.dest))
        .pipe(browserSync.stream({
            match: '**/*.html'
        }))
    ;
};


function clean() {
    return del(['./dist'], { force: true });
}

function initBS() {
    browserSync.init({
        notify: false,
        server: 'dist',
        port: 3000
    });
}

function reloadBS(done) {
    bs.reload();
    done();
}

const copyFiles = (src, dest) => {
    return gulp.src(src)
        .pipe(plugins.plumber({
            errorHandler: plumberError
        }))
        .pipe(plugins.changed(dest))
        .pipe(gulp.dest(dest))
    ;
};

function watch(done) {
    gulp.watch(config.postcss.watch, gulp.series(cssLint, css, reloadBS));
    gulp.watch(config.html.watch, gulp.series(html, reloadBS));
    done();
}

gulp.task(
    'default',
    gulp.series(
        clean,
        gulp.parallel(cssLint, css, html)
    )
);

gulp.task(
    'dev',
    gulp.series(watch, 'default', initBS)
);
