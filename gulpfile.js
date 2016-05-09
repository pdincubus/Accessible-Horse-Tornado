//----------------------------------------------------
//  pull all plugins in
//----------------------------------------------------

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    listSelectorsPlugin = require('list-selectors').plugin;
    plugins = gulpLoadPlugins(),
    argv = require('yargs').argv,
    fs = require('fs'),
    del = require('del'),
    productionMode = !!argv.production, // pass --production to gulp to enable this
    htmlIncludes = true // set false to not bother
;

//----------------------------------------------------
//  directories and paths
//----------------------------------------------------

var config = {
    base: {
        remotefolder: 'public_html/',
        dest: 'dist/',
        src: 'src/'
    },

    paths: {
        html: {
            src:  ['src/index.html'],
            watch: [
                'src/*.html',
                'src/chunks/**/*'
            ],
            dest: 'dist/'
        },
        javascript: {
            head:  ['src/js/head/*.js'],
            general:  [
                'src/js/general/libs/jquery-2.2.3.min.js',
                'src/js/general/libs/jQuery-Accessible-Horse-Tornado.js',
                'src/js/general/general.js'
            ],
            dest: 'dist/js'
        },
        scss: {
            src: 'src/scss/style.scss',
            watch: ['src/scss/**/*.scss'],
            dest: 'dist/css'
        },
        images: {
            src: ['img/**/*']
        }
    }
}

if (productionMode) {
    plugins.util.log(plugins.util.colors.green('Production mode - uglifying and minifying'));
} else {
    plugins.util.log(plugins.util.colors.blue('Development mode - no minification and uglification'));
}

//----------------------------------------------------
//  styles
//----------------------------------------------------

function compileCSS(input, output, outputFilename) {
    var autoprefixer = require('autoprefixer'),
        preCSS = require('precss'),
        reporter = require('postcss-reporter'),
        scss = require('postcss-scss'),
        mqpacker = require('css-mqpacker'),
        postcssProcessors = [
            autoprefixer({
                browsers: ['last 2 versions', 'Explorer 9'],
                cascade: false
            }),
            mqpacker(),
            reporter({
                clearMessages: true,
                throwError: true
            })
        ]
    ;

    return gulp.src(input)
        .pipe( plugins.plumber({
            errorHandler: reportError
        }) )
        .pipe( plugins.sourcemaps.init({ loadMaps: true }) )
        .pipe( plugins.sass({
            indentWidth: 4,
            outputStyle: 'expanded'
        }) )
        .on('error', reportError)
        .pipe( plugins.postcss(postcssProcessors, { syntax: scss }) )
        .pipe( plugins.rename(outputFilename + '.css') )
        .pipe( plugins.if(productionMode, plugins.cssnano() ) )
        .pipe( plugins.sourcemaps.write('./') )
        .pipe( gulp.dest(output) );
}

gulp.task('scss', function () {
    compileCSS(config.paths.scss.src, config.paths.scss.dest, 'style');
});

gulp.task('CssReport', function() {
    return gulp.src(['dist/css/*.css'])
        .pipe(plugins.postcss([
            listSelectorsPlugin(reportToFile)
        ]))
        .pipe(gulp.dest('report/css-report.json'))
    ;
});

function reportToFile(mySelectorList) {
    console.log(mySelectorList);
}

//----------------------------------------------------
//  scripts
//----------------------------------------------------

var processJs = function(f, s, d) {
    return gulp.src(s)
        .pipe(plugins.plumber({
            errorHandler: reportError
        }))
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.concat(f))
        .pipe(plugins.if(productionMode, plugins.uglify()))
        .on('error', reportError)
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(d));
};

gulp.task('scripts:general', function() {
    var c = config.paths.javascript;

    processJs('general.js', c.general, c.dest);
});

//----------------------------------------------------
//  html
//----------------------------------------------------

gulp.task('html', function() {
    var c = config.paths.html;

    return gulp.src(c.src)
        .pipe(plugins.plumber({
            errorHandler: reportError
        }))
        .pipe(plugins.if(htmlIncludes, plugins.fileInclude({
          prefix: '@',
        })))
        .on('error', reportError)
        .pipe(plugins.if(productionMode, plugins.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeComments: true
        })))
        .on('error', reportError)
        .pipe(gulp.dest(c.dest))
    ;
});

//----------------------------------------------------
//  clean dist directory
//----------------------------------------------------

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

//----------------------------------------------------
//  copying files
//----------------------------------------------------

var fileCopy = function(s, d) {
    return gulp.src(s, { cwd: 'src' })
        .pipe(plugins.changed(d))
        .pipe(plugins.copy(config.base.dest));
};

gulp.task('images', function() {
    return gulp.src(config.paths.images.src, { cwd: 'src' })
        .pipe(plugins.changed(config.base.dest))
        .pipe(plugins.copy(config.base.dest));
});

//----------------------------------------------------
//  default task - watch things!
//----------------------------------------------------

gulp.task('default', function() {
    gulp.start('dist');
    gulp.watch(config.paths.scss.watch, ['scss']);
    gulp.watch(config.paths.javascript.general, ['scripts:general']);
    gulp.watch(config.base.src + config.paths.images.src, ['images']);
    gulp.watch(config.paths.html.watch, ['html']);
});

//----------------------------------------------------
//  dist tasks
//----------------------------------------------------

gulp.task('dist', ['clean'], function() {
    gulp.start('scss', 'scripts:general', 'images', 'html');
});

gulp.task('package', function () {
    runSequence(
        'package-version',
        'minor-bump'
    );
});

gulp.task('package-version', function() {
    var version = getPackageJsonVersion();
    return gulp.src( [config.base.dest + '/**/*' ] )
        .pipe(zip(package.name + '.v' + version + '.zip'))
        .pipe(gulp.dest(config.base.packages));
});

gulp.task('patch-bump', function() {
    return gulp.src('./package.json')
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});

gulp.task('minor-bump', function() {
    return gulp.src('./package.json')
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'));
});

//----------------------------------------------------
//  utils
//----------------------------------------------------

function getPackageJsonVersion () {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

var reportError = function (error) {
    var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    plugins.notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.',
        sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    }).write(error);

    plugins.util.beep(); // Beep 'sosumi' again

    // Inspect the error object
    //console.log(error);

    // Easy error reporting
    //console.log(error.toString());

    // Pretty error reporting
    var report = '';
    var chalk = plugins.util.colors.white.bgRed;

    report += chalk('Task:') + ' [' + error.plugin + ']\n';
    report += chalk('Issue:') + ' ' + error.message + '\n';
    if (error.lineNumber) { report += chalk('Line:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk('File:') + ' ' + error.fileName + '\n'; }
    console.error(report);

    // Prevent the 'watch' task from stopping
    this.emit('end');
}
