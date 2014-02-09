angular.module('mmo', ['ngRoute', 'firebase'])

    .value('fbURL', 'https://blazing-fire-6035.firebaseio.com/')

    .factory('MmoVoteStore', function($firebase, fbURL) {
        return $firebase(new Firebase(fbURL + 'vote'));
    })

    .factory('MmoCountingStore', function($firebase, fbURL) {
        return $firebase(new Firebase(fbURL + 'counting'));
    })

    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller:'DefaultVoteCtrl',
                templateUrl:'views/vote/list.html'
            })
            .when('/about', {
                controller:'AboutCtrl',
                templateUrl:'views/about.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    })

    .controller('DefaultVoteCtrl', function($scope, MmoVoteStore, $location, $timeout) {
        $scope.votes = MmoVoteStore;

        $scope.save = function() {
            MmoVoteStore.$add($scope.vote, function() {
                $timeout(function() {
                    $location.path('/');
                    $scope.voted = true;
                });
            });
        };
    })
    .controller('AboutCtrl', function($scope, $location, $timeout) {

    });
