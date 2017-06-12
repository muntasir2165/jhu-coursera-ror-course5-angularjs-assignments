(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuCategoriesController', MenuCategoriesController);

MenuCategoriesController.$inject = ['categories'];
function MenuCategoriesController(categories) {
  var menuCategories = this;
  menuCategories.categories = categories;
}

})();
