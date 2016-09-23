/* global $ jQuery */

'use strict';
class FormManager {
  constructor() {
    this.currentSection = $('#householdForm section:first');
    this.currentSection.show();
  }

  next(fn) {
    if (!!this.currentSection.next()[0]) {
      this.currentSection.fadeOut(400, () => {
        this.currentSection = this.currentSection.next();
        this.currentSection.fadeIn(400, fn || (() => {}));
      });
    }
  }
}
let form;
$(document).ready(() => {
  form = new FormManager();
});

