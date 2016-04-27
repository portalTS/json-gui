directives.directive('jsonGui', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'json-gui/json-gui.html',
        replace: true,
        scope: {
            data:"=",
        },
        link:function(scope,elm,attr) {

            scope.pars = [];
            scope.dep=[];
            scope.buildParametersArray = function(){
              try{
                var jsonPars = scope.data.parameters;
              } catch(error){console.log(error);}
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
                    currDeps = scope.pars[par].dependencies;
                    for(var i=0;i<currDeps.length;i++) {
                        obj[currDeps[i]] = scope.pars[currDeps[i]];
                    }
                    scope.dep[par] = obj;
                }
            }

            scope.saveConfiguration= function(){
              console.log(scope.pars["upload"].value);
                var namelist="";
                for(var par in scope.pars){
                    // console.log(scope.pars[par]);
                    // console.log(par);

                    if(!scope.pars[par].evaluate()){
                        console.log("Error in some parameter");
                        return;
                    }
                    var functionBody = scope.buildComputingFunction(par);
                    namelist+= scope.pars[par].displayName+": "+ eval(functionBody)+";\n";
                }
                console.log(namelist);
            }

            /*
            This function is used to build two simpler object to be referred in the computedResult function: the parameter object, and the dependencies array.
            In this way, in the computedResult property of each parameter object in the json file, the current parameter and its dependencies can be referred in a simpler way.
            */
            scope.buildComputingFunction = function(par){
              var evalPrefix = "var parameter = scope.pars[par];";
              evalPrefix +=  "var dependencies = [];"
              scope.pars[par].dependencies.forEach(function(entry) {
                  evalPrefix += "dependencies['"+entry+"'] = scope.pars['"+entry+"'];";
              });
              return evalPrefix + "(function(){"+scope.pars[par].computedResult+"}())";
            };
            scope.hashToArray = function(items) {
                var result = [];
                var i = 0;
                for(item in items){
                    result[i] = item;
                    i++;
                }
                return result;
            }
            var computedResults  = function(){
              var results = [];
              var result;
              for(var par in scope.pars){
                  result = {};
                  if(!scope.pars[par].evaluate()){
                      console.log("Error in some parameter");
                      return;
                  }
                  var functionBody = scope.buildComputingFunction(par);
                   result.value = eval(functionBody);
                   result.name = scope.pars[par].dbName;
                   result.parameterType = scope.pars[par].parameterType;
                  results.push(result);
              }
              return results;
            };

            var unbind = scope.$watch("data", function() {
              console.log("data was changed");
              scope.buildParametersArray();
              scope.buildDependencies();
              try {
              scope.data.getComputedResults = computedResults;
            } catch(error){console.log(error); return;}
              unbind();
            });
        }
    }
});
