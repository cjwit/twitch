var users = [{
	'name': "freecodecamp",
	'icon': null
	},
	{
	'name': "storbeck",
	'icon': null
	},
	{
	'name': "terakilobyte",
	'icon': null
	},
	{
	'name': "thomasballinger",
	'icon': null
	},
	{
	'name': "RobotCaleb",
	'icon': null
	},
	{
	'name': "habathcx",
	'icon': null
	},
	{
	'name': "cretetion",
	'icon': null
	},
	{
	'name': "beohoff",
	'icon': null
	},
	{
	'name': "ESL_CSGO",
	'icon': null
	},
	{
	'name': "swifty",
	'icon': null
	},
	{
	'name': "ESL_SC2",
	'icon': null
	},
	{
	'name': "MADE+UP1",
	'icon': null
	},
	{
	'name': "MADE+UP2",
	'icon': null
	}];

function errorStatus (i) {
	var status = 'Not found';
	$('#error').append(createDIV(i, status));
}

function offlineStatus (data, i) {
	var status = 'Not streaming';
	$('#offline').append(createDIV(i, status));
}

function streaming (data, i) {
	var status = data.stream.game;
	$('#streaming').append(createDIV(i, status));
}

function runAPI(v, i) {

	var url = "https://api.twitch.tv/kraken/streams/"
	var name = users[i].name;
	var requestURL = url + name;

	$.ajax(
		{ 	url: requestURL,
			crossDomain: true,
			dataType: 'jsonp'
		}
	).done(function(data){

		if (data.error) { 
			errorStatus(i);
		} else if (data.stream == null) {
			offlineStatus(data, i);
		} else {
			streaming(data, i);
		}

	});
}

function createDIV(i, status) {
	var name = users[i].name;
	var icon = users[i].icon;
	var status = status
	var url = 'http://www.twitch.tv/' + name;

	var info = "<div id = 'NAME'><div class='channel'><a href ='URL' target='_blank'>CHANNEL</a></div><div class='status'>STATUS</div></div>"
	var div = info.replace(/NAME/g, name).replace(/CHANNEL/, name).replace(/STATUS/, status).replace(/URL/, url)

	return div;
}

$(document).ready(function(){

	// use API to fill in status
	users.forEach(runAPI)

	$('#filter').click(function(){
		$('#error').slideToggle();
		$('#offline').slideToggle();
	})
		

});