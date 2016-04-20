directives.directive('datetime', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/datetime/datetime.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameter.isValid)();

            //parse string date to Date object
            scope.parameter.value = new moment(scope.parameter.value).toDate();
            scope.timeValid = function(){
                if(typeof(scope.parameter.value)==="undefined" || scope.parameter.value=="Invalid Date"){
                    scope.parameter.message = "Select a valid date";
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message ="";
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.timeValid()){
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
