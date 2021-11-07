const { dest, src } = require("gulp");
const imagemin = require("gulp-imagemin");
const images = () => {
  return src("./src/resources/**/*.(jpg|jpeg|png)")
    .pipe(
      imagemin(
        [
          imagemin.mozjpeg({ quality: 60, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5, interlaced: null }),
        ],
        { silent: true }
      )
    )
    .pipe(dest("./dist/resources/**"));
};
module.exports = images;
