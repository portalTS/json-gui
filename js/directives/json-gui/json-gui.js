directives.directive('jsonGui', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/json-gui/json-gui.html',
        replace: true,
        scope: {
            data:"=",
        },
        link:function(scope,elm,attr) {

            scope.pars = [];
            scope.dep=[];
            scope.buildParametersArray = function(){
                var jsonPars = scope.data.parameters;
                for(var par in jsonPars){
                    scope.pars[jsonPars[par].dbName] = jsonPars[par];
                }
            }
            $timeout(function(){
                $('#nav').affix({
                    offset: {
                    }
                });
                $('body').scrollspy({ target: '#scrollspy' })
            });

            scope.buildDependencies = function(){
                var currDeps;
                for(var par in scope.pars){ // par contiene il nome del parametro
                    var obj={};
                    currDeps = scope.pars[par].dependenciesNames;
                    for(var i=0;i<currDeps.length;i++) {
                        obj[currDeps[i]] = scope.pars[currDeps[i]];
                    }
                    scope.dep[par] = obj;
                }
            }

            scope.saveConfiguration= function(){
                var namelist="";
                for(var par in scope.pars){
                    console.log(scope.pars[par]);

                    if(!scope.pars[par].evaluate()){
                        console.log("Error in some parameter");
                        return;
                    }
                    namelist+= scope.pars[par].displayName+": "+ eval(scope.pars[par].computedResult)+";\n";
                }
                console.log(namelist);
            }


            scope.hashToArray = function(items) {
                var result = [];
                var i = 0;
                for(item in items){
                    result[i] = item;
                    i++;
                }
                return result;
            }
            scope.buildParametersArray();
            scope.buildDependencies();
        }

    };
});
