
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

	var user = {};
	user = userService.getUser();
	console.log(user);

	$scope.teamName = '';
	$scope.teamName = userService.getUser().team;

	console.log(user.leagueURL);
	var url = user.leagueURL + '/fixtures';

	$http.get(url)
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
	$scope.teamNames = [];

	$scope.league = '';
	$scope.teamName = '';

	var teamName = '';
	var league = '';
	var url = '';
	var count;



	$scope.setLeague = function() {
		var data = document.getElementById("selectLeague");
		league = data.options[data.selectedIndex].text;
		console.log(league);
		$scope.setURL();
		$scope.setNames();
		console.log(url);
	}

	$scope.setNames = function() {
		$scope.teamNames = [];
		var namesURL = url + 'teams';

		$http.get(namesURL)
		.then(function(response) {
			var data = response.data;
			numTeams = data.count;
			console.log(data);

		for(var i=0; i<numTeams; i++) {
			$scope.teamNames.push(data.teams[i].name)
		}
		console.log($scope.teamNames);
		})
	}

	$scope.setURL = function() {
		if(league == 'English Premier League') {
			url = 'http://api.football-data.org/v1/competitions/426/';
		}
		if(league == 'Bundesliga') {
			url = 'http://api.football-data.org/v1/competitions/430/';
		}
		if(league == 'Primera Division') {
			url = 'http://api.football-data.org/v1/competitions/436/';
		}
	}

	$scope.setTeam = function() {
			var data = document.getElementById("selectTeamName");
			teamName = data.options[data.selectedIndex].text;
			console.log(teamName);
			$scope.setGames();
	}

	$scope.setGames = function() {

		var gamesURL = url + 'fixtures';

		$http.get(gamesURL)
		.then(function (response) {
		$scope.games = response.data;
		console.log($scope.games);
		count = response.data.count;
		console.log(count);
		})
	}
	
	

	$scope.displayGames = function() {

		console.log(count);
		console.log(teamName);
		console.log($scope.games);

		for(var i=0; i<count; i++) {
			if($scope.games.fixtures[i].homeTeamName == teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
				$scope.gamesToDisplay.push($scope.games.fixtures[i]);
			}
			else if ($scope.games.fixtures[i].awayTeamName == teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
				$scope.gamesToDisplay.push($scope.games.fixtures[i]);
			}
		}

		console.log($scope.gamesToDisplay);




		
		for(var i=0; i<380; i++) {
		if($scope.games.fixtures[i].homeTeamName == $scope.teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
			$scope.gamesToDisplay.push($scope.games.fixtures[i]);
		}
		else if ($scope.games.fixtures[i].awayTeamName == $scope.teamName && $scope.games.fixtures[i].status == "SCHEDULED") {
			$scope.gamesToDisplay.push($scope.games.fixtures[i]);
		}
		}
	}

	



$scope.getHelp = function () {
	var message = 'You can use this features to search for teams! \n\nHere are some examples to search for: \n \n';
	for(var i=1; i<6; i++) {
		message += i + ": " + $scope.example[i] + "\n";
	}
	$window.alert(message);
}

$scope.example = {
	"1" : 'Arsenal FC',
	"2" : 'Hull City FC',
	"3" : 'Manchester City FC',
	"4" : 'Tottenham Hotspur FC',
	"5" : 'Chelsea FC'
};

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
	// $scope.team = '';
	var numTeams;
	var team = $scope.user.team;
	
	$scope.backToMain = function() {
		$state.transitionTo("menu.teams");
	}
	$scope.setUser = function() {
		$scope.user = userService.getUser();
	}

	$scope.setTeam = function() {
		var data = document.getElementById("selectTeamName");
		var team = data.options[data.selectedIndex].text;
		$scope.user.team = team;
	}

	$scope.setLeague = function() {
		var data = document.getElementById("selectLeague");
		var league = data.options[data.selectedIndex].text;
		$scope.user.league = league;
		$scope.setURL();
		$scope.setNames();
	}

	$scope.setURL = function() {
		if($scope.user.league == 'English Premier League') {
			$scope.user.leagueURL = 'http://api.football-data.org/v1/competitions/426/';
		}
		if($scope.user.league == 'Bundesliga') {
			$scope.user.leagueURL = 'http://api.football-data.org/v1/competitions/430/';
		}
		if($scope.user.league == 'Primera Division') {
			$scope.user.leagueURL = 'http://api.football-data.org/v1/competitions/436/';
		}
	}

	$scope.setNames = function() {

		$scope.teamNames = [];
		var url = $scope.user.leagueURL + 'teams';

		$http.get(url)
		.then(function(response) {
			var data = response.data;
			numTeams = data.count;
			console.log(data);

		for(var i=0; i<numTeams; i++) {
			$scope.teamNames.push(data.teams[i].name)
		}
		})
	}

	$scope.updateUser = function() {

		$scope.setTeam();

		$http.put('http://localhost:8080/update' , $scope.user)
		.then(function(response) {
			console.log(response);
		})
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