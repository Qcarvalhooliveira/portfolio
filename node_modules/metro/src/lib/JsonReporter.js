"use strict";

class JsonReporter {
  constructor(stream) {
    this._stream = stream;
  }
  update(event) {
    if (Object.prototype.toString.call(event.error) === "[object Error]") {
      event = Object.assign(event, {
        message: event.error.message,
        stack: event.error.stack,
      });
    }
    this._stream.write(JSON.stringify(event) + "\n");
  }
}
module.exports = JsonReporter;
