directives.directive('integer', function() {
    return {
        restrict: 'E',
        templateUrl: 'integer/integer.html',
        replace: true,
        require: '^jsonInput',
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope, elm, attr, jsonInputCtrl) {
          scope.integerValid = function(){
            if(scope.parameter.value % 1 !== 0 || scope.parameter.value ==="NaN" || typeof(scope.parameter.value) =="undefined"){
              scope.parameter.message.push("Number is not an Integer");
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
            var valid =  scope.integerValid();
            valid =  a.isValid && valid;
            scope.isParameterValid = valid;
            return valid;
          }

        

        }
    };
});
