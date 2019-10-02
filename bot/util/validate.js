/** Validation */

/**
 * @param {String} str 入力された文字列
 */
exports.startWork = (str) => {

	return true;
}
/**
 * 勤務時間の入力チェックを行う.
 * フォーマット yyyy/MM/dd HH:mm
 * @param {String} str 
 */
exports.workingHours = (str) => {
	if (!str) {
		// 文字列がnullです
		return false;
	}
	return true;
}

