angular.module("templateCache", []).run(["$templateCache", function($templateCache) {$templateCache.put("datetime/datetime.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 col-md-offset-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-6 col-md-3 par-value-col datetime-col\" ng-class=\"{\'has-error\': !parameter.evaluate()}\">\n        <input ng-if=\"parameter.hasDate\" type=\"date\" ng-model=\"parameter.value\" class=\"form-control\">\n        <input ng-if=\"parameter.hasTime\" type=\"time\" step=\"60\" ng-model=\"parameter.value\" class=\"form-control\">\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n</div>\n");
$templateCache.put("domains/domains.html","<div class=\"row parameter-row\">\n\n    <div class=\"col-xs-12 col-md-6 col-md-offset-3 par-name-col ng-binding\">\n        <div style=\"width:100%;height:{{height}}\" id=\"{{parameter.dbName}}map\" ng-class=\"{\'map-has-error\' : !parameter.evaluate()}\"></div>\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n        <div ng-show=\"parameter.drawDomains\" ng-repeat=\"val in parameter.value.domains track by $index\">\n            Domain number {{$index+1}} - South-West: ({{val.southWest.lat | number:4}}, {{val.southWest.long | number:4}}) North-East: ({{val.northEast.lat | number:4}}, {{val.northEast.long | number:4}})<br/>\n        </div>\n        <div ng-show=\"parameter.drawMarkers\" ng-repeat=\"mark in parameter.value.markers track by $index\">\n            Marker {{$index+1}}: ({{mark.lat | number:4}}, {{mark.long | number:4}})\n        </div>\n\n    </div>\n    <div class=\"modal fade\" id=\"{{parameter.dbName}}modal\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\">Delete domain</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <p>Do you want to delete domain number <span id=\"number\"></span><span ng-if=\"parameter.onlyNested\" id=\"lastDomain\"> and all his sub-domains</span>?</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-warning\" data-dismiss=\"modal\">No</button>\n                    <button type=\"button\" class=\"btn btn-success\">Yes</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("fileupload/fileupload.html","<div class=\"row parameter-row\" id=\"{{parameter.dbName}}\">\n    <div class=\"col-xs-6 col-md-3 col-md-offset-3 par-name-col upload-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-6 col-md-3 par-value-col\" ng-class=\"{\'has-error\': !parameter.evaluate()}\">\n        <!--        <div ngf-drop ngf-select ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-multiple=\"true\" ngf-allow-dir=\"false\" accept=\"image/*,application/pdf\" ngf-pattern=\"\'image/*,application/pdf\'\">Drop Namelist</div>-->\n\n        <form  action=\"upload.php\" method=\"POST\" enctype=\"multipart/form-data\">\n\n            <fieldset>\n                <div>\n                    <input type=\"file\" id=\"fileselect\" name=\"fileselect[]\" multiple=\"multiple\"  style=\"visibility:hidden\"/>\n                    <div id=\"filedrag\" ng-click=\"openInput()\">Click or drop files here</div>\n                </div>\n\n                <div id=\"submitbutton\">\n                    <button type=\"submit\">Upload Files</button>\n                </div>\n                <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n                <div class=\"error-message\">\n                    <div ng-repeat=\"val in errorUpload\">{{val}}\n                    </div>\n                </div>\n                 <div class=\"success-message\" ng-show=\"uploadedFilesDescription.length!=0\">\n                   Uploaded files:\n                   <ul>\n                    <li ng-repeat=\"file in uploadedFilesDescription track by $index\">\n                        <span class=\"uploaded-file\">{{file.name}}</span>&nbsp;&nbsp;&nbsp;<span ng-click=\"removeFile($index)\" class=\"file-unload\">Remove</span>\n                    </li>\n                  </ul>\n                </div>\n            </fieldset>\n\n        </form>\n    </div>\n    <!--\n<div class=\"modal fade\" id=\"modal\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n<div class=\"modal-header\">\n<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n<h4 class=\"modal-title\">Warning</h4>\n</div>\n<div class=\"modal-body\">\n</div>\n<div class=\"modal-footer\">\n<button type=\"button\" class=\"btn btn-warning\" data-dismiss=\"modal\">Ok</button>\n</div>\n</div>\n</div>\n</div>\n\n-->\n\n\n</div>\n");
$templateCache.put("float/float.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 col-md-offset-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-6 col-md-3 par-value-col\" ng-class=\"{\'has-error\': !parameter.evaluate()}\">\n        <input type=\"number\" step=\"1\" ng-model=\"parameter.value\" class=\"form-control\">\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n</div>\n");
$templateCache.put("integer/integer.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 col-md-offset-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-6 col-md-3 par-value-col\" ng-class=\"{\'has-error\': !parameter.evaluate()}\">\n        <input type=\"number\" step=\"1\" ng-model=\"parameter.value\" class=\"form-control\">\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n</div>\n");
$templateCache.put("json-gui/json-gui.html","<div class=\"container-fluid\" id=\"model-container\">\n    <div class=\"row\">\n        <div class=\"col-xs-12 col-md-10 groups\">\n            <div ng-repeat=\"group in data.parametersCategories\">\n                <div class=\"row group-container\">\n                    <div class=\"group-name\" id=\"group{{group.value}}\">\n                        {{group.name}}\n                    </div>\n                    <div class=\"group-parameters col-xs-12\">\n                        <div ng-repeat=\"(key, value) in hashToArray(pars)\">\n                            <integer ng-if=\"pars[value].parameterCategory==group.value && pars[value].parameterType==\'integer\'\" parameter=\"pars[value]\" dependencies = \"dep[value]\"></integer>\n                            <float ng-if=\"pars[value].parameterCategory==group.value && pars[value].parameterType==\'float\'\" parameter=\"pars[value]\" dependencies = \"dep[value]\"></float>\n                            <datetime ng-if=\"pars[value].parameterCategory==group.value && pars[value].parameterType==\'datetime\'\" parameter=\"pars[value]\" dependencies = \"dep[value]\"></datetime>\n                            <select-parameter ng-if=\"pars[value].parameterCategory==group.value && pars[value].parameterType==\'select\'\" parameter=\"pars[value]\" dependencies =\" dep[value]\"></select-parameter>\n                            <text-parameter ng-if=\"pars[value].parameterCategory==group.value && pars[value].parameterType==\'text\'\" parameter=\"pars[value]\" dependencies = \"dep[value]\"></text-parameter>\n                            <domains  ng-if=\"pars[value].parameterCategory==group.value && pars[value].parameterType==\'domains\'\" parameter=\"pars[value]\" dependencies = \"dep[value]\"></domains>\n                            <fileupload  ng-if=\"pars[value].parameterCategory==group.value && pars[value].parameterType==\'fileupload\'\" parameter=\"pars[value]\" dependencies = \"dep[value]\"></fileupload>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-2\" id=\"scrollspy\" style=\"padding-left:0px\">\n            <ul id=\"nav\" class=\"nav hidden-xs hidden-sm\" style=\"margin-top:20px;width:100%;padding-left:10px; border-left:1px solid #dedede;\">\n                <li ng-repeat=\"group in data.parametersCategories\">\n                    <a href=\"#group{{group.value}}\">{{group.name}}</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("select/select.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 col-md-offset-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-6 col-md-3 par-value-col\" ng-class=\"{\'has-error\': !parameter.evaluate()}\">\n        <select ng-model=\"parameter.value\" ng-options=\"option.value as option.name for option in parameter.values\" class=\"form-control\"></select>\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n</div>\n");
$templateCache.put("text/text.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 col-md-offset-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-6 col-md-3 par-value-col\" ng-class=\"{\'has-error\': !parameter.evaluate()}\">\n        <textarea ng-model=\"parameter.value\" class=\"form-control\" style=\"resize:none\"></textarea>\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n</div>\n");}]);
var directives = angular.module('json-gui', ['ngFileUpload', 'templateCache']);

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

