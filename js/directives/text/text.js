directives.directive('textParameter', function() {
    return {
        restrict: 'E',
        templateUrl: 'text/text.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.textValid = function(){
                if(scope.parameter.value===""){
                    scope.parameter.message.push("Insert some text");
                    return false;
                }
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.textValid()){
                    bool = false;
                }

                if(!validation.valid){
                    scope.parameter.message.push(validation.message);
                    return false;
                }
                return bool;
            }
        }
    };
});
