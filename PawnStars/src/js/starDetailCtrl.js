angular.module('PawnStars').controller('starDetailCtrl', function($scope, $location, Stars) {
    var star = Stars.getCurrentStar();
    $scope.starName = star.name;
    $scope.starCategory = star.category; 

    $scope.editSeller = function() {
        $location.path('/editSeller/' + star.name);
    };
});
