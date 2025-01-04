// ==UserScript==
// @name         Name Saver for Multiplayer Piano - Promotor
// @namespace    https://github.com/slowstone72/MPP-name-saver
// @version      2025.01.04
// @license      Unlicense
// @description  Promotor for the Name Saver script. Auto-Save & Set your nickname on Multiplayer Piano. No more 'Anonymous.'
// @author       Callum Fisher <cf.fisher.bham@gmail.com>
// @match        https://mppclone.com/*
// @match        https://mpp.8448.space/*
// @match        https://multiplayerpiano.com/*
// @match        https://multiplayerpiano.net/*
// @match        https://multiplayerpiano.org/*
// @match        https://piano.mpp.community/*
// @match        https://mpp.autoplayer.xyz/*
// @match        https://mpp.hyye.tk/*
// @match        https://mppclone.hri7566.info/*
// @match        https://piano.ourworldofpixels.com/*
// @match        https://mpp.hri7566.info/*
// @match        https://mppclone.hri7566.info/*
// @grant        none
// ==/UserScript==

/*
	"Name Saver for Multiplayer Piano - Promotor"
	2025.01.04

	As of writing, Multiplayer Piano (<https://multiplayerpiano.com>) still doesn't save your nickname.
	This is a simple script that attempts to rectify this issue.

	Userscript: https://greasyfork.org/scripts/522853

	Repository: https://github.com/slowstone72/MPP-name-saver

	Callum Fisher <cf.fisher.bham@gmail.com>

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

const startNameSaverPromotor = () => {
	let logPrefix = '[Name Server for Multiplayer Piano Promotor v2025.01.04] ';
	console.log(`${logPrefix}Running.`);
	if (MPP.client.channel._id !== 'test/Save Your Nickname') {
		console.log(`${logPrefix}Cancelled - Not in correct channel.`);
		return;
	}
	let ad = 'Save your M.P.P. nickname: https://bit.ly/SaveOurNames - Add userscript to start saving your nickname.';
	let sendAd = () => {
		if (MPP.client.channel._id !== 'test/Save Your Nickname') return;
		MPP.chat.send(ad);
	}
	setInterval(sendAd, 60000);
	MPP.client.on('participant added', sendAd);
}

// Start:

if (!window.addEventListener) {
	window.attachEvent('onload', startNameSaverPromotor);
} else {
	window.addEventListener('load', startNameSaverPromotor);
}