directives.directive('domains', ["$timeout", function($timeout) {
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
}]);

directives.directive('fileupload', ["$timeout", "Upload", function($timeout, Upload) {
    return {
        restrict: 'E',
        templateUrl: 'fileupload/fileupload.html',
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
            scope.fileuploadValid = function(){
                if(typeof(scope.parameter.value)=="undefined" || scope.parameter.value.length<scope.parameter.minUpload) {
                    var msg = "Upload at least "+scope.parameter.minUpload;
                    msg+= (scope.parameter.minUpload==1)? " file" : " files";
                    scope.parameter.message.push(msg);
                    return false;
                }
                return true;
            }
            /**************** EVALUATION ******************/
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.fileuploadValid()){
                    bool = false;
                }
                if(!validation.valid){
                    scope.parameter.message.push(validation.message);
                    return false;
                }
                return bool;
            }



            scope.initFileReader = function (){
                if (window.File && window.FileList && window.FileReader) {
                    scope.init();
                }
            }
            // initialize
            scope.init = function() {
                scope.maxLengthByte = calculateLength(scope.parameter.maxSize);
                var form = $("#"+scope.parameter.dbName);
                var fileselect =  form.find("#fileselect")[0],
                    filedrag =  form.find("#filedrag")[0],
                    submitbutton =  form.find("#submitbutton")[0];
                //                scope.modal = form.find("#modal");

                // file select
                fileselect.addEventListener("change", scope.fileSelectHandler, false);

                // is XHR2 available?
                var xhr = new XMLHttpRequest();
                if (xhr.upload) {

                    // file drop
                    filedrag.addEventListener("dragover", scope.fileDragHover, false);
                    filedrag.addEventListener("dragleave", scope.fileDragHover, false);
                    filedrag.addEventListener("drop", scope.fileSelectHandler, false);
                    filedrag.style.display = "block";

                    // remove submit button
                    submitbutton.style.display = "none";
                }
            }

            scope.fileDragHover = function(e) {
                e.stopPropagation();
                e.preventDefault();
                e.target.className = (e.type == "dragover" ? "hover" : "");
            }


            scope.parseFile = function(file) {
                if(!scope.fileHasAllowedExtension(file)){
                  errorUpload("This extension is not allowed. Allowed extensions are: "+scope.parameter.allowedExtensions);
                  return;
                }
                if(file.size>scope.maxLengthByte) {
                    errorUpload("The file named "+file.name+" is too big. The maximum dimension accepted is "+scope.parameter.maxSize+".");
                    return;
                }
                var reader = new FileReader();
                reader.onload = function(e) {
                    $timeout(function(){scope.parameter.value.push(e.target.result);});
                };
                reader.readAsDataURL(file);
                $timeout(function() {
                    scope.uploadedFilesDescription.push(file);
                });


            }

            scope.fileSelectHandler = function(e) {
                scope.fileDragHover(e);
                var files = e.target.files || e.dataTransfer.files;
                if(scope.uploadedFilesDescription.length+files.length>scope.parameter.maxUpload){
                    errorUpload("Reached maximum file uploads allowed ("+scope.parameter.maxUpload+").");
                    return;
                }

                for (var i = 0, f; f = files[i]; i++) {
                    scope.parseFile(f);
                }

            }


            scope.openInput = function(){
                $('#'+scope.parameter.dbName).find('#fileselect').click();
            }
            var calculateLength = function(length){
                length = length.toLowerCase();
                var retLength = parseInt(length);
                if(length.indexOf("kb")>0)
                    return retLength*1000;
                if(length.indexOf("mb")>0)
                    return retLength*1000000;
                if(length.indexOf("gb")>0)
                    return retLength*1000000000;
                return retLength;
            }
            //            scope.openModal = function(message){
            //                console.log(scope.modal[0]);
            //                scope.modal.find(".modal-body").text(message);
            //                console.log(scope.modal.find(".modal-body").text());
            //                scope.modal.modal('show');
            //                console.log("show");
            //            }

            var errorUpload = function(message) {
                $timeout(function(){scope.errorUpload.splice(0, 0,message);});

                $timeout(function(){scope.errorUpload.splice(0,1)},5000);
            }

            scope.removeFile = function(index){
              scope.parameter.value.splice(index, 1);
              scope.uploadedFilesDescription.splice(index, 1);
              console.log(index);
            }

            scope.fileHasAllowedExtension = function(file){
              var exts = scope.parameter.allowedExtensions;
                if(typeof(exts)=='undefined') return true;
                if(typeof(exts)=='string' && exts!="") return file.name.endsWith('.'+exts);
                if(Array.isArray(exts)){
                  for(var i=0;i<exts.length;i++)
                    if(file.name.endsWith('.'+exts[i]))
                      return true;
                  return false;
                }

                return true;
            }

            scope.errorUpload = [];
            scope.uploadedFilesDescription = [];
            $timeout(function(){
                scope.initFileReader();
            });
        }
    }



}]);

