directives.directive('textParameter', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/text/text.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameter.isValid)();
            scope.textValid = function(){
                if(scope.parameter.value===""){
                    scope.parameter.message = "Insert some text";
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message ="";
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.textValid()){
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
