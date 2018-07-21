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
;angular.module('PawnStars').factory('Stars',function($rootScope, $translate) {
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

    ];
    var currentStar = {};
    var currentProduct = {};
    var tmp = 'kall';

    var myProducts = [
        {
            item: 'Enigma',
            category: 'WW2 Memorabilia',
            price: 200000 
        },
        {
            item: 'Signed basketball by Michael Jordan',
            category: 'Sports Memorabilia',
            price: 2000 
        }, 
        {
            item: 'Packman video game from 1979',
            category: 'Antique Video Games',
            price: 500
        }, 
        {
            item: 'Gold OZ',
            category: 'Gold and Silver',
            price: 1269
        }, 
        {
            item: 'Silver OZ',
            category: 'Gold and Silver',
            price: 16
        }, 
        {
            item: '1738 FLINTLOCK HORSE PISTOL',
            category: 'Antique Wepons',
            price: 9500
        }, 
        {
            item: 'Remington Rifel',
            category: 'Antique Wepons',
            price: 1100
        }, 
        {
            item: 'DRAGOON FLINTLOCK PISTOL',
            category: 'Antique Wepons',
            price: 2950
        }, 
        {
            item: 'BULLIT - JOTA LEAL',
            category: 'Art',
            price: 16800
        }, 
        {
            item: 'PARTNERS IN PAWN - ORIGINAL PAINTING - JOTA LEAL',
            category: 'Art',
            price: 14400
        }, 
    ];


    //Can I get one bubbleSort please?
    //http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/
    function bubbleSort(a) {
        var swapped;
        do {
            swapped = false;
            for (var i=0; i < a.length-1; i++) {
                if (a[i].price < a[i+1].price) {
                    var temp = a[i];
                    a[i] = a[i+1];
                    a[i+1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
        return a;
    }

    return {
        get: function() {
            return myList;
        },
        add: function(newPawnStar) {
            myList.push(newPawnStar);
        },
        setCurrentStar: function(star) {
           currentStar = star;
        },
        getCurrentStar: function() {
            return currentStar;
        },
        getTop10Products: function() {
            //Cheat a little!!!
            bubbleSort(myProducts);
    
            //Take first 10.
            var top10 = [];
            for(var i = 0; i < 10; i++) {
                top10.push(myProducts[i]);
            }
            return top10;
        },
        addProduct: function(newProduct) {
            myProducts.push(newProduct);         
        },
        changeLang: function(key) {
            $translate.use(key);
        },
        setCurrentProduct: function(product) {
            currentProduct = product; 
        },
        getCurrentProduct: function() {
            return currentProduct;
        },
        editStar: function(star) {
            var tmp = [];
            for(var i = 0; i < myList.length; i++) {
                //Ok this way we have the problem that 
                //if the sellers name and his category are the same 
                //than we delete both of them. TODO fix, add id to the sellers.
                if(myList[i] !== star) {
                    tmp.push(myList[i]);
                }
            }
            myList = tmp;
        },
        editProduct: function(product) {
            var tmp = [];
            for(var i = 0; i < myProducts.length; i++) {
                if(myProducts[i] !== product) {
                    tmp.push(myProducts[i]);
                }
            }
            myProducts = tmp;
        }
    };
});
;angular.module('PawnStars').controller('addProductsCtrl', function($scope, Stars, toastr) {
    $scope.message = 'Add a new Product';
    $scope.obj = {};
    $scope.button = 'Add';
    $scope.addProduct = function() {
        if(!$scope.obj.productName || !$scope.obj.productCategory || !$scope.obj.productPrice) {
            toastr.error('Error missing information', 'Error');
        }
        else {
            var newProduct = {item: $scope.obj.productName, category: $scope.obj.productCategory, price: $scope.obj.productPrice};
            Stars.addProduct(newProduct);   
            toastr.success(newProduct.item + ' was successfully added', 'Success');
             
        }
    };
});
;angular.module('PawnStars').controller('addSellerCtrl', function($scope, Stars, toastr) {
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
;angular.module('PawnStars').controller('displayProductsCtrl', function($scope, $location, Stars) {
    $scope.message = 'Here are our products';
    $scope.products = Stars.getTop10Products();
    $scope.sortColum = 'price';
    $scope.revSort = true;

    $scope.sortData = function(col) {
       $scope.revSort = ($scope.sortColum === col) ? !$scope.revSort : false;
       $scope.sortColum = col;
    };

    $scope.editProduct = function(product) {
        var productName = product.item;
        Stars.setCurrentProduct(product);
        $location.path('/editProduct/' + productName);
    };
});
;angular.module('PawnStars').controller('displaySellersCtrl', function($scope, $location, Stars) {
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
;angular.module('PawnStars').controller('editProductsCtrl', function($scope, Stars, toastr, $location) {
    var currProduct = Stars.getCurrentProduct();
    $scope.message = 'Please edit the product ' + currProduct.item;
    $scope.button = 'Edit';
    
    $scope.addProduct = function() {
       if(!$scope.obj.productName) {
            toastr.error('Missing new product name', 'Error');
       }
       else if(!$scope.obj.productName) {
            toastr.error('Missing new product category', 'Error');
       }
       else if(!$scope.obj.productPrice) {
            toastr.error('Missing new product price', 'Error');
       }
       else {
            Stars.editProduct(currProduct);
            var obj = {}; 
            var newProduct = {item: $scope.obj.productName, category: $scope.obj.productCategory, price: $scope.obj.productPrice};
            Stars.addProduct(newProduct);
            toastr.success('Product was updated', 'success');
            $location.path('/products');    
       }
    };

});
;angular.module('PawnStars').controller('editSellerCtrl', function($scope, Stars, toastr) {
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
;angular.module('PawnStars').controller('homeCtrl', function($scope, $location, $translate, Stars) {
    $scope.title = 'This is Pawn Stars'; 
});
;angular.module('PawnStars').controller('starDetailCtrl', function($scope, $location, Stars) {
    var star = Stars.getCurrentStar();
    $scope.starName = star.name;
    $scope.starCategory = star.category; 

    $scope.editSeller = function() {
        $location.path('/editSeller/' + star.name);
    };
});
;angular.module('PawnStars').controller('translateCtrl', function($scope, $location, $translate, Stars) {
    $scope.changeLang = function(key) {
        Stars.changeLang(key);
    };
});