directives.directive('float', function() {
    return {
        restrict: 'E',
        templateUrl: 'float/float.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.floatValid = function(){
                if(typeof(scope.parameter.value) === 'undefined' || scope.parameter.value ==="NaN"){
                    scope.parameter.message.push("Number format is not valid");
                    return false;
                }
                return true;
            }
             scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.floatValid()){
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

directives.directive('integer', function() {
    return {
        restrict: 'E',
        templateUrl: 'integer/integer.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.integerValid = function(){
                if(scope.parameter.value % 1 !== 0 || scope.parameter.value ==="NaN"){
                    scope.parameter.message.push("Number is not an Integer");
                    return false;
                }
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.integerValid()){
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

directives.directive('jsonGui', ["$timeout", function($timeout) {
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
}]);

directives.directive('selectParameter', function() {
    return {
        restrict: 'E',
        templateUrl: 'select/select.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.selectValid = function(){
                return true;
            }
            ;
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.selectValid()){
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

directives.directive('textParameter', function() {
    return {
        restrict: 'E',
        templateUrl: 'text/text.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.textValid = function(){
                if(scope.parameter.value===""){
                    scope.parameter.message.push("Insert some text");
                    return false;
                }
                return true;
            }
            scope.parameter.evaluate = function(){
                scope.parameter.message = [];
                var bool = true;
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.textValid()){
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
