angular.module('app.controllers', [])
  
.controller('teamsCtrl', ['$scope', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http) {
$scope.teams = [];
$http.get('http://api.football-data.org/v1/competitions/426/leagueTable')
.then(function(response) {
	console.log(response);
	$scope.teams = response.data.standing
})


}])
   
.controller('bayernCtrl', ['$scope', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http) {
$scope.games = [];
$http.get('http://api.football-data.org/v1/teams/5/fixtures')
.then(function (response) {
	console.log(response);
	$scope.games = response.data;
})


}])
      
.controller('arsenalCtrl', ['$scope', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http) {
$scope.games = [];
$http.get('http://api.football-data.org/v1/teams/57/fixtures')
.then(function (response) {
	console.log(response);
	$scope.games = response.data;
})


}])

.controller('barcelonaCtrl', ['$scope', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http) {
$scope.games = [];
$http.get('http://api.football-data.org/v1/teams/57/fixtures')
.then(function (response) {
	console.log(response);
	$scope.games = response.data;
})


}])
 