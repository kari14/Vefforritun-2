describe('displaySellersCtrl', function() {
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
            controller = $injector.get('$controller')('displaySellersCtrl', {$scope: $scope});
        });
    }); 

    describe('Test displaySellerCtrl', function() {
        it('Check if messages is correct', function() {
            expect($scope.message).toEqual('Here are our Pawn Stars');
        });    

        it('Check if sellers is correct', function() {
            expect($scope.sellers).toEqual([
                {
                    name: 'Rick Harrison',
                    category: 'WW2 Memorabilia',
                    //TODO
                    //image: 'img/Rick'
                },
                {
                    name: 'Big Hoss',
                    category: 'Sports Memorabilia',
                    //TODO
                    //image: 'img/Correy'
                },
                {
                    name: 'The Old Man',
                    category: 'Gold and Silver',
                    //TODO
                    //image: 'img/OldMan'
                },
                {
                    name: 'Chumlee',
                    category: 'Vintage Video Games and Shoes',
                    //TODO
                    //image: 'img/Chum'
                }
            ])
        });

        it('Check if sellerDetail takes me to a correct place', function() {
            var mockStar = {name: 'Chumlee',category: 'Vintage Video Games and Shoes',}
            $scope.sellerDetail(mockStar);
            expect(location.path()).toBe('/displaySellers/Chumlee');

        }); 

        it('Check if the sortData changes the sorting colum',  function() {
                $scope.sortColum = 'item';
                $scope.sortData('name');
                expect(sortColum = 'name');
        });

        it('Check if the sortData changes to reverse sort', function() {
                $scope.sortColum = 'name';
                $scope.revSort = true;
                $scope.sortData('name');
                expect($scope.revSort).toBeFalsy();
                $scope.sortData('name');
                expect($scope.revSort).toBeTruthy();
        });
    });
});



