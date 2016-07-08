
directives.directive('scrollSpy', function ($window, $timeout) {
  return {
    restrict: 'A',
    scope:{
      yOffset: '='
    },
    controller: function ($scope) {
      $scope.spies = [];
      this.addSpy = function (spyObj) {
        $scope.spies.push(spyObj);
      };
    },
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
});
directives.directive('spy', function ($location, $anchorScroll) {
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
});
