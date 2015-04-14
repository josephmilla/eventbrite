'use strict';

angular.module('eventbriteApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    console.log("jasldjlkasjd");

    $http({ method: 'GET', url: 'https://www.eventbriteapi.com/v3/events/?token=BKKRDKVUVRC5WG4HAVLT' }).
      success(function (data, status, headers, config) {
        console.log("GET request was successful!");
        console.log(data);

        var events = data.events;
        var lats = [];
        var lons = [];
        var coordinates = [];
        for (var i=0; i < events.length; i++) {
          if (events && events[i] && events[i].venue) {
            var venue = events[i].venue;
            var address = venue.address;
            var lat = address.latitude;
            var lon = address.longitude;
            lats.push(lat);
            lons.push(lon);
            coordinates.push(new google.maps.LatLng(lat, lon));
          }
        }

        console.log(coordinates);

      }).
      error(function (data, status, headers, config) {
        console.log("GET request wasn't successful");
      });

    $scope.coordinates = coordinates;

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
