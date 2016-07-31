// Angular Modul - lightswitch ===================================================

var LighSwitchModule = angular.module('lightswitch', []);


LighSwitchModule.controller('LighSwitchController', function($scope, $http) {

    $http.get('/lights')
        .success(function(data) {

            // Mapping for icon name based on the type
            /*for (var i = 0; i < data.length; i++) {
                var typeName = data[i].type;
                var iconName = 'info';

                if (typeName === 'subscription') { iconName = 'subscriptions' };
                if (typeName === 'account') { iconName = 'account_circle' };
                if (typeName === 'newsletter') { iconName = 'mail_outline' };

                data[i].icon = iconName;
            }*/

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

        /*$http({
            method: 'PUT',
            url: '/lights/' + light._id,
            data: angular.toJson(light),
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        success(function(data, status, headers) {
            console.log('Success: ' + status);
            //$state.go('tab.home');
        }).
        error(function(data, status, headers) {
            console.log('Error: ' + status);
        });*/

    }

    $scope.lightOff = function(light) {
        data = 'rgb to null!!!';
        $http.put('/lights/' + id, data, config);
    }
});
