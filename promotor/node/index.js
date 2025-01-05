/*
	"Name Saver for Multiplayer Piano - Promotor - Node.js"
	ad-node.js - Main app.
	2025.01.04 - 2025.01.05

	Created to promote the Name Saver userscript.

	Repository: <https://github.com/slowstone72/MPP-name-saver>

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

const Client = require('./Client.js');

const ad = 'Hi, %name%. M.P.P. doesn\'t save your nickname by default, so I made a simple script to try to fix that. If you\'re interested, try it out: https://bit.ly/SaveOurNames (or greasyfork.org/scripts/522853 )';
const desiredChannel = 'test/Save Your Nickname';
const desiredName = '[bit.ly/SaveOurNames]';
const antiSpamTimeout = 120000;
// const lastWelcome = Date.now();

let lastMessage = {
	t: Date.now(),
	m: ''
}

const client = new Client('wss://game.multiplayerpiano.com:443');

client.start();

client.setChannel(desiredChannel);

/* const randomNum = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
} */

const sendMessage = input => {
	if (input === lastMessage.m && Date.now() - lastMessage.t < antiSpamTimeout) return;
	lastMessage = {
		t: Date.now(),
		m: input
	}
	client.sendArray([{
		'm': 'a',
		'message': input
	}]);
}

const sendAd = msg => {
	if (client.channel._id !== desiredChannel || msg.id === client.getOwnParticipant().id) return;
	sendMessage(ad.replace(/%name%/g, msg.name));
	lastAdMsg = Date.now();
}

const checkClient = () => {
	if (!client.isConnected()) {
		client.stop();
		setTimeout(() => {
			client.start();
			client.setChannel(desiredChannel);
		}, 5000);
	} else if (client.channel && client.channel._id !== desiredChannel) {
		client.setChannel(desiredChannel);
	} else if (client.getOwnParticipant().name !== desiredName) {
		client.sendArray([{
			'm': 'userset',
			'set': {
				'name': desiredName
			}
		}]);
	}
}

setInterval(checkClient, 60000);

client.on('participant added', sendAd);