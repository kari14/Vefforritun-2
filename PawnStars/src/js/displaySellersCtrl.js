angular.module('PawnStars').controller('displaySellersCtrl', function($scope, $location, Stars) {
    $scope.message = 'Here are our Pawn Stars';
    $scope.sellers = Stars.get(); 

    $scope.sellerDetail = function(star) {
        Stars.setCurrentStar(star);
        $location.path('/displaySellers/' + star.name);
    };

    $scope.sortColum = 'name';
    $scope.revSort = true;

    $scope.sortData = function(col) {
        $scope.revSort = ($scope.sortColum === col) ? !$scope.revSort : false;
        $scope.sortColum = col;
    };

});
