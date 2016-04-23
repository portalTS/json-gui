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

    $scope.getAllResults = function(){
      $scope.results =  $scope.data.getComputedResults();
      console.log($scope.results);
    }

    //TODO
    /*
    new types
      checkbox, radio button, email?, password?, hidden?
      domain single point
    */



});
