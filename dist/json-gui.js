angular.module("templateCache", []).run(["$templateCache", function($templateCache) {$templateCache.put("datetime/datetime.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-5 col-md-8 par-value-col datetime-col\" ng-class=\"{\'has-error\': !isParameterValid}\">\n        <input ng-if=\"parameter.hasDate\" type=\"date\" ng-model=\"parameter.value\" class=\"form-control\" ng-disabled=\"!parameter.editable\">\n        <input ng-if=\"parameter.hasTime\" type=\"time\" step=\"60\" ng-model=\"parameter.value\" class=\"form-control\" ng-disabled=\"!parameter.editable\">\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n    <div class=\"col-xs-1 info-col\">\n        <div class=\"info\" ng-if=\"parameter.description!=undefined && parameter.description!=\'\'\">i <span>{{parameter.description}}</span></div>\n    </div>\n</div>\n");
$templateCache.put("domains/domains.html","<div class=\"row parameter-row\">\n\n  <div class=\"col-xs-12 par-name-col map-container ng-binding\" ng-class=\"{\'disabled\' : !parameter.editable}\">\n    <div style=\"width:100%;height:{{height}}\" id=\"{{parameter.dbName}}map\" ng-class=\"{\'map-has-error\' : !isParameterValid}\"></div>\n    <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    <div style=\"height:17px;width:100%\" ng-if=\"parameter.message.length==0\"></div>\n  </div>\n  <div class=\"col-xs-11\">\n    <div ng-show=\"parameter.drawDomains\" ng-repeat=\"val in parameter.value.domains track by $index\">\n      Domain number {{$index+1}} - South-West: ({{val.southWest.lat | number:4}}, {{val.southWest.long | number:4}}) North-East: ({{val.northEast.lat | number:4}}, {{val.northEast.long | number:4}})<br/>\n    </div>\n    <div ng-show=\"parameter.drawMarkers\" ng-repeat=\"mark in parameter.value.markers track by $index\">\n      Marker {{$index+1}}: ({{mark.lat | number:4}}, {{mark.long | number:4}})\n    </div>\n  </div>\n  <div class=\"col-xs-1 info-col\">\n    <div class=\"info\" ng-if=\"parameter.description!=undefined && parameter.description!=\'\'\">i <span>{{parameter.description}}</span></div>\n  </div>\n\n\n\n\n  <div class=\"modal fade\" id=\"{{parameter.dbName}}modal\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\">Delete domain</h4>\n        </div>\n        <div class=\"modal-body\">\n          <p>Do you want to delete domain number <span id=\"number\"></span><span ng-if=\"parameter.onlyNested\" id=\"lastDomain\"> and all his sub-domains</span>?</p>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-warning\" data-dismiss=\"modal\">No</button>\n          <button type=\"button\" class=\"btn btn-success\">Yes</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("fileupload/fileupload.html","<div class=\"row parameter-row\" id=\"{{parameter.dbName}}\">\n    <div class=\"col-xs-6 col-md-3 par-name-col upload-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-5 col-md-8 par-value-col file-container\" ng-class=\"{\'has-error\': !isParameterValid, \'disabled\' : !parameter.editable}\">\n        <!--        <div ngf-drop ngf-select ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-multiple=\"true\" ngf-allow-dir=\"false\" accept=\"image/*,application/pdf\" ngf-pattern=\"\'image/*,application/pdf\'\">Drop Namelist</div>-->\n\n        <form  action=\"upload.php\" method=\"POST\" enctype=\"multipart/form-data\">\n\n            <fieldset>\n                <div>\n                    <input type=\"file\" id=\"fileselect\" name=\"fileselect[]\" multiple=\"multiple\"  style=\"visibility:hidden\"/>\n                    <div id=\"filedrag\" ng-click=\"openInput()\">Click or drop files here</div>\n                </div>\n\n                <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n                <div class=\"error-message\">\n                    <div ng-repeat=\"val in errorUpload\">{{val}}\n                    </div>\n                </div>\n                 <div class=\"success-message\" ng-show=\"parameter.value.length!=0\">\n                   Uploaded files:\n                   <ul>\n                    <li ng-repeat=\"file in parameter.value track by $index\">\n                        <span class=\"uploaded-file\">{{file.fileName}}</span>&nbsp;&nbsp;&nbsp;<span ng-if=\"parameter.editable\" ng-click=\"removeFile($index)\" class=\"file-unload\">Remove</span>\n                    </li>\n                  </ul>\n                </div>\n            </fieldset>\n\n        </form>\n    </div>\n    <div class=\"col-xs-1 info-col\" style=\"margin-top: 70px !important;\">\n        <div class=\"info\" ng-if=\"parameter.description!=undefined && parameter.description!=\'\'\">i <span>{{parameter.description}}</span></div>\n    </div>\n    <!--\n<div class=\"modal fade\" id=\"modal\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n<div class=\"modal-header\">\n<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n<h4 class=\"modal-title\">Warning</h4>\n</div>\n<div class=\"modal-body\">\n</div>\n<div class=\"modal-footer\">\n<button type=\"button\" class=\"btn btn-warning\" data-dismiss=\"modal\">Ok</button>\n</div>\n</div>\n</div>\n</div>\n\n-->\n\n\n</div>\n");
$templateCache.put("float/float.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3  par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-5 col-md-8 par-value-col\" ng-class=\"{\'has-error\': !isParameterValid}\">\n        <input type=\"number\" step=\"1\" ng-model=\"parameter.value\" class=\"form-control\" ng-disabled=\"!parameter.editable\">\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n    <div class=\"col-xs-1 info-col\">\n        <div class=\"info\" ng-if=\"parameter.description!=undefined && parameter.description!=\'\'\">i <span>{{parameter.description}}</span></div>\n    </div>\n</div>\n");
$templateCache.put("integer/integer.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-5 col-md-8 par-value-col\" ng-class=\"{\'has-error\': !isParameterValid}\">\n        <input type=\"number\" step=\"1\" ng-model=\"parameter.value\" class=\"form-control\" ng-disabled=\"!parameter.editable\">\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message track by $index\">{{msg}}</div>\n    </div>\n    <div class=\"col-xs-1 info-col\">\n        <div class=\"info\" ng-if=\"parameter.description!=undefined && parameter.description!=\'\'\">i <span>{{parameter.description}}</span></div>\n    </div>\n</div>\n");
$templateCache.put("json-gui/json-gui.html","<div class=\"container-fluid\" id=\"model-container\">\n    <div class=\"row\" scroll-spy y-offset=\"options.viewOffset\">\n        <div class=\"col-xs-12 col-md-10 groups\">\n            <div ng-repeat=\"group in data.parametersCategories\">\n                <div class=\"row group-container\">\n                  <div id=\"group{{group.value}}\" class=\"group\">\n                    <div class=\"group-name\">\n                        {{group.name}}\n                    </div>\n                  </div>\n                    <div class=\"group-parameters col-xs-12\">\n                        <div ng-repeat=\"(key, value) in hashToArray(obj.pars)\">\n                            <integer json-input ng-if=\"obj.pars[value].parameterCategory==group.value && obj.pars[value].parameterType==\'integer\'\" parameter=\"obj.pars[value]\" dependencies = \"dep[value]\"></integer>\n                            <float json-input ng-if=\"obj.pars[value].parameterCategory==group.value && obj.pars[value].parameterType==\'float\'\" parameter=\"obj.pars[value]\" dependencies = \"dep[value]\"></float>\n                            <datetime json-input ng-if=\"obj.pars[value].parameterCategory==group.value && obj.pars[value].parameterType==\'datetime\'\" parameter=\"obj.pars[value]\" dependencies = \"dep[value]\"></datetime>\n                            <json-select json-input ng-if=\"obj.pars[value].parameterCategory==group.value && obj.pars[value].parameterType==\'select\'\" parameter=\"obj.pars[value]\" dependencies =\" dep[value]\"></json-select>\n                            <json-text json-input ng-if=\"obj.pars[value].parameterCategory==group.value && obj.pars[value].parameterType==\'text\'\" parameter=\"obj.pars[value]\" dependencies = \"dep[value]\"></json-text>\n                            <domains json-input ng-if=\"obj.pars[value].parameterCategory==group.value && obj.pars[value].parameterType==\'domains\'\" parameter=\"obj.pars[value]\" dependencies = \"dep[value]\" validation=\"true\"></domains>\n                            <fileupload json-input ng-if=\"obj.pars[value].parameterCategory==group.value && obj.pars[value].parameterType==\'fileupload\'\" parameter=\"obj.pars[value]\" dependencies = \"dep[value]\"></fileupload>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"col-md-2\" style=\"padding-left:0px\">\n            <ul id=\"nav\" class=\"nav hidden-xs hidden-sm\" style=\"margin-top:20px;padding-left:10px; border-left:1px solid #dedede;\">\n                <li ng-repeat=\"group in data.parametersCategories\">\n                    <a spy=\"group{{group.value}}\" y-offset=\"options.viewOffset\">{{group.name}}</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("select/select.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-5 col-md-8 par-value-col\" ng-class=\"{\'has-error\': !isParameterValid}\">\n        <select ng-model=\"parameter.value\" ng-options=\"option.value as option.name for option in parameter.values\" class=\"form-control\" ng-disabled=\"!parameter.editable\"></select>\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n    <div class=\"col-xs-1 info-col\">\n        <div class=\"info\" ng-if=\"parameter.description!=undefined && parameter.description!=\'\'\">i <span>{{parameter.description}}</span></div>\n    </div>\n</div>\n");
$templateCache.put("text/text.html","<div class=\"row parameter-row\">\n    <div class=\"col-xs-6 col-md-3 par-name-col\">\n        {{parameter.displayName}}\n    </div>\n    <div class=\"col-xs-5 col-md-8 par-value-col\" ng-class=\"{\'has-error\': !isParameterValid}\">\n        <textarea ng-model=\"parameter.value\" ng-disabled=\"!parameter.editable\" class=\"form-control\" style=\"resize:none\"></textarea>\n        <div class=\"error-message\" ng-repeat=\"msg in parameter.message\">{{msg}}</div>\n    </div>\n    <div class=\"col-xs-1 info-col\" style=\"margin-top:16px !important\">\n        <div class=\"info\" ng-if=\"parameter.description!=undefined && parameter.description!=\'\'\">i <span>{{parameter.description}}</span></div>\n    </div>\n</div>\n");}]);
var directives = angular.module('json-gui', ['ngFileUpload', 'templateCache']);


