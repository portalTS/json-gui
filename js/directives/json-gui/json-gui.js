directives.directive('jsonGui', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'json-gui/json-gui.html',
        replace: true,
        scope: {
            data:"=",
            values: "=",
            options:'='
        },
        link:function(scope,elm,attr) {
            scope.obj = {}
            scope.obj.pars = {};
            scope.dep=[];
            scope.buildParametersArray = function(){
              try{
                var jsonPars = scope.data.parameters;
              } catch(error){console.log(error);}
                for(var par in jsonPars){
                    scope.obj.pars[jsonPars[par].dbName] = jsonPars[par];
                }
                $timeout(function(){
                scope.$watch("obj.pars", function(newVal, oldVal){
                  for(var property in scope.obj.pars){
                    scope.obj.pars[property].evaluate();
                  }
                }, true);
                });
            }
            $timeout(function(){
                $('#nav').affix({
                    offset: {
                    }
                });
            });

            scope.buildDependencies = function(){
                var currDeps;
                for(var par in scope.obj.pars){ // par contiene il nome del parametro
                    var obj={};
                    currDeps = scope.obj.pars[par].dependencies;
                    for(var i=0;i<currDeps.length;i++) {
                        obj[currDeps[i]] = scope.obj.pars[currDeps[i]];
                    }
                    scope.dep[par] = obj;
                }
            }
            scope.loadConfiguration = function(){
              for(var i=0;i<scope.values.length;i++){
                scope.obj.pars[scope.values[i].dbName].value = scope.values[i].value;
              }
            }
            scope.saveNamelist = function(){
                var namelist="";
                for(var par in scope.obj.pars){
                    if(!scope.obj.pars[par].evaluate()){
                        console.log("Error in some parameter");
                        continue;
                    }
                    var functionBody = scope.buildComputingFunction(par);
                    namelist+= scope.obj.pars[par].displayName+": "+ eval(functionBody)+";\n";
                }
                console.log(namelist);
            }

            scope.getConfiguration = function(){
              var results = [];
              var result;
              scope.data.isConfigured = true;
              for(var par in scope.obj.pars){
                  result = {};
                  if(!scope.obj.pars[par].evaluate()){
                      console.log("Error in some parameter");
                      scope.data.isConfigured = false;
                      continue;
                  }

                   result.value = scope.obj.pars[par].value;
                   result.dbName = scope.obj.pars[par].dbName;
                   result.parameterType = scope.obj.pars[par].parameterType;
                  results.push(result);
              }
              return results;
            }

            /*
            This function is used to build two simpler object to be referred in the computedResult function: the parameter object, and the dependencies array.
            In this way, in the computedResult property of each parameter object in the json file, the current parameter and its dependencies can be referred in a simpler way.
            */
            scope.buildComputingFunction = function(par){
              var evalPrefix = "var parameter = scope.obj.pars[par];";
              evalPrefix +=  "var dependencies = [];"
              scope.obj.pars[par].dependencies.forEach(function(entry) {
                  evalPrefix += "dependencies['"+entry+"'] = scope.obj.pars['"+entry+"'];";
              });
              return evalPrefix + "(function(){"+scope.obj.pars[par].computedResult+"}())";
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
            var computedResults  = function() {
              var results = [];
              var result;
              for(var par in scope.obj.pars){
                  result = {};
                  if(!scope.obj.pars[par].evaluate()){
                      console.log("Error in some parameter");
                      return;
                  }
                  var functionBody = scope.buildComputingFunction(par);
                   result.value = eval(functionBody);
                   result.name = scope.obj.pars[par].dbName;
                   result.parameterType = scope.obj.pars[par].parameterType;
                  results.push(result);
              }
              return results;
            };

            scope.logPars= function(){
              for(var i in scope.obj.pars){
                console.log(i+" = "+scope.obj.pars[i].value);
              }
            }
            var unbind = scope.$watch("data", function() {
              scope.buildParametersArray();
              scope.buildDependencies();
              scope.loadConfiguration();
              try {
              scope.data.getConfiguration = scope.getConfiguration;
            } catch(error)
                {console.log(error); return;}
              unbind();
            });
        }
    }
});
