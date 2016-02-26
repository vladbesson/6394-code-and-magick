'use strict';

(function() {

  var reviews;
  var reviewsFilter = document.querySelector('.reviews-list');
  reviewsFilter.style.display = 'none';

  var filters = document.querySelectorAll('.reviews-filter input');
  var activeFilter = 'reviews-all';

  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var clickElId = evt.target.id;
      setActiveFilter(clickElId);
    };
  }

  function setActiveFilter(id) {
    if(activeFilter === id) {
      return;
    }

    var filteredReviews = reviews.slice(0);

    switch (id) {
      case 'reviews-good':
      filteredReviews = filteredReviews.sort(function(a,b) {
        return b.rating - a.rating;
      });
      break;
      case 'reviews-bad':
      filteredReviews = filteredReviews.sort(function(a,b) {
        return a.rating - b.rating;
      });
      break;
      case 'reviews-popular':
      filteredReviews = filteredReviews.sort(function(a,b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
      case 'reviews-recent':
      filteredReviews = filteredReviews.sort(function(a,b) {
        return b.date - a.date;
      });
      break;
    }

    renderReviews(filteredReviews);
  }

  function renderReviews(reviews) {
    reviewsFilter.innerHTML = '';
    var fragment = document.createDocumentFragment();

    reviews.forEach(function(review) {
      var element = getElementFromTemplate(review);
      fragment.appendChild(element);
    });

    reviewsFilter.appendChild(fragment);
  }

  getReviews();

  function getReviews() {
    reviewsFilter.classList.add('reviews-list-loading');
    var url = '//o0.github.io/assets/json/reviews.json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      reviews = JSON.parse(rawData);
      reviewsFilter.classList.remove('reviews-list-loading');
      renderReviews(reviews);
    };
    xhr.onerror = function(e) {
      document.querySelector('.reviews').classList.add('reviews-load-failure');
    };

    xhr.send(null);
  }

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

})();