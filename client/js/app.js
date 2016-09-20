/* global $ jQuery */

'use strict';
function SectionManager() {
  this._sections = [
    '#nameSection',
    '#addressSection',
    '#contactSection',
    '#membersSection',
  ];

  this._currentSection = 0;
  this._progress = $('footer');
  this.hideOtherSections();
}

SectionManager.prototype.updateProgressBar =
  function updateProgressBar() {
    const progress = `${(this._currentSection / this._sections.length) * 100}%`;
    $('footer').animate({ width: progress }, 400);
  };

SectionManager.prototype.current =
  function current() {
    return $(this._sections[this._currentSection]);
  };

SectionManager.prototype.hideOtherSections =
  function hideOtherSections() {
    this.current().show().siblings().hide();
  };

SectionManager.prototype.prev =
  function prev(fn) {
    if (this._currentSection > 0) {
      this.current().fadeOut(400, () => {
        this._currentSection--;
        this.updateProgressBar();
        this.current().fadeIn(400, fn);
      });
    }
  };

SectionManager.prototype.next =
  function next(fn) {
    if (this._currentSection < (this._sections.length - 1)) {
      this.current().fadeOut(400, () => {
        this._currentSection++;
        this.updateProgressBar();
        this.current().fadeIn(400, fn);
      });
    }
  };

$(document).ready(() => {
  const manager = new SectionManager();
  $('#btnBack').click(() => {
    manager.prev();
  });
  $('#btnNext').click(() => {
    manager.next();
  });
});

