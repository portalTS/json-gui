directives.directive('float', function() {
    return {
        restrict: 'E',
        templateUrl: 'float/float.html',
        replace: true,
        require: '^jsonInput',
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope, elm, attr, jsonInputCtrl) {
            scope.floatValid = function(){
                if(typeof(scope.parameter.value) === 'undefined' || scope.parameter.value ==="NaN"){
                    scope.parameter.message.push("Number format is not valid");
                    return false;
                }
                return true;
            }
            scope.message = [];
            jsonInputCtrl.isValid = scope.parameter.isValid;
            scope.validationFunction = jsonInputCtrl.validationFunction;

            scope.parameter.evaluate = function() {
              scope.parameter.message = [];
              var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
              for(var i=0; i<a.message.length;i++)
                scope.parameter.message.push(a.message[i]);
              var valid =  scope.floatValid();
              valid =  a.isValid && valid;
              scope.isParameterValid = valid;
              return valid;
            }

            
        }
    };
});
