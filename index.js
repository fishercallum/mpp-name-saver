// ==UserScript==
// @name         Name Saver for Multiplayer Piano
// @namespace    https://github.com/slowstone72/MPP-name-saver
// @version      2025.01.04
// @license      Unlicense
// @description  Auto-Save & Set your nickname on Multiplayer Piano. No more 'Anonymous.'
// @author       Callum Fisher <cf.fisher.bham@gmail.com>
// @match        *://multiplayerpiano.com/*
// @grant        none
// ==/UserScript==

// 2025.01.04

const startNameSaver = () => {
	console.log('[Name Server for Multiplayer Piano v2025.01.04] Running.');
	const setName = name => {
		MPP.client.sendArray([{
			'm': 'userset',
			'set': {
				'name': localStorage.nsNick
			}
		}]);
		if (!MPP.client.isConnected() || MPP.client.getOwnParticipant().name !== name) {
			setTimeout(() => {
				setName(name);
			}, 5000);
			return;
		} else {
			saveName();
		}
	}
	const checkName = () => {
		if (typeof localStorage.nsNick === 'undefined') localStorage.nsNick = MPP.client.getOwnParticipant().name;
		if (MPP.client.getOwnParticipant().name !== localStorage.nsNick) {
			setName(localStorage.nsNick);
		}
	}
	const saveName = () => {
		if (MPP.client.getOwnParticipant().name === localStorage.nsNick) return;
		localStorage.nsNick = MPP.client.getOwnParticipant().name;
	}
	if (MPP.client.isConnected()) checkName();
	MPP.client.on('hi', checkName);
	MPP.client.on('p', saveName);
}

// Start:

if (!window.addEventListener) {
	window.attachEvent('onload', startNameSaver);
} else {
	window.addEventListener('load', startNameSaver);
}