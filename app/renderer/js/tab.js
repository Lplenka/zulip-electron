'use strict';
const path = require('path');
const {remote, ipcRenderer} = require('electron');
const {app} = require('electron').remote;
const JsonDB = require('node-json-db');
const TabGroup = require('electron-tabs');


const db = new JsonDB(app.getPath('userData') + '/domain.json', true, true);
const data = db.getData('/');
if(!data.teams) {db.push("/teams",[]);}
let teams =db.getData('/teams');


const teamSwitchShortcutPrefix = process.platform === 'darwin' ? 'Cmd' : 'Ctrl';
const tabGroup = new TabGroup();
const teamsSubmenu = [];


console.log(teams);


console.log(teams[0]);

window.onload = () => {
   const wview = document.querySelector('.etabs-views');
   const loader = document.querySelector('.loader');

   const loadstart = () => {
     wview.style.display = 'none';
   }

   const loadstop = () => {
     loader.style.display = 'none';
      }

   wview.addEventListener('did-start-loading', loadstart)
   wview.addEventListener('did-stop-loading', loadstop)
 }

$(document).ready( () => { $('.etabs-tabs').append('<div class="etabs-tab visible" id="plus"><span class="etabs-tab-icon"></span><span class="etabs-tab-title">&#65291;</span><span class="etabs-tab-buttons"></span></div>');
$('#plus').on("click", () => {
	console.log("I was clicked");
ipcRenderer.send('addserver');
});


});

const tabsList = [];
let setFocusInterval = null;

function setFocus() {
	const tab = tabGroup.getActiveTab();
	if (tab !== null && tab.webview.guestinstance !== document.activeElement.guestinstance) {
		tab.webview.focus();
	} else {
		clearInterval(setFocusInterval);
	}
}

function setFocusToActiveTab() {
	clearInterval(setFocusInterval);
	setFocusInterval = setInterval(setFocus, 100);
}

function switchToTab(accelerator) {
	const index = parseInt(accelerator[accelerator.length - 1], 10) - 1;
	console.log('got index ' + index);
	if (index >= 0 && index < teams.length) {
		tabsList[index].activate();
	}
}

function sendAction(action) {
	const tab = tabGroup.getActiveTab();
	if (tab !== null) {
		if (action === 'reload') {
			tab.webview.reload();
			return;
		}
		tab.webview.send(action, tab.webview);
	}
}

ipcRenderer.on('sendToActiveWebview', (e, action) => {
	console.log('Host got ' + action);
	sendAction(action);
});

ipcRenderer.on('setFocusToActiveTab', () => {
	setFocusToActiveTab();
});

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < teams.length; i++) {
		const tabParams = {
			webviewAttributes: {
				preload: path.join(__dirname, 'js', 'preload.js'),
				allowpopus: 'on',
				webpreferences: 'allowRunningInsecureContent, plugins=true',
				plugins: 'on'
			},
			closable: false,
			src: teams[i].domain,
			active: teams[i].active
		};

		if (teams[i].iconURL === 'undefined') {
			if (teams[i].title === 'undefined' || teams[i].title === '') {
				tabParams.title = '?';
			} else {
				tabParams.title = teams[i].title[0];
			}
		} else {
			tabParams.iconURL = teams[i].iconURL;
			tabParams.title = ' ';
		}
		const tab = tabGroup.addTab(tabParams);
		tab.on('active', () => {
			setFocusToActiveTab();
		});
		tabsList.push(tab);
	}
	setFocusToActiveTab();
}, false);

console.log(tabsList);
