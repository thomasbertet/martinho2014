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
            .otherwise({
                redirectTo:'/'
            });
    })

    .controller('DefaultVoteCtrl', function($scope, MmoVoteStore, $location, $timeout) {
        $scope.votes = MmoVoteStore;

        $scope.save = function() {
            console.log("saving ! ");
            MmoVoteStore.$add($scope.vote, function() {
                $timeout(function() { $location.path('/'); });
            });

        };
    });
