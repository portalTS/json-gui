directives.directive('float', function() {
    return {
        restrict: 'E',
        templateUrl: 'float/float.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.floatValid = function(){
                if(typeof(scope.parameter.value) === 'undefined' || scope.parameter.value ==="NaN"){
                    scope.parameter.message = "Number format is not valid";
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }
             scope.parameter.evaluate = function(){
                scope.parameter.message ="";
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.floatValid()){
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
