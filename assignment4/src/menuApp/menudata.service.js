(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");;


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      method: "GET",
        url: (ApiBasePath + "/categories.json")
    })
    .then(function(response){
      console.log("Response for the all categories query: ", response.data);
      return response.data;
    })
    .catch(function(error){
      console.log("Somthing went wrong when searching for all categories");
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params:  {category: categoryShortName}
    })
    .then(function(response){
      console.log("Response for all menu items under the category " + categoryShortName + ": ", response.data);
      return response.data;
    })
    .catch(function(error){
      console.log("Somthing went wrong when searching for menu items under the category " + categoryShortName);
    });
  };
}

})();
