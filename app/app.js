var recipeApp = angular.module('recipeApp',[]);

recipeApp.controller('recipeFormController',['$scope',function($scope){
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
}]);
