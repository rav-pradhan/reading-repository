const { parallel, watch } = require("gulp");
const sass = require("./tasks/sass");
const images = require("./tasks/images");

const watcher = () => {
  watch(
    "./src/scss/**/*.scss",
    {
      ignoreInitial: true,
    },
    sass
  )
  watch(
    "./src/images/**/*",
    {
      ignoreInitial: true,
    },
    images
  )
};

exports.default = parallel(images, sass);
exports.watch = watcher;
