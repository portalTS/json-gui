directives.directive('datetime', function() {
    return {
        restrict: 'E',
        templateUrl: 'datetime/datetime.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();

            //parse string date to Date object
            scope.parameter.value = new moment(scope.parameter.value).toDate();
            scope.timeValid = function(){
                if(typeof(scope.parameter.value)==="undefined" || scope.parameter.value=="Invalid Date"){
                    scope.parameter.message.push("Select a valid date");
                    return false;
                }
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.timeValid()){
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
