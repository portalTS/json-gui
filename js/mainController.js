var app = angular.module('app', ['json-gui']).config(function(){
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
    $scope.data = $scope.parseModelFromJson("json/wrf-arw.json");
    $scope.values = {};
    $scope.getAllResults = function(){
      $scope.results =  $scope.data.getConfiguration();
      console.log($scope.results);
    }
    $scope.options = {viewOffset:52};

    //TODO
    /*
    new types
      checkbox, radio button, email?, password?, hidden?
      domain single point
    */



});
