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
                    scope.parameter.message.push("Number format is not valid");
                    return false;
                }
                return true;
            }
             scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.floatValid()){
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
