directives.directive('datetime', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/datetime/datetime.html',
        replace: true,
        scope: {
            parameters:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameters.isValid)();
            
            //parse string date to Date object
            scope.parameters.value = new moment(scope.parameters.value).toDate();
            scope.timeValid = function(){
                if(typeof(scope.parameters.value)==="undefined" || scope.parameters.value=="Invalid Date"){
                    scope.parameters.message = "Select a valid date";
                    return false;
                }
                scope.parameters.message = "";
                return true;
            }
            scope.parameters.evaluate = function(){
                scope.parameters.message ="";
                var validation = scope.validationFunction(scope.parameters, scope.dependencies);
                if(!scope.timeValid()){
                    return false;
                }

                if(!validation.valid){
                    scope.parameters.message = validation.message;
                    return false;
                }
                scope.parameters.message = "";
                return true;
            }

            scope.$watch("parameters.message", function() {
            });

        }
    };
});
