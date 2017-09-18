var app = angular.module("lojaApp", ['ngRoute']);

// configura o ngRoute
app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: 'principal.html',
                controller: 'lojaCtrl'
            })
            .when("/produto/:id", {
                templateUrl: 'produto.html',
                controller: 'lojaCtrl'
            })
            .otherwise({
                redirect: '/'
            })
            ;
});

app.controller('lojaCtrl', function ($scope, $http, $routeParams) {
    $scope.min = 0;
    $scope.max = 10000;

    $scope.msg = 'Dois textos';

    $scope.delta = function () {
        return $scope.max - $scope.min;
    };

    $http({
        url: 'produtos.json',
        method: 'GET'
    }).then(function (response) {
        $scope.produtos = response.data;
        
        for (var i = 0; i < $scope.produtos.length; i++) {
            if ($scope.produtos[i].id == $routeParams.id) {
                $scope.prod = $scope.produtos[i];
            }
        }
        
        //$scope.prod = $scope.produtos[0];
        //$scope.id = $routeParams.id;
    });

    $scope.filtro = function (valor, indice, vetor) {
        return valor.preco >= $scope.min && valor.preco <= $scope.max;
    };
});