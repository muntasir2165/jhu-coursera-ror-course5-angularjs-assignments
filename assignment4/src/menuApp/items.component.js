(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuApp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
