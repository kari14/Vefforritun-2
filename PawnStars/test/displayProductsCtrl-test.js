describe('displayProductsCtrl', function() {
    var $rootScope,
    $scope,
    controller,
    location;

    beforeEach(function() {
        module('PawnStars'); 

        inject(function ($injector, $location) {
            $rootScope = $injector.get('$rootScope'); 
            $scope = $rootScope.$new();
            location = $location; 
            controller = $injector.get('$controller')('displayProductsCtrl', {$scope: $scope});
        });
    }); 

    describe('Test displayProductsCtrl', function() {
        it('Check if messages is correct', function() {
            expect($scope.message).toEqual('Here are our products');
        });    

        it('Check if sellerDetail takes me to a correct place', function() {
            var mockProduct = {item: 'Gold', category: 'Money', }
            $scope.editProduct(mockProduct);
            expect(location.path()).toBe('/editProduct/Gold');

        }); 

        it('Check if the sortData changes the sorting colum',  function() {
                $scope.sortColum = 'item';
                $scope.sortData('category');
                expect(sortColum = 'category');
        });

        it('Check if the sortData changes to reverse sort', function() {
                $scope.sortColum = 'category';
                $scope.revSort = true;
                $scope.sortData('category');
                expect($scope.revSort).toBeFalsy();
                $scope.sortData('category');
                expect($scope.revSort).toBeTruthy();
        });
    });
});



