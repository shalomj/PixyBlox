class FileReaderService {

  /**
   * File reader instance
   */
  fileReader;

  /**
   * The file object
   */
  file;

  /**
   * Default event listeners options
   */
  defaultOptions = {
    
    /**
     * Will be called when the file is being loaded by the FileReader
     * 
     * @param {Number} percent Percentage of the file that is being loaded
     */
    progress: function (percent) {},

    /**
     * Will be called once the FileReader completed the read progress
     */
    completed: function () {

    },

    /**
     * Will be called once the file has been completely loaded by the FileReader
     * 
     * @param {String} result Result of the FileReader
     */
    load: function (result) {}
  };

  /**
   * Combined options
   */
  options = {};

  /**
   * Create new instance of FileReaderService.
   * 
   * @param {Object} file The uploaded file to read
   * @param {Object} options Options for event listeners
   */
  constructor(file, options) {
    this.file = file;

    this.fileReader = new FileReader();

    // Merge options
    this.options = {...this.defaultOptions, ...options};

    this._init();
  }

  /**
   * Initialize the service
   */
  _init() {

    // Listen to load event
    this.fileReader.addEventListener('load', event => {
      const result = event.target.result;

      this.options.load.call(null, result);
    });

    // Listen to progress event
    this.fileReader.addEventListener('progress', event => {
      if (event.loaded && event.total) {
        // Progress percentage
        const percent = (event.loaded / event.total) * 100;

        this.options.progress.call(null, percent);

        // Progress completed
        if (percent === 100) {
          this.options.completed.call();
        }
      }
    });
  }

  /**
   * Reads the file as data URL
   */
  read() {
    this.fileReader.readAsDataURL(this.file);
  }
}

export default FileReaderService;