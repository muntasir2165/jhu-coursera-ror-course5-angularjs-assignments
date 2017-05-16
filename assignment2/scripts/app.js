(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var tbc = this;

    tbc.toBuy = ShoppingListCheckOffService.getItemsToBuy();

    tbc.itemBought = function($index) {
      ShoppingListCheckOffService.itemBought($index);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var abc = this;

    abc.bought = ShoppingListCheckOffService.getItemsBought();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    // List of items to buy
    var toBuy = [
      {
        name: "Orange Juice",
        quantity: "2"
      },
      {
        name: "Eggs",
        quantity: "12"
      },
      {
        name: "Apple",
        quantity: "4"
      },
      {
        name: "Condensed Milk",
        quantity: "2"
      },
      {
        name: "Potatoes",
        quantity: "10"
      }
    ];

    // List of items bought
    var bought = [];

    service.getItemsToBuy = function () {
      return toBuy;
    };

    service.getItemsBought = function () {
      return bought;
    };

    service.itemBought = function (itemIndex) {
      bought.push(toBuy[itemIndex]);
      toBuy.splice(itemIndex, 1);
    };
  }

})();