directives.directive('scrollSpy', ["$window", "$timeout", function ($window, $timeout) {
  return {
    restrict: 'A',
    scope:{
      yOffset: '='
    },
    controller: ["$scope", function ($scope) {
      $scope.spies = [];
      this.addSpy = function (spyObj) {
        $scope.spies.push(spyObj);
      };
    }],
    link: function (scope, elem, attrs) {
      $timeout(function(){
      var spyElems;
      spyElems = [];

      scope.$watch('spies', function (spies) {
        var spy, _i, _len, _results;
        _results = [];

        for (_i = 0, _len = spies.length; _i < _len; _i++) {
          spy = spies[_i];
          if (spyElems[spy.id] == null) {
            _results.push(spyElems[spy.id] = $(elem).find('#' + spy.id));
          }
        }
        return _results;
      }, true);

      $($window).scroll(function () {
        var highlightSpy, pos, spy, _i, _len, _ref;
        highlightSpy = null;
        _ref = scope.spies;

        // cycle through `spy` elements to find which to highlight
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          spy = _ref[_i];
          spy.out();
          // catch case where a `spy` does not have an associated `id` anchor
          if (spyElems[spy.id].offset() === undefined) {
            continue;
          }
          if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0+scope.yOffset) {
            // the window has been scrolled past the top of a spy element
            spy.pos = pos;

            if (highlightSpy == null) {
              highlightSpy = spy;
            }
            if (highlightSpy.pos < spy.pos) {
              highlightSpy = spy;
            }
          }
        }

        // select the last `spy` if the scrollbar is at the bottom of the page
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
          spy.pos = pos;
          highlightSpy = spy;
        }

        return highlightSpy != null ? highlightSpy["in"]() : void 0;
      });
    }, 1000);
    }
  };
}]);
directives.directive('spy', ["$location", "$anchorScroll", function ($location, $anchorScroll) {
  return {
    restrict: "A",
    require: "^scrollSpy",
    scope: {
        yOffset:'=',
    },
    link: function(scope, elem, attrs, affix) {
      $anchorScroll.yOffset = scope.yOffset;
      $(elem).click(function () {
        $location.hash(attrs.spy);
        $anchorScroll();
      });

      affix.addSpy({
        id: attrs.spy,
        in: function() {
          elem.addClass('active');
        },
        out: function() {
          elem.removeClass('active');
        }
      });
    }
  };
}]);

