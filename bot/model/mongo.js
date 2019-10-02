const mongoose = require('mongoose');
const C = require('../config/const.js');

// MongoDBに接続
mongoose.connect(C.MONGO_URL, { useNewUrlParser: true });
console.log(`MONGO_URL: ${C.MONGO_URL}`);
// depricatedの警告が出るのでこのオプションが必要
// https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set({ 'useFindAndModify': false });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('MongoDB connection success!');
});

/** WorkTimeの定義 */
var workTimeScheme = new mongoose.Schema({
	groupId: String, // 勤務報告グループID（yyyyMM）: 2019年8月度 → 201908
	workTimeId: Number, // 勤務報告ID（yyyyMMdd）
	startTime: Date, // 出勤時刻
	endTime: Date,　// 退勤時刻
	code: Number, // 勤務コード
	overtimeMemo: Number, // 残業時間
	userId: String, // SkypeのユーザID
	createTime: Date, // データ作成日時
	updateTime: Date, // データ更新日時
});
const WorkTimes = mongoose.model('worktimes', workTimeScheme);

/** Usersの定義 */
var usersScheme = new mongoose.Schema({
	id: String, // ID
	staffId: String, // 社員番号
	skypeId: String, // SkypeID
});
const Users = mongoose.model('users', usersScheme);

// ==============================================================
// worktimes 操作ロジック
// ==============================================================

/**
 * 日付更新
 */
exports.upsert = async function (data) {
	if (data.workTimeId == null) {
		return null;
	}
	const query = {
		'workTimeId': data.workTimeId,
		'userId': data.userId,
	}
	const options = {
		'upsert': true,
	}
	return WorkTimes.findOneAndUpdate(query, data, options).exec();
}

/**
 * 勤務時間を日付で検索する
 */
exports.findByGroupId = async function (userId, groupId) {
	const condition = {
		'userId': userId,
		'groupId': groupId
	};
	return WorkTimes.find(condition).exec();
}

/**
 * 勤務日付IDで検索する
 */
exports.findByWorkTimeId = async function (userId, workTimeId) {
	const condition = {
		'userId': userId,
		'workTimeId': workTimeId
	};
	return WorkTimes.findOne(condition).exec();
}

/**
 *　指定された勤務時間を取得する
 */
exports.find = async function (groupId, userId) {
	const condition = {
		'groupId': groupId,
		'userId': userId,
	}
	return WorkTimes.
		find(condition)
		.sort({ workTimeId: 1 })
		.exec();
}
