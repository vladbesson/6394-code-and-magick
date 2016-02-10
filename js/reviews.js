'use strict';

var reviewsFilter = document.querySelector('.reviews');
reviewsFilter.style.display = 'none';

reviews.forEach(function(review) {
  var element = getElementFromTemplate(review);
  reviewsFilter.appendChild(element);
});

/**
 * @param {Object} revie
 * @return {Element}
 */
function getElementFromTemplate(data) {
  var template = document.querySelector('#review-template');

  var element;
  if ('content' in template) {
    element = template.content.children[0].cloneNode(true);
  } else {
    element = template.children[0].cloneNode(true);
  }

  element.querySelector('.review-rating').textContent = data.rating;
  element.querySelector('.review-text').textContent = data.description;

  var avatar = new Image(124, 124);
  avatar.onload = function() {
    var newImage = avatar;
    var oldImage = element.querySelector('.review-author');
    element.replaceChild(newImage, oldImage);
  };
  avatar.onerror = function() {
    element.classList.add('review-load-failure');
  };
  avatar.src = data.author['picture'];
  avatar.alt = data.author['name'];
  avatar.title = data.author['name'];



  return element;
}

reviewsFilter.style.display = 'block';

