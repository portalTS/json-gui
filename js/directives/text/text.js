directives.directive('textParameter', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/text/text.html',
        replace: true,
        scope: {
            parameters:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameters.isValid)();
            scope.textValid = function(){
                if(scope.parameters.value===""){
                    scope.parameters.message = "Insert some text";
                    return false;
                }
                scope.parameters.message = "";
                return true;
            }
            scope.parameters.evaluate = function(){
                scope.parameters.message ="";
                var validation = scope.validationFunction(scope.parameters, scope.dependencies);
                if(!scope.textValid()){
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
