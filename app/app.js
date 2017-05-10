var recipeApp = angular.module('recipeApp',[]);

recipeApp.controller('recipeFormController',['$scope',function($scope){
  console.log(1232323)
  $scope.ingredients=[];
  $scope.addIngredient=function(ingredient){
    $scope.ingredients.push(
      {
        "ingredient":ingredient
      }
    );
    console.log($scope.ingredients);
    $scope.ingredient='';
  };
}]);
