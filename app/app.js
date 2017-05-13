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
      controller:"yourRecipesController"
    })
    .otherwise({
      redirectTo:'/'
    });
}]);

recipeApp.service('recipeService',function(){
  var recipes=[];
  this.createRecipe=function(recipe){
    recipes.push({recipe})
  }
  this.getRecipes=function(){
    return recipes;
  }
});

recipeApp.controller('yourRecipesController',['$scope','recipeService',function($scope,recipeService){
  $scope.yourRecipes=[];
  $scope.init = function () {
    $scope.yourRecipes=recipeService.getRecipes();
    console.log($scope.yourRecipes);
    $scope.recipes=$scope.yourRecipes;
    $scope.checkRecipes($scope.yourRecipes);
  };
  $scope.checkRecipes=function(recipes){
    if(recipes===undefined){
      return false;
    } else {
      return true;
    }

  }
}]);

recipeApp.controller('recipeFormController',['$scope','$location','recipeService',function($scope,$location,recipeService){
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
    recipeService.createRecipe($scope.recipes);
    $location.path('/yourRecipes');
  };

  $scope.create="Create A New Recipe";
  $scope.hideHeader=function(){
    $scope.create="";
  }
}]);
