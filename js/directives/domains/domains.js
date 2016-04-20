directives.directive('domains', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/domains/domains.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var num =scope.parameter.dbName;
            /**************** VALIDATION ******************/
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function(scope.parameter.isValid)();
            scope.domainsValid = function(){
                if(typeof(scope.mapRectangles)=="undefined" || Object.keys(scope.mapRectangles).length===0) {
                    scope.parameter.message = "Select at least one domain";
                    return false;
                }
                return true;
            }
            /**************** EVALUATION ******************/
            scope.parameter.evaluate = function(){
                scope.parameter.message ="";
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.domainsValid()){
                    return false;
                }

                if(!validation.valid){
                    scope.parameter.message = validation.message;
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }

            /**************** INIT ******************/
            scope.initializeParameter = function(){
                var height =  parseInt($("body").css("width"))*2/6;
                console.log($("body").css("width"));
                scope.height=height+"px";
                scope.mapRectangles = [];
                initializeMap();
                $timeout(function(){
                    var length = Object.keys(scope.parameter.value).length;
                    var i=0;
                    for(var r in scope.parameter.value){
                        if(i==scope.parameter.maxDomains){
                            $timeout(function(){
                                scope.parameter.value.splice(i, length-i);//PROBLEMI function "delete other values" to be implemented
                            });
                            return;
                        }
                        var rect = addRectangleToMap(scope.parameter.value[num+i], scope.map);
                        scope.mapRectangles[num+rect.zIndex] = rect;
                        if(!checkRectangle(rect.zIndex)) {
                            break;
                        }
                        i++;
                    }
                    scope.value = scope.parameter.value;
                    scope.modal = $("#"+scope.parameter.dbName+"modal");
                    scope.modal.find(".btn-success").click(function(){
                        deleteRectangle(scope.deletingIndex);
                    });
                }, true);
            }
            var initializeMap = function() {
                var mapCanvas = document.getElementById(scope.parameter.dbName+"map");
                var mapOptions = {
                    center: new google.maps.LatLng(scope.parameter.centerCoords.lat, scope.parameter.centerCoords.long),
                    zoom: scope.parameter.mapZoom,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                }
                scope.map = new google.maps.Map(mapCanvas, mapOptions);
                scope.rectOptions = {
                    strokeColor: '#00BCD4',
                    strokeWeight: 1,
                    draggable:true,
                    fillColor: '#00BCD4',
                    fillOpacity: 0.5,
                    editable:true,
                    clickable:true,
                    zIndex:10,
                    map: scope.map,
                };
                scope.drawingManager = new google.maps.drawing.DrawingManager({
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [
                            google.maps.drawing.OverlayType.RECTANGLE
                        ]
                    },
                    rectangleOptions:scope.rectOptions
                });
                scope.drawingManager.setMap(scope.map);
                google.maps.event.addListener(scope.drawingManager,'rectanglecomplete',function(rectangle){
                    var zInd = scope.rectOptions.zIndex+1;
                    scope.rectOptions.zIndex =zInd;
                    scope.drawingManager.setOptions({rectangleOptions:scope.rectOptions});
                    //meno uno perchè non ho ancora fatto il push del rettangolo nell'array.
                    if(Object.keys(scope.mapRectangles).length-1 == scope.parameter.maxDomains) {
                        rectangle.setMap(null);
                        return;
                    }
                    rectangle.addListener('bounds_changed', function(){
                        boundsChanged(rectangle, zInd);
                    });
                    rectangle.addListener('click', function(){
                        rectangleClicked(zInd);
                    })

                    scope.mapRectangles[num+zInd]=rectangle;
                    addRectangleToValues(rectangle,zInd);
                    checkRectangle(zInd);

                });

            }

            /**************** EVENTS ******************/
            var boundsChanged = function(rectangle, i){
                var bounds = rectangle.getBounds();
                $timeout(function(){
                    var value = scope.parameter.value[num+i];
                    if(typeof(value)==="undefined") return;
                    value.northEast.lat = bounds.getNorthEast().lat();
                    value.northEast.long = bounds.getNorthEast().lng();
                    value.southWest.lat = bounds.getSouthWest().lat();
                    value.southWest.long = bounds.getSouthWest().lng();
                    checkRectangle(i);
                });
            }

            var rectangleClicked = function(index) {
                scope.modal.find("#number").html(parseInt(getPositionOfKey(num+index))+1)
                if(index==Object.keys(scope.mapRectangles).length-1)
                    scope.modal.find("#lastDomain").css("display", "none");
                else
                    scope.modal.find("#lastDomain").css("display", "inline");
                scope.deletingIndex=parseInt(getPositionOfKey(num+index));
                scope.modal.modal('show');

            }


            var deleteRectangle = function(index){
                scope.modal.modal('hide');
                if(scope.parameter.onlyNested){
                    $timeout(function(){
                        var pos =  index;
                        var keys = Object.keys(scope.mapRectangles);
                        var howMany = keys.length - pos;
                        console.log("pos: "+pos);
                        console.log("howm: "+howMany);
                        for(var c = 0;c<howMany;c++) {
                            scope.mapRectangles[keys[c + pos]].setMap(null);
                            delete scope.mapRectangles[keys[c + pos]];
                            delete scope.parameter.value[keys[c + pos]];
                        }
                    }, 0);
                }
                else {
                    $timeout(function(){
                        scope.mapRectangles[num+index].setMap(null);
                        delete scope.mapRectangles[num+index];
                        delete scope.parameter.value[num+index];
                    }, 0);
                }
            }

            /**************** CONTROLS ******************/

            // if checks are enabled, check if the just drawn - or just modified - rectangle, is yet coherent with his parent and his direct child.
            // if it is not wrt the child -> all children are deleted.
            // if it is not wrt the parent -> the rectangle itself and all his children are deleted.
            // @par: currentIndex -> the index of the rectangle to be checked;
            // @return: boolean that inform if the rectangle is ok or has been deleted.
            var checkRectangle = function(currentIndex){
                if(!scope.parameter.onlyNested) return true;
                var keys = Object.keys(scope.mapRectangles);
                var current = scope.mapRectangles[num+currentIndex];
                var cBounds = current.getBounds();
                var keyPosition = getPositionOfKey(num+currentIndex);
                if(keyPosition>0){
                    //error wrt parent domain
                    var prec = keys[keyPosition-1];
                    var pBounds = scope.mapRectangles[prec].getBounds();
                    if((cBounds.getSouthWest().lat() < pBounds.getSouthWest().lat() || cBounds.getSouthWest().lat() > pBounds.getNorthEast().lat())
                       || (cBounds.getSouthWest().lng() < pBounds.getSouthWest().lng() || cBounds.getSouthWest().lng() > pBounds.getNorthEast().lng())
                       || (cBounds.getNorthEast().lat() > pBounds.getNorthEast().lat() || cBounds.getNorthEast().lat() < pBounds.getSouthWest().lat())
                       || (cBounds.getNorthEast().lng() > pBounds.getNorthEast().lng() || cBounds.getNorthEast().lng() < pBounds.getSouthWest().lng())){
                        var howMany = keys.length - keyPosition;
                        $timeout(function(){
                            var offs;
                            for(var count = 0;count<howMany;count++){
                                offs = count + keyPosition;
                                if(typeof(scope.mapRectangles[keys[offs]])==="undefined") return false;
                                scope.mapRectangles[keys[offs]].setMap(null);
                                delete scope.mapRectangles[keys[offs]];
                                delete scope.parameter.value[keys[offs]];
                            }
                        });
                        return false;
                    }
                }
                if(keyPosition<keys.length-1) {
                    //error wrt child domain
                    var nBounds = scope.mapRectangles[keys[keyPosition+1]].getBounds();
                    if((cBounds.getSouthWest().lat() > nBounds.getSouthWest().lat() )
                       || (cBounds.getSouthWest().lng() > nBounds.getSouthWest().lng())
                       || (cBounds.getNorthEast().lat() < nBounds.getNorthEast().lat())
                       || (cBounds.getNorthEast().lng() < nBounds.getNorthEast().lng())){
                        var howMany = keys.length - keyPosition - 1;
                        $timeout(function(){
                            for(var count = 0;count<howMany;count++){
                                var offs = count+keyPosition+1;
                                if(typeof(scope.mapRectangles[keys[offs]])==="undefined") return;
                                scope.mapRectangles[keys[offs]].setMap(null);
                                delete scope.mapRectangles[keys[offs]];
                                delete scope.parameter.value[keys[offs]];
                            }
                        });
                        return false;
                    }
                }
                return true;
            }

            /**************** UTILS ******************/

            var addRectangleToMap = function(rectangle, map){
                var mapRectangle =  new google.maps.Rectangle({
                    strokeColor: '#00BCD4',
                    strokeWeight: 1,
                    draggable:true,
                    fillColor: '#00BCD4',
                    fillOpacity: 0.5,
                    editable:true,
                    clickable:true,
                    zIndex:Object.keys(scope.mapRectangles).length,
                    map: map,
                    bounds: {
                        north: rectangle.northEast.lat,
                        south: rectangle.southWest.lat,
                        east: rectangle.northEast.long,
                        west: rectangle.southWest.long,
                    }
                });
                var i =Object.keys(scope.mapRectangles).length;
                mapRectangle.addListener('bounds_changed', function(){
                    boundsChanged(mapRectangle, i);

                });
                mapRectangle.addListener('click', function(){
                    rectangleClicked(i);
                })
                return mapRectangle;
            }

            var addRectangleToValues = function(mapRectangle,ind){
                var southWest = mapRectangle.getBounds().getSouthWest();
                var northEast = mapRectangle.getBounds().getNorthEast();
                var rectangle = {
                    southWest: {lat:southWest.lat(), long:southWest.lng()},
                    northEast: {lat:northEast.lat(), long:northEast.lng()}
                };
                $timeout(function(){
                    scope.parameter.value[num+ind] = rectangle;
                });
            }

            var getPositionOfKey = function(key){
                var keys = Object.keys(scope.mapRectangles);
                for(var i=0;i<keys.length;i++)
                    if(keys[i]===key) return i;
            }

            scope.range = function() {
                return Object.keys(scope.parameter.value);
            };


            /***************** START ********************/
            $timeout(function(){
                google.maps.event.addDomListener(window, 'load', scope.initializeParameter());
            });
            scope.$watch("parameter.message", function() {
            });
        }
    };
});
