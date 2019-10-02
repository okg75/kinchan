
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const C = require('./config/const.js');
const Business = require('./model/business.js');

class MyBot extends ActivityHandler {
	constructor() {
		super();
		this.onMessage(async (context, next) => {
			const text = context.activity.text;

			if (text === `出勤`) {
				const result = await Business.registStartTime(
					context.activity.from.id,
					context.activity.timestamp);

				if (result.err) {
					await context.sendActivity(`登録失敗です。時間を置いて再度試すか管理者まで連絡してください＞＜${C.ADMIN_MAIL}`);
					await next();
				} else {
					const startTime = result.doc.startTime;
					await context.sendActivity(`${startTime}\n出勤登録完了です。おはようございます。今日も一日がんばりましょう！`);
					await next();
				}

			} else if (text === `退勤`) {
				const result = await Business.registEndTime(
					context.activity.from.id,
					context.activity.timestamp,
				)
				if (result.err) {
					await context.sendActivity(`登録失敗です。時間を置いて再度試すか管理者まで連絡してください＞＜${C.ADMIN_MAIL}`);
					await next();
				} else {
					await context.sendActivity(`退勤登録完了です。今日も一日お疲れさまでした♪`);
					await next();
				}
			} else if (text.startsWith('確認')) {
				const groupId = 201909; // TODO 入力値から取得
				const result = await Business.confirmWorkTime(
					context.activity.from.id,
					groupId
				)
				if (result.err) {
					await context.sendActivity(`正しく取得できませんでした.時間をおいて再度お試しください.`);
				} else {
					await context.sendActivity(`確認だよ. \n${result.doc}`);
				}
				await next();

			} else if (text.startsWith('削除')) {
				const result = Business.removeWorkTime(
					context.activity.from.id,
					worktimeId
				);
				if (result.err) {
					await context.sendActivity(`登録失敗です。時間を置いて再度試すか管理者まで連絡してください＞＜${C.ADMIN_MAIL}`);
				} else {
					await context.sendActivity(`削除しました. \n${result}`);
				}
				await next();
			}
		});

		this.onMembersAdded(async (context, next) => {
			const membersAdded = context.activity.membersAdded;
			for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
				if (membersAdded[cnt].id !== context.activity.recipient.id) {
					await context.sendActivity('Hello and welcome!');
				}
			}
			await next();
		});
	}
}

module.exports.MyBot = MyBot;
