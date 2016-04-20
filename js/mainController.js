var app = angular.module('app', ['json-gui', 'ngFileUpload']).config(function(){
});
app.run(function(){

})


app.controller('modelController', function($scope, $timeout) {
    $scope.parseModelFromJson = function(url) {
        $.getJSON(url, function(data) {         
            $scope.data = data;
            console.log($scope.data);
        });
    }
    $scope.data = $scope.parseModelFromJson("../json/wrf-arw.json");
});