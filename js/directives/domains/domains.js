directives.directive('domains', function($timeout) {

  //TEST THIS BEFORE COMMITTING!!!!!!
  return {
    restrict: 'E',
    templateUrl: 'domains/domains.html',
    replace: true,
    require: '^jsonInput',
    scope: {
      parameter:"=",
      dependencies:"=",
      validation: "="
    },
    link:function(scope, elm, attr, jsonInputCtrl) {

      /**************** VALIDATION ******************/
      scope.domainsValid = function(){
        var bool = true;
        if(typeof(scope.parameter.required)!=="undefined" && scope.parameter.required.domains && scope.parameter.drawDomains && (typeof(scope.mapRectangles)=="undefined" ||scope.mapRectangles.length===0)) {
          scope.parameter.message.push("Select at least one domain");
          bool =  false;
        }
        if(typeof(scope.parameter.required)!=="undefined" && scope.parameter.required.markers && scope.parameter.drawMarkers && (typeof(scope.mapMarkers)=="undefined" ||scope.mapMarkers.length===0)) {
          scope.parameter.message.push("Add at least one marker");
          return false;
        }
        return bool;
      }
      scope.message = [];


      var evaluate = function() {
        scope.parameter.message = [];
        var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
        for(var i=0; i<a.message.length;i++)
        scope.parameter.message.push(a.message[i]);
        var valid =  scope.domainsValid();
        valid =  a.isValid && valid;
        scope.isParameterValid = valid;
        return valid;
      }

      var unbind = scope.$watch('parameter', function() {
        if(scope.parameter==undefined) return;
        jsonInputCtrl.isValid = scope.parameter.isValid;
        scope.validationFunction = jsonInputCtrl.validationFunction;
        scope.parameter.evaluate = evaluate;

        if(scope.validation) {
          scope.$watch('parameter.value', function() {
              evaluate();
          }, true);
        } else scope.isParameterValid = true;
        /***************** START ********************/
        $timeout(function(){
          google.maps.event.addDomListener(window, 'load', scope.initializeParameter());
        });
        unbind();
      }, true);


      /**************** INIT ******************/
      scope.initializeParameter = function(){
        var height =  parseInt($("#"+scope.parameter.dbName+"map").css("width"))/2;
        scope.height=height+"px";
        scope.mapRectangles = [];
        scope.mapMarkers = [];
        $timeout(function(){
          initializeMap();
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
            var markerInsideDomain = [];
            for(var m in scope.parameter.value.markers){
              markerInsideDomain[scope.parameter.value.markers[m].id] = checkMarkerInsideDomain(scope.parameter.value.markers[m]);
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
            for(var mar in markerInsideDomain) {
              if(!markerInsideDomain[mar]) {
                removeMarker(mar);
              }
            }
          }
          if(scope.validation)
            scope.parameter.evaluate();
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
        if(!scope.parameter.disabled) {
          if(scope.parameter.drawMarkers) drawModes.push(google.maps.drawing.OverlayType.MARKER);
          if(scope.parameter.drawDomains) drawModes.push(google.maps.drawing.OverlayType.RECTANGLE);
       }
        scope.drawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: drawModes
          },
          rectangleOptions:scope.rectOptions
        });
        scope.drawingManager.setMap(scope.map);
        if(!scope.parameter.disabled) {
          google.maps.event.addListener(scope.drawingManager, "markercomplete", function(marker){
            var tmstamp = new Date().getTime();
            var ind = scope.mapMarkers.length;
            if(scope.mapMarkers.length== scope.parameter.maxMarkers){
              //TODO ALERT?
              marker.setMap(null);
              return;
            }
            marker.addListener('click', function(){
              removeMarker(tmstamp);
            });
            $timeout(function(){
              if(addMarkerToValues(marker, tmstamp))
                scope.mapMarkers.push(marker);
              else marker.setMap(null);
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
          if(scope.parameter.allowMarkersOutDomains) return;
          for(var i=0;i<scope.parameter.value.markers.length;i++){
            //I have to remove first the rectangle, and only then check if the markers are inside another rectangle.
            if(!checkMarkerInsideDomain(scope.parameter.value.markers[i])) removeMarker(scope.parameter.value.markers[i].id);
          }

        });
      }

      var rectangleClicked = function(id) {
        var index = parseInt(getPositionOfId(id, scope.parameter.value.domains));
        scope.modal.find("#number").html(index+1)
        if(index==scope.mapRectangles.length-1)
        scope.modal.find("#lastDomain").css("display", "none");
        else
        scope.modal.find("#lastDomain").css("display", "inline");
        scope.deletingIndex = index;
        scope.modal.modal('show');

      }


      //while deleting a rectangle, I have to check if I also have to delete markers, depending on the values of onlyNested and allowMarkersOutDomains properties.
      var deleteRectangle = function(index){
        scope.modal.modal('hide');
        if(scope.parameter.onlyNested) {
          if(!scope.parameter.allowMarkersOutDomains && index == 0) removeAllMarkers();
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
          var markers = findMarkersInsideRectangle(scope.parameter.value.domains[index]);
          $timeout(function(){
            scope.mapRectangles[index].setMap(null);
            scope.mapRectangles.splice(index, 1);
            scope.parameter.value.domains.splice(index, 1);
          }, 0);
          if(!scope.parameter.allowMarkersOutDomains){
              $timeout(function(){
              for(var i=0;i<markers.length;i++){
                //I have to remove first the rectangle, and only then check if the markers are inside another rectangle.
                if(!checkMarkerInsideDomain(markers[i])) removeMarker(markers[i].id);
              }
            }, 0);
          }
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


      var checkMarkerInsideDomain = function(marker){
        if(!scope.parameter.drawDomains || scope.parameter.allowMarkersOutDomains) return true;
        if(scope.parameter.value.domains.length==0) return false;
        if(scope.parameter.onlyNested) {
          var domain = scope.parameter.value.domains[0];
          if(marker.lat< domain.southWest.lat || marker.lat>domain.northEast.lat) return false;
          if(marker.long < domain.southWest.long || marker.long>domain.northEast.long) return false;
          return true;
        }
        //IF onlyNested is false, I need to check if the marker is inside any domain, not only the first.
        // it is sufficient that the marker is inside one domain to be considered ok.
        var domains = scope.parameter.value.domains;
        for(var i=0;i<domains.length;i++){
          if(marker.lat > domains[i].southWest.lat && marker.lat < domains[i].northEast.lat &&
              marker.long > domains[i].southWest.long && marker.long < domains[i].northEast.long)  {
                return true;
              }
        }
        return false;
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

        if(scope.parameter.disabled) mapRectangle.setDraggable(false);
        else {
          mapRectangle.addListener('bounds_changed', function(){
            boundsChanged(mapRectangle, rectangle.id);

          });
          mapRectangle.addListener('click', function(){
            rectangleClicked(rectangle.id);
          })
        }
        return mapRectangle;
      }



      var addMarkerToMap = function(marker, map, index){
        var mapMarker = new google.maps.Marker({
          map:map,
          position: {lat: marker.lat, lng: marker.long},
          zIndex: 3000
        });
        if(!scope.parameter.disabled) {
          mapMarker.addListener('click', function(){
            removeMarker(marker.id);
          });
        }
        return mapMarker;
      };

      var removeMarker = function(id){
        $timeout(function(){
          var index = getPositionOfId(id, scope.parameter.value.markers);
          scope.mapMarkers[index].setMap(null);
          scope.mapMarkers.splice(index, 1);
          scope.parameter.value.markers.splice(index, 1);
        }, 0);
      };
      var removeAllMarkers = function(){
        for(var i=0; i<scope.parameter.value.markers.length;i++)
          removeMarker(scope.parameter.value.markers[i].id);
      }

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
        if(!checkMarkerInsideDomain(mark)) return false;
        $timeout(function(){
          scope.parameter.value.markers.push(mark);
        });
        return true;
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

      var findMarkersInsideRectangle = function (rectangle){
        var markers = [];
        var current;
        for(var i=0;i<scope.parameter.value.markers.length;i++){
          current = scope.parameter.value.markers[i];
          if(current.lat > rectangle.southWest.lat && current.lat < rectangle.northEast.lat &&
              current.long > rectangle.southWest.long && current.long < rectangle.northEast.long)
                markers.push(current);
        }
        return markers;
      }



      var getPositionOfId = function(id, array){
        for(var i=0;i<array.length;i++)
        if(array[i].id==id) return i;
        return -1;
      }
    }
  }
});
