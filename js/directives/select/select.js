directives.directive('selectParameter', function() {
    return {
        restrict: 'E',
        templateUrl: 'select/select.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.selectValid = function(){
                return true;
            }
            ;
            scope.parameter.evaluate = function(){
                scope.parameter.message ="";
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.selectValid()){
                    return false;
                }

                if(!validation.valid){
                    scope.parameter.message = validation.message;
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }
        }
    };
});
