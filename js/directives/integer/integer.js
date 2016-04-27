directives.directive('integer', function() {
    return {
        restrict: 'E',
        templateUrl: 'integer/integer.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.integerValid = function(){
                if(scope.parameter.value % 1 !== 0 || scope.parameter.value ==="NaN"){
                    scope.parameter.message.push("Number is not an Integer");
                    return false;
                }
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.integerValid()){
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
