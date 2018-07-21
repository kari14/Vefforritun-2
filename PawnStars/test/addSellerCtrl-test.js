describe('addSellerCtrl', function() {
    var $rootScope,
    $scope,
    controller,
    location,
    service;

    beforeEach(function() {
        module('PawnStars'); 

        inject(function ($injector, $location, Stars) {
            $rootScope = $injector.get('$rootScope'); 
            $scope = $rootScope.$new();
            location = $location; 
            controller = $injector.get('$controller')('addSellerCtrl', {$scope: $scope});
        });
    }); 
    describe('Testing addSeller function', function() {
        var myList = [
        {
            name: 'Rick Harrison',
            category: 'WW2 Memorabilia',
            //TODO
            //image: 'img/RickHarrisonwcredit.jpg'
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
        },
        {
		name: 'Kari',
		category: 'Everything'
	    }
    ];
        it('Check if addSeller works', function() {
            var newStar = {name: 'Kari', category: 'Everything'};
	        $scope.addStar(newStar);
	        expect($scope.get === myList);
        });
    });
});



