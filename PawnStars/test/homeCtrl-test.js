describe('true', function() {
   it("Should be true", function() {
      expect(true).toBeTruthy();
   }); 
});

describe('homeCtrl', function() {
    var $rootScope,
    $scope,
    controller;

    beforeEach(function() {
        module('PawnStars'); 

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope'); 
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')('homeCtrl', {$scope: $scope});
        });
    }); 

    describe('Test homeCtrl', function() {
        it('Should check if the title is correct', function() {
            expect($scope.title).toEqual('This is Pawn Stars'); 
        }); 
    });


});

