angular.module('PawnStars').controller('translateCtrl', function($scope, $location, $translate, Stars) {
    $scope.changeLang = function(key) {
        Stars.changeLang(key);
    };
});
