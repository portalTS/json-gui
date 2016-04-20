directives.directive('float', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/float/float.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameter.isValid)();
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
