'use strict';

angular.module('eventbriteApp')
  .controller('MainCtrl', function ($scope, $http, $resource, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    // function get_data() {
    //   $scope.eventbriteAPI = $resource("https://www.eventbriteapi.com/v3/events/?token=BKKRDKVUVRC5WG4HAVLT",
    //   { callback: "JSON_CALLBACK" },
    //   { get: { method: "JSON" }});
    //
    //   // var events = json.events;
    //   var events = $scope.eventbriteAPI;
    //   console.log("asdjlkajsd");
    //   console.log(events);
    //   var lats = [];
    //   var lons = [];
    //   var coordinates = [];
    //   for (var i=0; i < events.length; i++) {
    //     if (events && events[i] && events[i].venue) {
    //       var venue = events[i].venue;
    //       var address = venue.address;
    //       var lat = address.latitude;
    //       var lon = address.longitude;
    //       lats.push(lat);
    //       lons.push(lon);
    //       coordinates.push(new google.maps.LatLng(lat, lon));
    //     }
    //   }
    //
    //
    //   $scope.coordinates = coordinates;
    // }
    //
    // function callUrl(url, async, fn) {
    //    // console.log(url);
    //    if (async != false) {
    //      async = true;
    //    }
    //
    //    var req = new XMLHttpRequest();
    //    req.open("GET", url, async);
    //    if (arguments.length == 3) {
    //      req.onreadystatechange = function () {
    //        if (req.readyState == 4) {
    //          fn(req.responseText);
    //        }
    //      }
    //    }
    //
    //    try {
    //      req.send();
    //    }
    //    catch(e) {}
    // }

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
