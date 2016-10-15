angular.module('app.controllers', [])
  
.controller('teamsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('bayernCtrl', ['$scope', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http) {
$scope.games = [];
$http.get('/bayern.json')
// http://api.football-data.org/v1/teams/57/fixtures
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
$http.get('/arsenal.json')
// http://api.football-data.org/v1/teams/57/fixtures
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
$http.get('/barcelona.json')
// http://api.football-data.org/v1/teams/57/fixtures
.then(function (response) {
	console.log(response);
	$scope.games = response.data;
})


}])
 