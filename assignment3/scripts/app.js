(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', foundItemsDirective);


      function foundItemsDirective() {
          var ddo = {
            restrict: 'E',
            /*
            specifying
              restrict: 'EA'
            or not specifying the restrict property causes
              Error: $compile:multidir Multiple Directive Resource Contention
            /*
            the following relative path is with respect to the location of
            index.html and NOT the app.js page
            */
            templateUrl: './loader/itemsloaderindicator.template.html',
            scope: {
              emptySearch: '<',
              nothingFound: '<',
              foundItems: '<',
              onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'nidc',
            bindToController: true
          };

          return ddo;
        }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var nidc = this;
        // we need to initialize the found array to [] for some logic in the directive template
        nidc.foundItems = [];
        nidc.findItems = function () {
          // for every search query, we need to start with an empty nidc.foundItems array that will be populated with new results
          nidc.foundItems = [];
          if (nidc.searchTerm == undefined || nidc.searchTerm == null || nidc.searchTerm == "") {
            // console.log("Empty search box");
            nidc.emptySearch = true;
          } else {
            nidc.emptySearch = false;
            nidc.found = MenuSearchService.getMatchedMenuItems(nidc.searchTerm);
            // console.log(nidc.found);
            // console.log(nidc.found.value);

            nidc.found.then(function (foundItems) {
              // console.log(foundItems); //=> prints the array of objects foundItems
              // console.log(foundItems.data);
              nidc.foundItems = foundItems;
              if (nidc.foundItems.length == 0) {
                // console.log("Nothing found");
                nidc.nothingFound = true;
              } else {
                nidc.nothingFound = false;
              }
            })
            .catch(function (error) {
              console.log("Error: " + error);
            })
          }
          // console.log("Search term: " + nidc.searchTerm + "\n Items found? " + nidc.nothingFound);
        };

        nidc.removeItem = function (index) {
          if (nidc.foundItems.length != 0) {
            nidc.foundItems.splice(index, 1);
          }
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                // process result and only keep items that match
                // this callback will be called asynchronously
                // when the response/result is available
                var foundItems = [];
                // console.log(result);
                // console.log(result.data);
                // console.log(result.data.menu_items[0].description);
                result.data.menu_items.forEach(function(entry) {
                    if (entry.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                        // console.log(entry.description);
                        foundItems.push(entry);
                    }
                });
                // return processed items
                // console.log(foundItems);
                return foundItems;
              });
        };
    }

})();
