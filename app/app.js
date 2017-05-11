var recipeApp = angular.module('recipeApp',['ngRoute']);

recipeApp.config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/addRecipe',{
      templateUrl:"views/addRecipe.html",
      controller:"recipeFormController"
    })
    .when('/',{
      templateUrl:"views/home.html",
    })
    .when('/yourRecipes',{
      templateUrl:"views/yourRecipes.html",
    })
    .otherwise({
      redirectTo:'/'
    });
}]);

recipeApp.controller('recipeFormController',['$scope','$location',function($scope,$location){
  $scope.ingredients=[];
  $scope.addIngredient=function(ingredient){
    if(ingredient===undefined){
      return;
    }
    $scope.ingredients.push(
      {
        "ingredient":ingredient
      }
    );
    $scope.ingredient='';
    $scope.ingredient=undefined;
  };

  $scope.directions=[];
  $scope.addDirection=function(direction){
    if(direction===undefined){
      return;
    }
    $scope.directions.push(
      {
        "direction":direction
      }
    );
    $scope.direction='';
    $scope.direction=undefined;
  }

  $scope.recipes=[];
  $scope.createRecipe=function() {
    $scope.recipes.push({
      name:$scope.recipeName,
      ingredients:$scope.ingredients,
      directions:$scope.directions
    });
    alert($scope.recipeName)
    console.log($scope.recipes);
    $location.path('/yourRecipes');
  };

  $scope.create="Create A New Recipe";
  $scope.hideHeader=function(){
    $scope.create="";
  }
}]);
