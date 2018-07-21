angular.module('PawnStars', ['ngRoute', 'toastr', 'pascalprecht.translate']).config(function($routeProvider, $translateProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'src/Views/home.html', 
            controller: 'homeCtrl'
        })
        .when('/displaySellers', {
            templateUrl: 'src/Views/displaySellers.html',
            controller: 'displaySellersCtrl'
        })
        .when('/displaySellers/:Star', {
            templateUrl: '/src/Views/starDetail.html',
            controller: 'starDetailCtrl'
        })
        .when('/addSeller', {
            templateUrl: 'src/Views/addSeller.html',
            controller: 'addSellerCtrl'
        })
        .when('/products', {
            templateUrl: 'src/Views/displayProducts.html',
            controller: 'displayProductsCtrl'
        })
        .when('/addProducts', {
            templateUrl: 'src/Views/addProducts.html',
            controller: 'addProductsCtrl'
        })
        .when('/editSeller/:Star', {
            templateUrl: 'src/Views/addSeller.html',
            controller: 'editSellerCtrl'
        })
        .when('/editProduct/:productName', {
            templateUrl: 'src/Views/addProducts.html',
            controller: 'editProductsCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

        $translateProvider.fallbackLanguage('en');
        $translateProvider.registerAvailableLanguageKeys(['en', 'is'], {
            'en_*' : 'en',
            'is_*' : 'is'
        });

        $translateProvider.translations('en', {
            ITEM: 'Item',
            CATEGORY: 'Category',
            PRICE: 'Price',
            NAME: 'Name',
            HOME: 'HOME',
            SELLERS: 'Sellers',
            ADDSELLERS: 'Add seller',
            TOPPRODUCTS: 'Top products',
            ADDPRODUCTS: 'Add products',
            EDIT: 'Edit',
            BUTTON_LANG_EN: 'English',
            BUTTON_LANG_IS: 'Icelandic'
        });
        $translateProvider.translations('is', {
            ITEM: 'Vara',
            CATEGORY: 'Flokkur',
            PRICE: 'Verð',
            NAME: 'Nafn',
            HOME: 'Heim',
            SELLERS: 'Seljendur',
            ADDSELLERS: 'Bæta við seljanda',
            TOPPRODUCTS: 'Vinsælast',
            ADDPRODUCTS: 'Bæta við vörum',
            EDIT: 'Breyta',
            BUTTON_LANG_EN: 'Enska',
            BUTTON_LANG_IS: 'Íslenska'
        });

        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('en');
});
