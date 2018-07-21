angular.module('PawnStars').factory('Stars',function($rootScope, $translate) {
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
