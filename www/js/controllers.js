
angular.module('app.controllers', [])
  
.controller('teamsCtrl', ['$scope', '$http', 
function ($scope, $http) {
$scope.teams = [];
$http.get('http://api.football-data.org/v1/competitions/426/leagueTable')
.then(function(response) {
	console.log(response);
	$scope.teams = response.data.standing
})
}])
      


.controller('loginCtrl', ['$scope', '$http', '$state', 'userService',  
function ($scope, $http, $state, userService) {

	var password = '';

	$scope.data = {
		"username": '',
		"password": ''
	}
	$scope.message = "";

	 var clearData = function() {
		$scope.data.username = '';
		$scope.data.password = '';
		$scope.message= '';
	}

	$scope.login = function() {
		var url = 'http://localhost:8080/findByUserName/' + $scope.data.username;
		$http.get(url)
		.then(function(response) {
			console.log(response);
			userService.setUser(response.data);
			if(response.data.userName === $scope.data.username  && response.data.password === $scope.data.password) {
			clearData();	
			$state.transitionTo("menu.teams");	
		}
		else {
			clearData();
			$scope.message = "Wrong Username or Password."
		}
		}, function(response) {
			$scope.message = "Something went terribly wrong.";
		}
		)
	}

	$scope.newUser = function() {
		$state.transitionTo("newUser");
	}
}])

.controller('mapCtrl', function($scope, $http, userService) {


})

.controller('favoriteCtrl', function($scope, $http, userService) {

	$scope.gamesToDisplay = [];

	$scope.teamName = '';
	$scope.teamName = userService.getUser().favoriteTeam;

	$http.get('http://api.football-data.org/v1/competitions/426/fixtures')
	.then(function (response) {
	$scope.games = response.data;
	var count = response.data.count;

	for(var i=0; i<count; i++) {
		if($scope.games.fixtures[i].homeTeamName == $scope.teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
			$scope.gamesToDisplay.push($scope.games.fixtures[i]);
		}
		else if ($scope.games.fixtures[i].awayTeamName == $scope.teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
			$scope.gamesToDisplay.push($scope.games.fixtures[i]);
		}
	}
	})
})

//~~~~~~~~~~~~SEARCH~~~~~~~~~~~~~~~~~	
.controller('searchCtrl', ['$scope', '$http', '$window',   
function ($scope, $http, $window) {
$scope.games = [];
$scope.gamesToDisplay = [];

$scope.example = {
	"1" : 'Arsenal FC',
	"2" : 'Hull City FC',
	"3" : 'Manchester City FC',
	"4" : 'Tottenham Hotspur FC',
	"5" : 'Chelsea FC'
};

$scope.getHelp = function () {
	var message = 'You can use this features to search for teams! \n\nHere are some examples to search for: \n \n';
	for(var i=1; i<6; i++) {
		message += i + ": " + $scope.example[i] + "\n";
	}
	$window.alert(message);
}
$scope.teamToSearch = {
	teamName:''
};
$scope.displayTeam = {
	teamName:''
};
$scope.searchForTeam = function() {
	$scope.gamesToDisplay = [];

	$scope.displayTeam.teamName = $scope.teamToSearch.teamName;
	console.log($scope.displayTeam.teamName);

	$http.get('http://api.football-data.org/v1/competitions/426/fixtures')
	.then(function (response) {
	console.log(response.data);
	$scope.games = response.data;

	for(var i=0; i<380; i++) {
		if($scope.games.fixtures[i].homeTeamName == $scope.teamToSearch.teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
			$scope.gamesToDisplay.push($scope.games.fixtures[i]);
		}
		else if ($scope.games.fixtures[i].awayTeamName == $scope.teamToSearch.teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
			$scope.gamesToDisplay.push($scope.games.fixtures[i]);
		}
	}
	console.log($scope.gamesToDisplay);
})
}
}])

.controller('newUserCtrl', ['$scope', '$http', '$state', 
function ($scope, $http, $state) {
	$scope.user = {
		"userName" : '',
		"password" : '',
		"email" : '',
		"phoneNum" : '',
		"team" : '',
		"league" : '',
		"leagueURL" : ''
	}
	$scope.message = '';

	$scope.backToLogin = function() {
		$state.transitionTo("login");
	}
	$scope.submitNewUser = function() {
		
		console.log($scope.user);

		$http.post('http://localhost:8080/create' , $scope.user)
	    .then(function (response) {
		
		$scope.message = response.data.message;
	    })
	}, function() {
		$scope.message = "Sorry there was a server error.";
	}
}])

.controller('settingsCtrl', ['$scope', '$state', 'userService', '$http',  
function ($scope, $state, userService, $http) {

	$scope.user = userService.getUser();
	$scope.teamNames = [];

	var numTeams;



	
	$scope.backToMain = function() {
		$state.transitionTo("menu.teams");
	}
	$scope.setUser = function() {
		$scope.user = userService.getUser();
	}

	$scope.setTeam = function() {
		var data = document.getElementById("selectTeam");
		var team = data.options[data.selectedIndex].text;
		$scope.user.team = team;
	}

	$scope.setLeague = function() {
		var data = document.getElementById("selectLeague");
		var league = data.options[data.selectedIndex].text;
		$scope.user.league = league;
		$scope.setURL();
	}

	$scope.setURL = function() {
		if($scope.user.league == 'English Premier League') {
			$scope.user.leagueURL = 'http://api.football-data.org/v1/competitions/426/';
		}
		if($scope.user.league == 'Bundesliga') {
			$scope.user.leagueURL = 'http://api.football-data.org/v1/competitions/424/';
		}
		if($scope.user.league == 'Primera Division') {
			$scope.user.leagueURL = 'http://api.football-data.org/v1/competitions/436/';
		}
	}

	$scope.setNames = function() {
		
		var url = $scope.user.leagueURL + 'teams';
		$http.get(url)
		.then(function(response) {
			var data = response.data;
			numTeams = data.count;

		for(var i=0; i<numTeams; i++) {
			$scope.teamNames.push(data.teams[i].name)
		}

	    console.log($scope.teamNames);
		})



		

	}

	$scope.updateUser = function() {

		$http.put('http://localhost:8080/update' , $scope.user)
		.then(function(response) {
			console.log(response);
		})

		$scope.setNames();

	}

	


}])













// .controller('arsenalCtrl', ['$scope', '$http', 
// function ($scope, $http) {
// $scope.games = [];
// $http.get('http://api.football-data.org/v1/teams/57/fixtures')
// .then(function (response) {
// 	console.log(response);
// 	$scope.games = response.data;
// })
// }])

// .controller('barcelonaCtrl', ['$scope', '$http', 
// function ($scope, $http) {
// $scope.games = [];
// $http.get('http://api.football-data.org/v1/teams/81/fixtures')
// .then(function (response) {
// 	console.log(response);
// 	$scope.games = response.data;
// })
// }])