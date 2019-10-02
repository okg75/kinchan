const C = require('../config/const.js')

/**
 * 指定された月の範囲を取得する
 * @param {Number} year 年
 * @param {Number} month 月
 */
exports.getWorkDateIdRange = function (year, month) {

	// 開始日の作成
	const startDate = new Date(year, month, C.START_DATE);
	const startWorkTimeId = generateWorkTimeId(startDate);
	// 終了日の作成(monthが13になった場合は年が調整されて次の年になる)
	const endDate = new Date(year, month + 1);
	endDate.setDate(C.START_DATE - 1);
	const endWorkTimeId = generateWorkTimeId(endDate);

	console.log(`startDate: ${endWorkTimeId}, endDate: ${endWorkTimeId}`);
	return {
		startWorkTimeId: startWorkTimeId,
		endWorkTimeId: endWorkTimeId,
	};
}

/**
 * 勤怠管理IDを作成する　フォーマットは{ユーザID}_{yyyyMMdd}
 * @param {Date} datetime 
 */
exports.generateWorkTimeId = (datetime) => {
	// データが不正な場合はnullを返却
	if (!datetime) {
		return null;
	}
	const padMonth = `${datetime.getMonth() + 1}`.padStart(2, '0');
	const padDate = `${datetime.getDate()}`.padStart(2, '0');
	return `${datetime.getFullYear()}${padMonth}${padDate}`;
};

/**
 * 月の最終日を取得する.
 */
exports.getLastDay = function (year, month) {
	// dateの引数に0を指定することで前月の最終日を取得することができる.
	const date = new Date(year, month + 1, 0);
	return date.getDate();
}

/**
 * 指定された年月日を用いて月の勤務時間グループIDを作成する.
 * 2019, 2 → 201902
 */
exports.generateWorkTimeGroupId = function (year, month) {
	// 月はゼロ埋めする
	const padMonth = `${month}`.padStart(2, '0');
	return `${year}${padMonth}`;
}

/**
 * １ヶ月分の勤怠情報を出力するための文字列を作成する.
 * 引数のworkTimeListは日付でソートされて渡される前提とする.
 */
exports.createWorkTimeList = function (workTimeList) {

	var workTimeList = "勤務開始	勤務終了";
	for (var workTime in workTimeList) {

		if (workTime.startDate) {
			line += workTime.startDate
		}
	}
	return workTimeList;
}