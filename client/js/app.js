/* global $ jQuery */

'use strict';

function FormManager() {
  this.memberTemplate = $('#member-template').html();
  this.memberContainer = $('#member-container');
  this.addMember();
  this.addMember();
  this.addMember();
}

FormManager.prototype.submit = function submit(fn) {
  fn = fn || function() {};
  if (this.validate('#name') && this.validate('#address')) {
    $.ajax({
      type: 'POST',
      url: 'household',
      data: this.values(),
      dataType: 'json',
      complete: fn
    });
  }
}

FormManager.prototype.validate = function validate(selector) {
  var element = $(selector);
  if (!element.val()) {
    element.closest('.form-group').addClass('has-error');
    return false;
  } else {
    element.closest('.form-group').removeClass('has-error');
    return true;
  }
};

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
    ],
    household: this.parseMembers()
  };
  return values;
};

FormManager.prototype.loadSummary = function loadSummary() {
  var values = this.values();
  $('#sumName').html(values.name);
  $('#sumAddress').html(values.address);
  $('#sumEmail').html(values.email);
  $('#sumPrimaryPhone').html(values.phone[0].number);
  $('#sumSecondaryPhone').html(values.phone[1].number);
  var householdHtml = '';
  values.household.forEach(function(member) {
    householdHtml += '<li>' + member.name + '</li>';
  });
  $('#sumHousehold').html(householdHtml);

}

$(document).ready(function () {
  var form = new FormManager();

  $('#name').blur(function() {
    form.validate('#name');
  });

  $('#address').blur(function() {
    form.validate('#address');
  });

  $('#add-member').click(function() {
    form.addMember();
    if (form.memberContainer.children().length >= 20) {
      $(this).hide();
    }
  });

  $('#form').submit(function(e) {
    e.preventDefault();
    form.submit(function() {
      $('#form').fadeOut(400, function() {
        $('#thanks').removeClass('hide');
      });
    });
  });

  new google.maps.places.Autocomplete(document.getElementById('address'));
});

