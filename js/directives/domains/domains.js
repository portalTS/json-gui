directives.directive('domains', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'domains/domains.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var num =scope.parameter.dbName;
            /**************** VALIDATION ******************/
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.domainsValid = function(){
                var bool = true;
                if(scope.parameter.drawDomains && (typeof(scope.mapRectangles)=="undefined" ||scope.mapRectangles.length===0)) {
                    scope.parameter.message.push("Select at least one domain");
                    bool =  false;
                }
                if(scope.parameter.drawMarkers && (typeof(scope.mapMarkers)=="undefined" ||scope.mapMarkers.length===0)) {
                    scope.parameter.message.push("Add at least one marker");
                    return false;
                }
                return bool;
            }
            /**************** EVALUATION ******************/
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.domainsValid()){
                    bool = false;
                }
                if(!validation.valid){
                    scope.parameter.message.push(validation.message);
                    return false;
                }
                return bool;
            }

            /**************** INIT ******************/
            scope.initializeParameter = function(){
                var height =  parseInt($("body").css("width"))*2/6;
                scope.height=height+"px";
                scope.mapRectangles = [];
                scope.mapMarkers = [];
                initializeMap();
                $timeout(function(){
                    var length = scope.parameter.value.domains.length;
                    var i=0;
                    var valueRect;
                    //INIT DOMAINS
                    if(scope.parameter.drawDomains) {
                      for(var r in scope.parameter.value.domains){
                          if(i==scope.parameter.maxDomains){
                                  scope.parameter.value.domains.splice(i, length-i);
                              break;
                          }
                          valueRect = scope.parameter.value.domains[i];
                          var rect = addRectangleToMap(valueRect, scope.map);
                          scope.mapRectangles.push(rect);
                          if(!checkRectangle(valueRect.id)) {
                              break;
                          }
                          i++;
                      }
                      scope.modal = $("#"+scope.parameter.dbName+"modal");
                      scope.modal.find(".btn-success").click(function(){
                          deleteRectangle(scope.deletingIndex);
                      });
                      i=0;
                  }

                  //INIT MARKERS
                  if(scope.parameter.drawMarkers) {
                      for(var m in scope.parameter.value.markers){
                        if(i==scope.parameter.maxMarkers){
                          $timeout(function(){
                              scope.parameter.value.markers.splice(i, length-i);
                          });
                          break;
                        }
                        var mark = addMarkerToMap(scope.parameter.value.markers[m], scope.map, i);
                        scope.mapMarkers.push(mark);
                        i++;
                      }
                  }
                }, true);
            }

            var initializeMap = function() {
                var mapCanvas = document.getElementById(scope.parameter.dbName+"map");
                var mapOptions = {
                    center: new google.maps.LatLng(scope.parameter.center.lat, scope.parameter.center.long),
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
                var drawModes = [];
                if(scope.parameter.drawMarkers) drawModes.push(google.maps.drawing.OverlayType.MARKER);
                if(scope.parameter.drawDomains) drawModes.push(google.maps.drawing.OverlayType.RECTANGLE);
                scope.drawingManager = new google.maps.drawing.DrawingManager({
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: drawModes
                    },
                    rectangleOptions:scope.rectOptions
                });
                scope.drawingManager.setMap(scope.map);
                 google.maps.event.addListener(scope.drawingManager, "markercomplete", function(marker){
                   var tmstamp = new Date().getTime();
                    var ind = scope.mapMarkers.length;
                    if(scope.mapMarkers.length== scope.parameter.maxMarkers){
                      //TODO ALERT?
                      marker.setMap(null);
                      return;
                    }
                    marker.addListener('click', function(){
                        markerClicked(tmstamp);
                    });
                    $timeout(function(){
                      addMarkerToValues(marker, tmstamp);
                      scope.mapMarkers.push(marker);
                      console.log(scope.mapMarkers);
                    }, 0);


                 });

                google.maps.event.addListener(scope.drawingManager,'rectanglecomplete',function(rectangle){
                    var tmstamp = new Date().getTime();
                    var zInd = scope.rectOptions.zIndex+1;
                    scope.rectOptions.zIndex =zInd;
                    scope.drawingManager.setOptions({rectangleOptions:scope.rectOptions});
                    if(scope.mapRectangles.length== scope.parameter.maxDomains) {
                      //TODO ALERT?
                        rectangle.setMap(null);
                        return;
                    }
                    rectangle.setTitle = tmstamp; //setting the id as the rectangle title
                    rectangle.addListener('bounds_changed', function(){
                        boundsChanged(rectangle, tmstamp);
                    });
                    rectangle.addListener('click', function(){
                        rectangleClicked(tmstamp);
                    })
                    $timeout(function(){
                      scope.mapRectangles.push(rectangle);
                      addRectangleToValues(rectangle, tmstamp);
                    }, 0);
                });
            }

            /**************** EVENTS ******************/
            var boundsChanged = function(rectangle, id){
                var bounds = rectangle.getBounds();
                $timeout(function(){
                    var index = getPositionOfId(id, scope.parameter.value.domains);
                    var value = scope.parameter.value.domains[index];
                    if(typeof(value)==="undefined") return;
                    value.northEast.lat = bounds.getNorthEast().lat();
                    value.northEast.long = bounds.getNorthEast().lng();
                    value.southWest.lat = bounds.getSouthWest().lat();
                    value.southWest.long = bounds.getSouthWest().lng();
                    checkRectangle(id);
                });
            }

            var rectangleClicked = function(id) {
               console.log("clicked" +id);
               console.log( scope.parameter.value.domains);
                var index = parseInt(getPositionOfId(id, scope.parameter.value.domains));
                console.log(index);
                scope.modal.find("#number").html(index+1)
                if(index==scope.mapRectangles.length-1)
                    scope.modal.find("#lastDomain").css("display", "none");
                else
                    scope.modal.find("#lastDomain").css("display", "inline");
                scope.deletingIndex = index;
                scope.modal.modal('show');

            }


            var deleteRectangle = function(index){
                scope.modal.modal('hide');
                console.log(index);
                if(scope.parameter.onlyNested){
                    $timeout(function(){
                        var howMany = scope.mapRectangles.length - index;
                        for(var c = 0;c<howMany;c++) {
                            scope.mapRectangles[c + index].setMap(null);
                        }
                        scope.mapRectangles.splice(index, howMany);
                        scope.parameter.value.domains.splice(index, howMany);
                    }, 0);
                }
                else {
                    $timeout(function(){
                        scope.mapRectangles[index].setMap(null);
                        scope.mapRectangles.splice(index, 1);
                        scope.parameter.value.domains.splice(index, 1);
                    }, 0);
                }

            }

            /**************** CONTROLS ******************/

            // if checks are enabled, check if the just drawn - or just modified - rectangle, is yet coherent with his parent and his direct child.
            // if it is not wrt the child -> all children are deleted.
            // if it is not wrt the parent -> the rectangle itself and all his children are deleted.
            // @par: id -> the id of the rectangle to be checked;
            // @return: boolean that inform if the rectangle is ok or has been deleted.
            var checkRectangle = function(id){
                if(!scope.parameter.onlyNested) return true
                var keyPosition = getPositionOfId(id, scope.parameter.value.domains);
                var current = scope.mapRectangles[keyPosition];
                var cBounds = current.getBounds();
                if(keyPosition>0){
                    //checking for an error wrt parent domain
                    var pBounds = scope.mapRectangles[keyPosition-1].getBounds();
                    if((cBounds.getSouthWest().lat() < pBounds.getSouthWest().lat() || cBounds.getSouthWest().lat() > pBounds.getNorthEast().lat())
                       || (cBounds.getSouthWest().lng() < pBounds.getSouthWest().lng() || cBounds.getSouthWest().lng() > pBounds.getNorthEast().lng())
                       || (cBounds.getNorthEast().lat() > pBounds.getNorthEast().lat() || cBounds.getNorthEast().lat() < pBounds.getSouthWest().lat())
                       || (cBounds.getNorthEast().lng() > pBounds.getNorthEast().lng() || cBounds.getNorthEast().lng() < pBounds.getSouthWest().lng())){
                        var howMany = scope.mapRectangles.length - keyPosition;
                        $timeout(function(){
                            for(var count = 0;count<howMany;count++){
                                offs = count + keyPosition;
                                if(typeof(scope.mapRectangles[offs])==="undefined") return false;
                                scope.mapRectangles[offs].setMap(null);
                            }
                            scope.mapRectangles.splice(keyPosition, howMany);
                            scope.parameter.value.domains.splice(keyPosition, howMany);
                        });
                        return false;
                    }
                }
                if(keyPosition<scope.mapRectangles.length-1) {
                    //error wrt child domain
                    var nBounds = scope.mapRectangles[keyPosition+1].getBounds();
                    if((cBounds.getSouthWest().lat() > nBounds.getSouthWest().lat() )
                       || (cBounds.getSouthWest().lng() > nBounds.getSouthWest().lng())
                       || (cBounds.getNorthEast().lat() < nBounds.getNorthEast().lat())
                       || (cBounds.getNorthEast().lng() < nBounds.getNorthEast().lng())){
                        var howMany = scope.mapRectangles.length - keyPosition - 1;
                        $timeout(function(){
                            for(var count = 0;count<howMany;count++){
                                var offs = count+keyPosition+1;
                                if(typeof(scope.mapRectangles[offs])==="undefined") return;
                                scope.mapRectangles[offs].setMap(null);
                            }
                            scope.mapRectangles.splice(keyPosition+1, howMany);
                            scope.parameter.value.domains.splice(keyPosition+1, howMany);
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
                    zIndex:scope.mapRectangles.length,
                    map: map,
                    bounds: {
                        north: rectangle.northEast.lat,
                        south: rectangle.southWest.lat,
                        east: rectangle.northEast.long,
                        west: rectangle.southWest.long,
                    }
                });
                mapRectangle.addListener('bounds_changed', function(){
                    boundsChanged(mapRectangle, rectangle.id);

                });
                mapRectangle.addListener('click', function(){
                    rectangleClicked(rectangle.id);
                })
                return mapRectangle;
            }


            var addMarkerToMap = function(marker, map, index){
              var mapMarker = new google.maps.Marker({
                  map:map,
                  position: {lat: marker.lat, lng: marker.long},
                  zIndex: 3000
              });
              mapMarker.addListener('click', function(){
                  markerClicked(marker.id);
              });
              return mapMarker;
            };

            var markerClicked = function(id){
              var index = getPositionOfId(id, scope.parameter.value.markers);
              scope.mapMarkers[index].setMap(null);
              $timeout(function(){
                scope.mapMarkers.splice(index, 1);
                scope.parameter.value.markers.splice(index, 1);
              }, 0);

            };

            var addMarkerToValues = function(marker, id){
              var index=0;
              if(typeof(scope.parameter.value.markers)==='undefined'){
                scope.parameter.value.markers = {};
              }
              else index = scope.parameter.value.markers.length;
              var mark = {
                id: id,
                lat: marker.getPosition().lat(),
                long: marker.getPosition().lng()
              };
              $timeout(function(){
                  scope.parameter.value.markers.push(mark);
              });
            }

            var addRectangleToValues = function(mapRectangle, id){
                var southWest = mapRectangle.getBounds().getSouthWest();
                var northEast = mapRectangle.getBounds().getNorthEast();
                var rectangle = {
                    id: id,
                    southWest: {lat:southWest.lat(), long:southWest.lng()},
                    northEast: {lat:northEast.lat(), long:northEast.lng()}
                };
                $timeout(function(){
                    scope.parameter.value.domains.push(rectangle);
                    checkRectangle(id);
                });
            };

            var getPositionOfId = function(id, array){
                for(var i=0;i<array.length;i++)
                  if(array[i].id==id) return i;
                return -1;
            }

            /***************** START ********************/
            $timeout(function(){
                google.maps.event.addDomListener(window, 'load', scope.initializeParameter());
            });
        }
    }
});
