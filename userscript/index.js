// ==UserScript==
// @name         Name Saver for Multiplayer Piano
// @namespace    cffisher.github.io
// @version      1.2.3
// @license      Unlicense
// @description  Auto-Save & Set your nickname on Multiplayer Piano. No more 'Anonymous.'
// @author       Callum Fisher <cf.fisher.bham@gmail.com>
// @match        *://multiplayerpiano.com/*
// @grant        none
// ==/UserScript==

/*
	"Name Saver for Multiplayer Piano"
	2025.01.04 - 2025.01.26

	As of writing, Multiplayer Piano (https://multiplayerpiano.com) still doesn't save your nickname.
	This is a simple script that attempts to rectify this issue.

	Userscript: https://greasyfork.org/scripts/522853

	Repository: https://github.com/cffisher/mpp-name-saver

	Callum Fisher - cf.fisher.bham@gmail.com

	This is free and unencumbered software released into the public domain.

	Anyone is free to copy, modify, publish, use, compile, sell, or
	distribute this software, either in source code form or as a compiled
	binary, for any purpose, commercial or non-commercial, and by any
	means.

	In jurisdictions that recognize copyright laws, the author or authors
	of this software dedicate any and all copyright interest in the
	software to the public domain. We make this dedication for the benefit
	of the public at large and to the detriment of our heirs and
	successors. We intend this dedication to be an overt act of
	relinquishment in perpetuity of all present and future rights to this
	software under copyright law.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	For more information, please refer to <https://unlicense.org/>
*/

const startMPPNameSaver = () => {
	console.log('[Name Saver for Multiplayer Piano v1.2.3] Running.');
	let setName = () => {
		MPP.client.sendArray([{
			'm': 'userset',
			'set': {
				'name': localStorage.nsNick
			}
		}]);
		if (!MPP.client.isConnected() || MPP.client.getOwnParticipant().name !== localStorage.nsNick) {
			setTimeout(setName, 5000);
			return;
		}
	}
	let checkName = () => {
		if (typeof localStorage.nsNick === 'undefined') localStorage.nsNick = MPP.client.getOwnParticipant().name;
		if (MPP.client.getOwnParticipant().name !== localStorage.nsNick) {
			setName();
		}
	}
	let saveName = () => {
		if (MPP.client.getOwnParticipant().name === localStorage.nsNick) return;
		localStorage.nsNick = MPP.client.getOwnParticipant().name;
	}
	if (MPP.client.isConnected()) checkName();
	MPP.client.on('connect', checkName);
	MPP.client.on('p', saveName);
}

// Start:

if (!window.addEventListener) {
	window.attachEvent('onload', startMPPNameSaver);
} else {
	window.addEventListener('load', startMPPNameSaver);
}