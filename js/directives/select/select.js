directives.directive('jsonSelect', function() {
  return {
    restrict: 'E',
    templateUrl: 'select/select.html',
    replace: true,
    require: '^jsonInput',
    scope: {
      parameter:"=",
      dependencies:"=",
      validation: "="
    },
    link:function(scope, elm, attr, jsonInputCtrl) {
      scope.selectValid = function() {
        return true;
      };
      scope.message = [];

      var evaluate = function() {
        scope.parameter.message = [];
        var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
        for(var i=0; i<a.message.length;i++)
        scope.parameter.message.push(a.message[i]);
        var valid =  scope.selectValid();
        valid =  a.isValid && valid;
        scope.isParameterValid = valid;
        return valid;
      }

      var unbind = scope.$watch('parameter', function() {
        if(scope.parameter==undefined) return;


        if(scope.parameter.isDynamic) {
            var getParametersCallback = function(error, data) {
                scope.parameter.values = data;
                scope.parameter.value = data[0].value;
                scope.$apply();
            };
            var getParameters = new Function("return function getP(cb){"+scope.parameter.getDynamicValues+"}")();
            getParameters(getParametersCallback);
        }


        jsonInputCtrl.isValid = scope.parameter.isValid;
        jsonInputCtrl.deactivation = scope.parameter.deactivation;
        scope.validationFunction = jsonInputCtrl.validationFunction;
        scope.parameter.evaluate = evaluate;

        if(scope.validation) {
          scope.$watch('parameter.value', function() {
              evaluate();
          });
        } else scope.isParameterValid = true;
        unbind();
      }, true);
    }
  };
});
