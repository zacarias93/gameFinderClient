
angular.module('app.controllers', [])

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
		$scope.teamNames.sort();

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

		$scope.games = [];

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
		$scope.gamesToDisplay = [];

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

}])





.controller('mapCtrl', function($scope, $http, userService) {


})





