angular.module('PawnStars').controller('editProductsCtrl', function($scope, Stars, toastr, $location) {
    var currProduct = Stars.getCurrentProduct();
    $scope.message = 'Please edit the product ' + currProduct.item;
    $scope.button = 'Edit';
    
    $scope.addProduct = function() {
       if(!$scope.obj.productName) {
            toastr.error('Missing new product name', 'Error');
       }
       else if(!$scope.obj.productName) {
            toastr.error('Missing new product category', 'Error');
       }
       else if(!$scope.obj.productPrice) {
            toastr.error('Missing new product price', 'Error');
       }
       else {
            Stars.editProduct(currProduct);
            var obj = {}; 
            var newProduct = {item: $scope.obj.productName, category: $scope.obj.productCategory, price: $scope.obj.productPrice};
            Stars.addProduct(newProduct);
            toastr.success('Product was updated', 'success');
            $location.path('/products');    
       }
    };

});
