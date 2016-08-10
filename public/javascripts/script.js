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

        $http.put('/lights/' + light.light_id, angular.toJson(light)).then(function(response) {
            console.log('Success: ' + response.status);
        }, function(response) {
            console.log('Error: ' + response.status);
        });
    }

    $scope.lightOff = function(light) {

        // ToDo: set all color values to zero
        for (var i = 0; i < light.areas.length; i++) {
            for (var j = 0; j < light.areas[i].values.length; j++) {
                light.areas[i].values[j].value = 0;
            }
        }

        console.log(light);

        $http.put('/lights/' + light.light_id, angular.toJson(light)).then(function(response) {
            console.log('Success: ' + response.status);
        }, function(response) {
            console.log('Error: ' + response.status);
        });
    }

    $scope.removeLight = function(light) {

        $http.delete('/lights/' + light.light_id).then(function(response) {
            console.log('Success: ' + response.status);

        }, function(response) {
            console.log('Error: ' + response.status);
        });
    }
});
