angular.module('PawnStars').controller('addSellerCtrl', function($scope, Stars, toastr) {
    $scope.message = 'Add a new Pawn Star';
    $scope.obj = {};
    $scope.button = 'Add';
    $scope.addStar = function() {
        if(!$scope.obj.starName || !$scope.obj.starCategory) {
            toastr.error('Sorry you need to fill in a name and a category', 'Error');
        }
        else {
            var newStar = {name: $scope.obj.starName, category: $scope.obj.starCategory};
            Stars.add(newStar);   
            toastr.success(newStar.name + ' was successfully added!', 'Success');
        }
    };
});
