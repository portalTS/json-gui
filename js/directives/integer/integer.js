directives.directive('integer', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/integer/integer.html',
        replace: true,
        scope: {
            parameters:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameters.isValid)();
            scope.integerValid = function(){
                if(scope.parameters.value % 1 !== 0 || scope.parameters.value ==="NaN"){
                    scope.parameters.message = "Number is not an Integer";
                    return false;
                }
                scope.parameters.message = "";
                return true;
            }
            scope.parameters.evaluate = function(){
                scope.parameters.message ="";
                var validation = scope.validationFunction(scope.parameters, scope.dependencies);
                if(!scope.integerValid()){
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
