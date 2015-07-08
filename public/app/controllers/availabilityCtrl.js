// ====
// ----
// availabilityController
// ----
// This controller covers all the stuff that needs to
// happen on the availabilty page.
// ====
    // ====
    // function to populate the table/calender
    // ====


var myApp = angular.module('dialog', ['ui']);

function MainCtrl($scope) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.eventChanged = 0;

    // For DEMO only  This can be created however you please. 
    // *************
    $scope.events = [
        {
        title: 'All Day Event',
        start: new Date(y, m, 1)},
    {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)},
    {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false},
    {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false},
    {
        title: 'Meeting',
        start: new Date(y, m, d, 10, 30),
        allDay: false},
    {
        title: 'Lunch',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false},
    {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false},
    {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://google.com/'}]

    $scope.addChild = function() {
        $scope.events.push({
            title: 'Click for Google ' + $scope.events.length,
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
        });
        $scope.events.dirty = true;
      
        $scope.eventChanged = $scope.eventChanged + 1;
    }

    $scope.remove = function(index) {
        $scope.events.splice(index,1);
        $scope.events.dirty = true;
        $scope.eventChanged = $scope.eventChanged + 1;
    }
        
    
}
    
    /*
*  Implementation of JQuery FullCalendar 
*  inspired by http://arshaw.com/fullcalendar/ 
*  
*  Basic Calendar Directive that takes in live events as the ng-model and then calls fullCalendar(options) to render the events correctly. 
*  
*  Authors
*  @andyjoslin
*  @joshkurz
*/

myApp.directive('devCalendar',['ui.config', '$parse', function (uiConfig,$parse) {
  uiConfig.devCalendar = uiConfig.devCalendar || {};    
  //returns the calendar
  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      eventChanged: "=changed",
      events: "=ngModel"
    },
    link: function(scope, elm, $attrs) {
      var ngModel = $parse($attrs.ngModel);
      var editEvents = [];
      //update the calendar with the correct options
      function update() {
      //IF the calendar has options added then render them.
      var expression,
          options = {
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },
            // add event name to title attribute on mouseover. 
            eventMouseover: function(event, jsEvent, view) {
              if (view.name !== 'agendaDay') {
                $(jsEvent.target).attr('title', event.title);
               }
            },
            // Calling the events from the scope through the ng-model binding attribute. 
            events: ngModel(scope)
            };          
            
            if ($attrs.devCalendar) {
              expression = scope.$eval($attrs.devCalendar);
            } else {
              expression = {};
            }
            //Set the options from the directive's configuration
            angular.extend(options, uiConfig.devCalendar, expression);
            elm.html('').fullCalendar(options);
            }
            update();
            /*
            *
            *    This is where I get confused. Not sure why you can only watch events.length to update the scope accordingly. If events is watched The console blows to shreds and nothing happens. 
            *    
            *
            */ 
             scope.$watch( 'events.length', function( newVal, oldVal )
            {
              console.log( 'model changed:', newVal, oldVal );
              update();
            }, true );
      
        }
    };
}]);



//Include angular-ui dependency in resources on the side and as 'ui'
myApp.directive('inplace', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            model: '=model',
            removeFn: '=onDelete',
            events: '=changed'
        },
        template: '<span>'+
        '<span class="c1" ng-hide="editorEnabled"'+
          'ng-click="enableEditor();">{{model}}</span>' +
        '<input ng-show="editorEnabled" ng-model="editModel"' +
          'ng-required ui-keypress="{13: \'unEdit()\'}"'+
          'ui-event="{\'blur\': \'unEdit()\'}"/>' +
        '</span>',
        // The linking function will add behavior to the template
        link: function(scope, element, attrs, $parent, $timeout) {
            scope.editorEnabled= false;
          
            scope.unEdit = function() {
              scope.model = angular.copy(scope.editModel);
              scope.editorEnabled= false;                   
            };
                
            scope.enableEditor= function() { 
                scope.editModel = angular.copy(scope.model);
                scope.editorEnabled = true;
            };
        }
    }
});
