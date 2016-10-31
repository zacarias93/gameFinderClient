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
$http.get('http://api.football-data.org/v1/teams/81/fixtures')
.then(function (response) {
	console.log(response);
	$scope.games = response.data;
})
}])

.controller('loginCtrl', ['$scope', '$http', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $state) {
	console.log($scope.data);
	var password = '';

	$scope.data = {
		"username": '',
		"password": ''
	}

	$scope.message = "";

	$scope.login = function() {
		console.log($scope.data);
		var url = 'http://localhost:8080/findByEmail/' + $scope.data.username;
		$http.get(url)
		.then(function(response) {
			console.log(response);
			if(response.data.userName === $scope.data.username  && response.data.password === $scope.data.password) {
			console.log("tis true!!");
			$scope.message= '';
			$state.transitionTo("menu.teams");	
		}
		else {
			console.log("tis false!!");
			$scope.message = "Wrong Username or Password."
		}
		})	
	}

	$scope.newUser = function() {
		$state.transitionTo("menu.newUser");
	}

}])


.controller('searchCtrl', ['$scope', '$http',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http) {
$scope.games = [];

$scope.team = {
	teamName:''
};

$scope.displayTeam = {
	teamName:''
};

$http.get('http://api.football-data.org/v1/competitions/426/fixtures')
	.then(function (response) {
	console.log(response.data);
	$scope.games = response.data;
})

$scope.searchForTeam = function() {
	$scope.displayTeam.teamName = $scope.team.teamName;
}

}])

// .controller('settingsCtrl', ['$scope', '$http',   // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $http) {
// $scope.games = [];

// $scope.team = {
// 	teamName:''
// };

// $scope.displayTeam = {
// 	teamName:''
// };

// $http.get('http://api.football-data.org/v1/competitions/426/fixtures')
// 	.then(function (response) {
// 	console.log(response.data);
// 	$scope.games = response.data;
// })

// $scope.searchForTeam = function() {
// 	$scope.displayTeam.teamName = $scope.team.teamName;
// }

// }])
 