directives.directive('jsonInput', function() {
  return {
    controller: ["$element", function($element) {
      this.evaluate = function(parameter, dependencies){
        var bool = true;
        this.message = [];
        if(parameter.required && !parameter.required.hasOwnProperty("markers")) {
          if(parameter.value!==0 && (parameter.value==null || typeof(parameter.value)=="undefined" || parameter.value=="")){
            this.message.push("This field is required");
            bool = false;
          }
        }
        var validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+this.isValid+" return isValid;}")();
        var validation = validationFunction(parameter, dependencies);
        if(!validation.valid){
          this.message.push(validation.message);
          bool = false;
        }
        return {message:this.message, isValid:bool};
      }
    }]
  }
});

directives.directive('datetime', function() {
  return {
    restrict: 'E',
    templateUrl: 'datetime/datetime.html',
    replace: true,
    require: '^jsonInput',
    scope: {
      parameter:"=",
      dependencies:"=",
      validation:"="
    },
    link:function(scope, elm, attr, jsonInputCtrl) {

      scope.timeValid = function(){
        if(scope.parameter.value == "Invalid Date") {
          scope.parameter.message.push("Date format is not valid");
          return false;
        }
        return true;
      }

      scope.message = [];

      var evaluate = function() {
        scope.parameter.message = [];
        var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);

        for(var i=0; i<a.message.length;i++)
        scope.parameter.message.push(a.message[i]);
        var valid =  scope.timeValid();
        valid =  a.isValid && valid;
        scope.isParameterValid = valid;
        return valid;
      }

      var unbind = scope.$watch('parameter', function() {
        if(scope.parameter==undefined) return;
        scope.parameter.value = new moment(scope.parameter.value).toDate();
        jsonInputCtrl.isValid = scope.parameter.isValid;
        scope.validationFunction = jsonInputCtrl.validationFunction;
        scope.parameter.evaluate = evaluate;

        if(scope.validation) {
          scope.$watch('parameter.value', function(){
              evaluate();
          });
        } else scope.isParameterValid = true;
        unbind();
      });
    }
  };
});

