'use strict';
const path = require('path');
const {remote,ipcRenderer} = require('electron');
const {app} = require('electron').remote;
const JsonDB = require('node-json-db');
const request = require('request');


const db = new JsonDB(app.getPath('userData') + '/domain.json', true, true);
const data = db.getData('/');
if (!data.teams) {
	db.push("/teams", []);
}
let teams = db.getData('/teams');
let teamLength = teams.length;
console.log(teamLength);

const serverWindow = remote.getCurrentWindow();

let element = document.getElementById('close-button');

if (element) {
	element.addEventListener('click', () => {
		serverWindow.close();
	});
}

const checkServer = domain => {

	for ( var i = 0; i < teamLength; i++) {
		if (teams[i].domain === domain);
		return false;
		break;
	}
	return true;

};

console.log(teams[0]);

console.log(data.teams);

window.addServer = function() {
	console.log("I was called ");
	document.getElementById('main').innerHTML = 'checking...';

	let newDomain = document.getElementById('url').value;
	newDomain = newDomain.replace(/^https?:\/\//, '');
	newDomain = newDomain.replace(/^http?:\/\//, '');

	if (newDomain === '') {
		document.getElementById('urladded').innerHTML = 'Please input a value';
	} else {
		document.getElementById('main').innerHTML = 'Checking...';
		if (newDomain.indexOf('localhost:') >= 0) {
			const domain = 'http://' + newDomain;
			const checkDomain = domain + '/static/audio/zulip.ogg';
			request(checkDomain, (error, response) => {
				if (!error && response.statusCode !== 404) {
					document.getElementById('main').innerHTML = 'Connect';
					if(checkServer(domain)) {
					db.push("/teams", [{
						title: 'Localhost',
						domain: domain,
						iconURL: 'undefined',
						active: (teams.length === 0)
					}], false);
					ipcRenderer.send('loadtabview');
				}else {
					document.getElementById('server-status').innerHTML = 'This Server is already loaded in another tab';
				}
				} else {
					document.getElementById('main').innerHTML = 'Connect';
					document.getElementById('server-status').innerHTML = 'Not a valid Zulip Local Server.';
				}
			});
		} else {
			const domain = 'https://' + newDomain;
			const checkDomain = domain + '/static/audio/zulip.ogg';
			request(checkDomain, (error, response) => {
				if (!error && response.statusCode !== 404) {
					document.getElementById('main').innerHTML = 'Connect';
					db.push("/teams", [{
						title: 'Zulip',
						domain: domain,
						iconURL: 'undefined',
						active: (teams.length === 0)
					}], false);
					ipcRenderer.send('loadtabview');
				} else {
					document.getElementById('main').innerHTML = 'Connect';
					document.getElementById('server-status').innerHTML = 'Not a valid Zulip Server.';
				}
			});
		}
	}









};
