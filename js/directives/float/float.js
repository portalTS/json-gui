directives.directive('float', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/float/float.html',
        replace: true,
        scope: {
            parameters:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameters.isValid)();
            scope.floatValid = function(){
                if(typeof(scope.parameters.value) === 'undefined' || scope.parameters.value ==="NaN"){
                    scope.parameters.message = "Number format is not valid";
                    return false;
                }
                scope.parameters.message = "";
                return true;
            }
             scope.parameters.evaluate = function(){
                scope.parameters.message ="";
                var validation = scope.validationFunction(scope.parameters, scope.dependencies);
                if(!scope.floatValid()){
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
