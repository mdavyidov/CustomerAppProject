var gulp = require('gulp'),
  Q = require('q'),
  config = require('./config'),
  less = require('gulp-less'),
  jade = require('gulp-jade'),
  spritesmith = require('gulp.spritesmith'),
  autoprefixer = require('gulp-autoprefixer'),
  livereload = require('gulp-livereload');

gulp.task('jade', jadeTask);
gulp.task('sprite', spriteTask);
gulp.task('less', lessTask);
gulp.task('less-sprite', ['sprite'], lessTask);
gulp.task('assets', ['jade', 'less-sprite']);
gulp.task('watch', ['assets'], watchTask);

function lessTask(done) {
  return gulp.src(config.src.less, { base: '.' })
    .pipe(less(config.less))
    .on('error', done)
    .pipe(autoprefixer(config.autoprefixer))
    .on('error', done)
    .pipe(gulp.dest(config.dest.less))
    .pipe(livereload());
}

function jadeTask(done) {
  return gulp.src(config.src.jade, { base: '.' })
    .pipe(jade(config.jade))
    .on('error', done)
    .pipe(gulp.dest(config.dest.jade))
    .pipe(livereload());
}

function spriteTask() {
  var defImg = Q.defer(),
    defCss = Q.defer();

  var spriteData = gulp.src(config.src.sprite)
    .pipe(spritesmith(config.spritesmith));

  spriteData.img
    .pipe(gulp.dest(config.dest.sprite))
    .pipe(livereload())
    .on('end', defImg.resolve);

  spriteData.css
    .pipe(gulp.dest(config.dest.sprite))
    .on('end', defCss.resolve);

  return Q.all([defImg.promise, defCss.promise]);
}

function watchTask() {
  var lessPaths = [
      config.src.less,
      config.src.lessComponents,
      config.src.spriteLess
    ],
    spritePaths = [
      config.src.sprite
    ],
    jadePaths = [
      config.src.jade,
      config.src.jadeComponents
    ];

  livereload.listen({
    basePath: 'src'
  });

  gulp
    .watch(lessPaths, ['less'])
    .on('change', printEvent);

  gulp
    .watch(spritePaths, ['sprite'])
    .on('change', printEvent);

  gulp
    .watch(jadePaths, ['jade'])
    .on('change', printEvent);
}

function printEvent(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}
