directives.directive('datetime', function() {
  return {
    restrict: 'E',
    templateUrl: 'datetime/datetime.html',
    replace: true,
    require: '^jsonInput',
    scope: {
      parameter:"=",
      dependencies:"=",
    },
    link:function(scope, elm, attr, jsonInputCtrl) {
      scope.parameter.value = new moment(scope.parameter.value).toDate();
      scope.timeValid = function(){
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
        var valid =  scope.timeValid();
        valid =  a.isValid && valid;
        scope.isParameterValid = valid;
        return valid;
      }
    }
  };
});
