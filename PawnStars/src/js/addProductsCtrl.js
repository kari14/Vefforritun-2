angular.module('PawnStars').controller('addProductsCtrl', function($scope, Stars, toastr) {
    $scope.message = 'Add a new Product';
    $scope.obj = {};
    $scope.button = 'Add';
    $scope.addProduct = function() {
        if(!$scope.obj.productName || !$scope.obj.productCategory || !$scope.obj.productPrice) {
            toastr.error('Error missing information', 'Error');
        }
        else {
            var newProduct = {item: $scope.obj.productName, category: $scope.obj.productCategory, price: $scope.obj.productPrice};
            Stars.addProduct(newProduct);   
            toastr.success(newProduct.item + ' was successfully added', 'Success');
             
        }
    };
});