directives.directive('domains', ["$timeout", function($timeout) {

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
        scope.parameter.redraw = redraw;
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

      var redraw = function() {
        var length = scope.parameter.value.markers.length;
        var max = scope.parameter.maxMarkers;
        for(var i=max;i<length;i++){
          removeMarker(scope.parameter.value.markers[i].id);
        }
        for(var i = 0;i<length;i++){
          if(!checkMarkerInsideDomain(scope.parameter.value.markers[i])) removeMarker(scope.parameter.value.markers[i].id);
        }
        length = scope.parameter.value.domains.length;
        max = scope.parameter.maxDomains;
        if(max<length) {
          scope.parameter.value.domains.splice(max, length-max);
          deleteRectangle(max);
        }
        for(var i=0;i<length;i++) {
          boundsChanged(scope.mapRectangles[i], scope.parameter.value.domains[i].id);
        }
      }


      /**************** INIT ******************/
      scope.initializeParameter = function(){
        if(!scope.parameter.value.hasOwnProperty("domains")) scope.parameter.value.domains = [];
        if(!scope.parameter.value.hasOwnProperty("markers")) scope.parameter.value.markers = [];
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
    }]);

directives.directive('fileupload', ["$timeout", "Upload", function($timeout, Upload) {
  return {
    restrict: 'E',
    templateUrl: 'fileupload/fileupload.html',
    replace: true,
    require: '^jsonInput',
    scope: {
      parameter:"=",
      dependencies:"=",
      validation:"="
    },
    link:function(scope, elm, attr, jsonInputCtrl) {

      /**************** VALIDATION ******************/
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

      scope.message = [];

      var evaluate = function() {
        scope.parameter.message = [];
        var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
        for(var i=0; i<a.message.length;i++)
        scope.parameter.message.push(a.message[i]);
        var valid =  scope.fileuploadValid();
        valid =  a.isValid && valid;
        scope.isParameterValid = valid;
        return valid;
      }

      var unbind = scope.$watch('parameter', function() {
        if(scope.parameter==undefined) return;
        jsonInputCtrl.isValid = scope.parameter.isValid;
        scope.validationFunction = jsonInputCtrl.validationFunction;
        scope.parameter.evaluate = evaluate;
        scope.errorUpload = [];
        scope.uploadedFilesDescription = [];
        $timeout(function(){
          if(scope.parameter.disabled) return;
          scope.initFileReader();
        });

        if(scope.validation) {
          scope.$watch('parameter.value', function() {
              evaluate();
          });
        } else scope.isParameterValid = true;

        scope.$watch("parameter.maxSize", function(){
          scope.maxLengthByte = calculateLength(scope.parameter.maxSize);
        });
        unbind();
      }, true);







      scope.initFileReader = function (){
        if (window.File && window.FileList && window.FileReader) {
          scope.init();
        }
      }
      // initialize
      scope.init = function() {
        var form = $("#"+scope.parameter.dbName);
        var fileselect =  form.find("#fileselect")[0];
        var filedrag =  form.find("#filedrag")[0];
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
        if(fileAlreadyUploaded(file.name)){
          errorUpload("You already uploaded a file with name "+file.name+".");
          return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          var paramFile = {fileName: file.name, data: e.target.result};
          $timeout(function(){scope.parameter.value.push(paramFile)});
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
        $timeout(function(){
          if(scope.parameter.disabled) return;
          $('#'+scope.parameter.dbName).find('#fileselect').click();
        }, 0);
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
        $timeout(function(){scope.errorUpload.splice(0, 0, message);});
        $timeout(function(){scope.errorUpload.splice(0,1)},5000);
      }

      scope.removeFile = function(index){
        scope.parameter.value.splice(index, 1);
        scope.uploadedFilesDescription.splice(index, 1);
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
      var fileAlreadyUploaded = function(fileName){
        for(var i=0;i<scope.parameter.value.length;i++)
          if(scope.parameter.value[i].fileName.localeCompare(fileName)==0) return true;
        return false;
      }
    }
  }



}]);

directives.directive('float', function() {
    return {
        restrict: 'E',
        templateUrl: 'float/float.html',
        replace: true,
        require: '^jsonInput',
        scope: {
            parameter:"=",
            dependencies:"=",
            validation:"="
        },
        link:function(scope, elm, attr, jsonInputCtrl) {
            scope.floatValid = function(){
                if(typeof(scope.parameter.value) === 'undefined' || scope.parameter.value ==="NaN"){
                    scope.parameter.message.push("Number format is not valid");
                    return false;
                }
                return true;
            }
            scope.message = [];

            var evaluate = function() {
              scope.parameter.message = [];
              var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
              for(var i=0; i<a.message.length;i++)
                scope.parameter.message.push(a.message[i]);
              var valid =  scope.floatValid();
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
                });
              } else scope.isParameterValid = true;
              unbind();
            }, true);


        }
    };
});

