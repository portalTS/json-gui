directives.directive('integer', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/integer/integer.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameter.isValid)();
            scope.integerValid = function(){
                if(scope.parameter.value % 1 !== 0 || scope.parameter.value ==="NaN"){
                    scope.parameter.message = "Number is not an Integer";
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message ="";
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.integerValid()){
                    return false;
                }

                if(!validation.valid){
                    scope.parameter.message = validation.message;
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }
            scope.$watch("parameter.message", function() {
            });

        }

    };
});
