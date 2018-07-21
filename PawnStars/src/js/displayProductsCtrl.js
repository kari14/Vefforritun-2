angular.module('PawnStars').controller('displayProductsCtrl', function($scope, $location, Stars) {
    $scope.message = 'Here are our products';
    $scope.products = Stars.getTop10Products();
    $scope.sortColum = 'price';
    $scope.revSort = true;

    $scope.sortData = function(col) {
       $scope.revSort = ($scope.sortColum === col) ? !$scope.revSort : false;
       $scope.sortColum = col;
    };

    $scope.editProduct = function(product) {
        var productName = product.item;
        Stars.setCurrentProduct(product);
        $location.path('/editProduct/' + productName);
    };
});
