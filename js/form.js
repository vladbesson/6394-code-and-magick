'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewFieldsName = document.querySelector('.review-fields-name');
  var reviewFieldsText = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    reviewName.focus();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var formElement = document.forms['review-form'];

  var reviewName = formElement['review-name'];
  var reviewText = formElement['review-text'];
  var reviewSubmitButton = formElement['review-submit'];

  reviewSubmitButton.disabled = true;

  var radioInputs = document.querySelectorAll('#review-form input[type="radio"]');
  for (var i = 0; i < radioInputs.length; i++) {
    radioInputs[i].onchange = function() {
      if (this.value > 3) {
        reviewText.required = false;
      }
      isValide();
    };
  }

  reviewName.onchange = function() {
    if (this.value !== '') {
      reviewFieldsName.hidden = true;
      isValide();
    }
  };

  reviewText.onchange = function() {
    if (this.value !== '') {
      reviewFieldsText.hidden = true;
      isValide();
    }
  };

  var isValide = function() {
    if (reviewName.value !== '') {
      for (var n = 0; n < radioInputs.length; n++) {
        if (radioInputs[n].checked === true ) {
          if (radioInputs[n].value > 3) {
            reviewSubmitButton.disabled = false;
            reviewFields.style.display = 'none';
          } else if (reviewText.value !== '') {
            reviewSubmitButton.disabled = false;
            reviewFields.style.display = 'none';
          }
        }
      }
    }
  };

  formElement.onsubmit = function(e) {
    e.preventDefault();
    var dateToExpire = +Date.now() + 7 * 24 * 60 * 60 * 1000;
    var formattedDateToExpire = new Date(dateToExpire).toUTCString();
    document.cookie = 'name=' + reviewName.value + ';expires=' + formattedDateToExpire;

    for (var v = 0; v < radioInputs.length; v++) {
      if (radioInputs[v].checked === true ) {
        document.cookie = 'review=' + radioInputs[v].value + ';expires=' + formattedDateToExpire;
      }
    }
    this.submit();
  };
})();
