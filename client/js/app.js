/* global $ jQuery */

'use strict';

function FormManager() {
  this.currentSection = $('#householdForm section:first');
  this.currentSection.show();
  this.memberTemplate = $('#member-template').html();
  this.memberContainer = $('#member-container');
  this.addMember();
  this.addMember();
  this.addMember();
}

FormManager.prototype.addMember = function addMember() {
  if (this.memberContainer.children().length < 21) {
    this.memberContainer.append(this.memberTemplate);
  }
};

FormManager.prototype.parseMembers = function parseMembers() {
  var members = [];
  this.memberContainer.children().each(function(row) {
    var member = {
      name: $(this).find(':text').val(),
      isChild: $(this).find(':checkbox').prop('checked')
    };
    if (member.name !== '') {
      members.push(member);
    }
  });
  return members;
};

FormManager.prototype.values = function values() {
  var values = {
    name: $('#name').val() || null,
    address: $('#address').val() || null,
    email: $('#email').val() || null,
    phone: [
      {
        type: $('#primaryPhoneType').val() || null,
        number: $('#primaryPhone').val() || null
      },
      {
        type: $('#secondaryPhoneType').val() || null,
        number: $('#secondaryPhone').val() || null
      }
    ]
  };
  return values;
};

FormManager.prototype.next = function next(fn) {
  if (!!this.currentSection.next()[0]) {
    this.currentSection.fadeOut(400, () => {
      this.currentSection = this.currentSection.next();
      this.currentSection.fadeIn(400, fn || (() => { }));
    });
  }
};

FormManager.prototype.prev = function prev(fn) {
  if (!!this.currentSection.prev()[0]) {
    this.currentSection.fadeOut(400, () => {
      this.currentSection = this.currentSection.prev();
      this.currentSection.fadeIn(400, fn || (() => { }));
    })
  }
};

var form;
$(document).ready(function () {
  form = new FormManager();
  // capture enter key
  $(document).keypress(function(e) {
    if (e.which === 13) {
      form.next();
    }
  });

  $('.next').click(function() {
    form.next();
  });

  $('.prev').click(function() {
    form.prev();
  });

  $('#add-member').click(function() {
    form.addMember();
    if (form.memberContainer.children().length >= 20) {
      $(this).hide();
    }
  });
});

