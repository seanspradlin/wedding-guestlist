/* global $ jQuery */

'use strict';

function FormManager() {
  this.currentSection = $('#householdForm section:first');
  this.currentSection.show();
}

FormManager.prototype.next = function next(fn) {
  if (!!this.currentSection.next()[0]) {
    this.currentSection.fadeOut(400, () => {
      this.currentSection = this.currentSection.next();
      this.currentSection.fadeIn(400, fn || (() => { }));
    });
  }
}

FormManager.prototype.prev = function prev(fn) {
  if (!!this.currentSection.prev()[0]) {
    this.currentSection.fadeOut(400, () => {
      this.currentSection = this.currentSection.prev();
      this.currentSection.fadeIn(400, fn || (() => { }));
    })
  }
}

let form;
$(document).ready(function () {
  form = new FormManager();
});

