import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';

const plumberSettings = {
  errorHandler: notify.onError((error) => ({
    title: 'CSS',
    message: error.message,
  })),
};

export function css() {
  return (
    global.gulp
      .src([global.path.src.css, 'node_modules/normalize.css/normalize.css'])
      .pipe(sourcemaps.init())
      .pipe(global.plugin.plumber(plumberSettings))
      .pipe(
        global.plugin.autoprefixer({
          overrideBrowserslist: ['last 5 versions'],
          grid: true,
        })
      )

      // .pipe(
      //   global.plugin
      //     .sass({
      //       outputStyle: 'compressed',
      //     })
      //     .on('error', global.plugin.sass.logError)
      // )
      .pipe(global.plugin.concat('main.min.css'))
      .pipe(sourcemaps.write())

      .pipe(global.gulp.dest(global.path.dest.css))
      .pipe(global.plugin.browserSync.stream())
  );
}
