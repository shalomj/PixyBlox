class FileReaderService {

  fileReader;

  file;

  defaultOptions = {
    progress: function (percent) {

    },

    completed: function () {

    },

    load: function (result) {

    }
  };

  options = {};

  constructor(file, options) {
    this.file = file;

    this.fileReader = new FileReader();

    this.options = {...this.defaultOptions, ...options};

    this._init();
  }

  _init() {

    this.fileReader.addEventListener('load', event => {
      const result = event.target.result;

      this.options.load.call(null, result);
    });

    this.fileReader.addEventListener('progress', event => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;

        this.options.progress.call(null, percent);

        if (percent === 100) {
          this.options.completed.call();
        }
      }
    });
  }

  read() {
    this.fileReader.readAsDataURL(this.file);
  }
}

export default FileReaderService;