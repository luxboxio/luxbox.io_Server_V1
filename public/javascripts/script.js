// Angular Modul - lightswitch ===================================================

var LighSwitchModule = angular.module('lightswitch', []);


LighSwitchModule.controller('LighSwitchController', function($scope, $http) {

    $http.get('/lights')
        .success(function(data) {

            $scope.lights = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.setColor = function(light) {

        console.log(light);

        $http.put('/lights/' + light._id, angular.toJson(light)).then(function(response) {
            console.log('Success: ' + response.status);
        }, function(response) {
            console.log('Error: ' + response.status);
        });
    }

    $scope.lightOff = function(light) {
        data = 'rgb to null!!!';
        $http.put('/lights/' + id, data, config);
    }
});
