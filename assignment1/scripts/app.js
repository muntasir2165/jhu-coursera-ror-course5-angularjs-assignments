(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {

    $scope.dishes = "";
    $scope.feedback = "";

    $scope.countDishes = function () {

      var dishList = $scope.dishes.split(',');
      var countDishes = 0;
      dishList.forEach(function(dish) {
        /*note that sampleString.trim() will take the following inputs:
                ""
                " "
                "           "
                "                       "
          and return ""
        */
        if (dish.trim() !== "") {
          countDishes++;
        }
      });

      if (countDishes == 0) {
        $scope.feedback = "Please enter data first";
      } else if (countDishes <= 3) {
        $scope.feedback = "Enjoy!";
      } else {
        $scope.feedback = "Too much!";
      }

    };

  }

})();
