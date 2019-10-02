/**
 *  MongoDB設定
 */

// 接続先
// TODO: この方式だとうまくいかないので調査
// exports.MONGO_URL = `mongodb://${process.env.MongoUserName}:${process.env.MongoPassword}@mongo:27017/kinchan`;
exports.MONGO_URL = `mongodb://{dbname}:{password}@mongo:27017/kinchan`;

/**
 *  業務ロジック用定数
 */
// 開始日
exports.START_DATE = 11;

/**
 *  その他
 */
// 管理者のメールアドレス
exports.ADMIN_MAIL = `adminmail@example.com`;
