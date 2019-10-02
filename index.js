// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const dotenv = require('dotenv');
const path = require('path');
const restify = require('restify');
const Business = require('./bot/model/business.js');

/** Botの設定 */
// BotFrameworkを使用するためのSDK
const { BotFrameworkAdapter } = require('botbuilder');
// This bot's main dialog.
const { MyBot } = require('./bot/workManagerBot.js');
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

/** HTTPクライアントの設定 */
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 9443, () => {
	console.log(`\n${server.name} listening to ${server.url}`);
	console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
	console.log(`\nTo test your bot, see: https://aka.ms/debug-with-emulator`);
});

// Botのアダプター
const adapter = new BotFrameworkAdapter({
	appId: process.env.MicrosoftAppId,
	appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
	// This check writes out errors to console log .vs. app insights.
	console.error(`\n [onTurnError]: ${error}`);
	// Send a message to the user
	await context.sendActivity(`Oops. Something went wrong!`);
};

// Create the main dialog.
const myBot = new MyBot();

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
	adapter.processActivity(req, res, async (context) => {
		// Route to main dialog.
		await myBot.run(context);
	});
});

/**
 * 次の月の勤務時間をユーザ分登録する.
 * cronで締め日の一日前とかに実行して準備しておく.
 */
server.post('/api/prepareNextMonth/:year/:month', (req, res, next) => {
	const result = Business.generateNextMonthRecords(req.params.year, req.params.month);
	res.send(result);
	next();
});

/** 疎通確認用 */
server.get('/api/test', function (req, res, next) {
	res.send({ hello: 'world' });
	next();
});