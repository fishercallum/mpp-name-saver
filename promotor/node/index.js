/*
	"Name Saver for Multiplayer Piano - Promotor - Node.js" - (v2.0.0)
	index.js - Main app.
	2025.01.04 - 2025.01.26

	Created to promote the Name Saver userscript - bit.ly/SaveOurNames

	Repository: https://github.com/cffisher/MPP-name-saver

	Callum Fisher cf.fisher.bham@gmail.com

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

// Fetch dependencies:

const Client = require('./mppClient.js');

// Define settings:

const wsServer = 'wss://game.multiplayerpiano.com:443';

const ad = 'Welcome, %name%. M.P.P. doesn\'t save your nickname by default, so I made a userscript to help. Check it out here! bit.ly/SaveOurNames - https://greasyfork.org/scripts/522853';
const desiredChannel = 'test/Save Your Nickname';
const desiredName = '[bit.ly/SaveOurNames]';

// Define antiSpam chat settings:

const antiSpamTimeout = 120000;

let lastMessage = {
	t: Date.now(),
	m: ''
}

// Create new Multiplayer Piano client instance:

const client = new Client({
	server: wsServer,
	channel: desiredChannel
});

// Define functions:

// Define antiSpam sendMessage to chat function:

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

// Define setName function:

const setName = () => {
	if (client.getOwnParticipant().name !== desiredName) client.setName(desiredName);
}

// Define sendAd function:

const sendAd = msg => {
	if (client.channel._id !== desiredChannel || msg.id === client.getOwnParticipant().id) return;
	sendMessage(ad.replace(/%name%/g, msg.name));
	lastAdMsg = Date.now();
}

// Define function to checkClient status: (name, channel, etc.)

const checkClient = () => {
	if (!client.connected()) { // Check if we've disconnected and attempt to reconnect:
		client.disconnect();
		setTimeout(() => {
			client.connect();
			client.setChannel(desiredChannel);
		}, 5000);
	} else if (client.channel && client.channel._id !== desiredChannel) { // Check if we're still in the desiredChannel:
		client.setChannel(desiredChannel);
	} else if (client.getOwnParticipant().name !== desiredName) { // Check if we're still using the desiredName:
		setName();
	}
}

// checkClient every minute:

setInterval(checkClient, 60000);

// Listen for new users joining the channel:

client.on('userJoin', sendAd); // sendAd on user join

// Listen for 'connect' message from client on server connect:

client.on('connect', setName); // Set desiredName name on 'connect'

// Start in desiredChannel:

client.start();

client.setChannel(desiredChannel);