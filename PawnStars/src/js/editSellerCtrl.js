angular.module('PawnStars').controller('editSellerCtrl', function($scope, Stars, toastr) {
    var myStar = Stars.getCurrentStar();
    $scope.message = 'Edit the seller ' + myStar.name + ' or his/her category ' + myStar.category;
    $scope.button = 'Edit';

    $scope.addStar = function() {
        //We will first find the star, delete him/her and 
        //than add her again with new value.

        Stars.editStar(myStar);
        var obj = {};
        if(!$scope.obj.starName || !$scope.obj.starCategory) {
            toastr.error('Sorry you need to fill in a name and a category', 'Error');
        }
        else {
            var newStar = {name: $scope.obj.starName, category: $scope.obj.starCategory};
            Stars.add(newStar);
            toastr.success(myStar.name + ' was successfully edited to ' + newStar.name, 'Success');
        }
    };
});
