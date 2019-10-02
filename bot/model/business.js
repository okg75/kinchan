//
//  勤務報告独自の仕様を定義する
//

const BUtils = require('../util/businessUtils.js');
const Mongo = require('./mongo.js');

/**
 * 出勤
 */
exports.registStartTime = async function (userId, timestamp) {

	const workTimeId = BUtils.generateWorkTimeId(timestamp);
	const data = {
		workTimeId: workTimeId,
		startTime: timestamp,
		userId: userId,
	}
	const workTime = await Mongo.upsert(data);
	return {
		err: null,
		doc: workTime,
	};
}

/**
 * 退勤
 */
exports.registEndTime = async function (userId, timestamp) {
	const workTimeId = BUtils.generateWorkTimeId(timestamp);
	const data = {
		workTimeId: workTimeId,
		endTime: timestamp,
		user: userId,
	}
	const workTime = await Mongo.upsert(data);
	return {
		err: null,
		doc: workTime,
	}
}

/**
 * 月の勤務状況確認
 */
exports.confirmWorkTime = async function (userId, groupId) {
	const result = await Mongo.findByGroupId(userId, groupId);
	console.log(`userId: ${userId}, groupId: ${groupId}, result: ${result}`);
	return {
		err: null,
		doc: result,
	}
}

/**
 * 指定日の勤務時間を削除する
 */
exports.removeWorkTime = async function (userId, year, month, day) {
	// TODO:ロジックまだ作っていません
	return false;
}

exports.generateNextMonthRecords = async function (year, month) {
	// TODO: 固定値を設定しているのでロジック作る
	// 現在日時を取得する
	const groupId = BUtils.generateWorkTimeGroupId(year, month);
	const range = BUtils.getWorkDateRange(year, month);
	const lastDayOfMonth = BUtils.getLastDay(year, month);
	// 指定された月の1ヶ月分のworkTimeIdの配列を作成する.
	var workTimeIdList = [];
}