directives.directive('integer', function() {
    return {
        restrict: 'E',
        templateUrl: 'integer/integer.html',
        replace: true,
        require: '^jsonInput',
        scope: {
            parameter:"=",
            dependencies:"=",
            validation:"="
        },
        link:function(scope, elm, attr, jsonInputCtrl) {
          scope.integerValid = function(){
            if(scope.parameter.value % 1 !== 0 || scope.parameter.value ==="NaN" || typeof(scope.parameter.value) =="undefined"){
              scope.parameter.message.push("Number is not an Integer");
              return false;
            }
              return true;
          }

          var evaluate = function() {
            scope.parameter.message = [];
            var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
            for(var i=0; i<a.message.length;i++)
              scope.parameter.message.push(a.message[i]);
            var valid =  scope.integerValid();
            valid =  a.isValid && valid;
            scope.isParameterValid = valid;
            return valid;
          }

          scope.message = [];
          var unbind = scope.$watch('parameter', function() {
            if(scope.parameter==undefined) return;
            jsonInputCtrl.isValid = scope.parameter.isValid;
            scope.validationFunction = jsonInputCtrl.validationFunction;
            scope.parameter.evaluate = evaluate;

            if(scope.validation) {
              scope.$watch('parameter.value', function() {
                  evaluate();
              });
            } else scope.isParameterValid = true;
            unbind();
          }, true);
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
}]);

directives.directive('jsonSelect', function() {
  return {
    restrict: 'E',
    templateUrl: 'select/select.html',
    replace: true,
    require: '^jsonInput',
    scope: {
      parameter:"=",
      dependencies:"=",
      validation: "="
    },
    link:function(scope, elm, attr, jsonInputCtrl) {
      scope.selectValid = function(){
        return true;
      };

      scope.message = [];

      var evaluate = function() {
        scope.parameter.message = [];
        var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
        for(var i=0; i<a.message.length;i++)
        scope.parameter.message.push(a.message[i]);
        var valid =  scope.selectValid();
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
          });
        } else scope.isParameterValid = true;
        unbind();
      }, true);
    }
  };
});

directives.directive('jsonText', function() {
    return {
        restrict: 'E',
        templateUrl: 'text/text.html',
        replace: true,
        require: '^jsonInput',
        scope: {
            parameter:"=",
            dependencies:"=",
            validation:"="
        },
        link:function(scope, elm, attr, jsonInputCtrl) {
            scope.textValid = function(){
                return true;
            }
            scope.message = [];

            var evaluate = function() {
              scope.parameter.message = [];
              var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
              for(var i=0; i<a.message.length;i++)
                scope.parameter.message.push(a.message[i]);
              var valid =  scope.textValid();
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
                });
              } else scope.isParameterValid = true;
              unbind();
            }, true);

        }
    };
});
