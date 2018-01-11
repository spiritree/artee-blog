import * as config from '../../config'
import * as mongoose from 'mongoose'
const mongoosePaginate = require('mongoose-paginate');
// import mongoose = require('mongoose')

// mongoose.Promise = global.Promise

class mongooseConnect {
	public static connect(): void {
		mongoose.connect(config.MONGODB.uri, { useMongoClient: true })

		mongoose.connection.on('error', error => {
			console.log('数据库连接失败!', error)
		})

		mongoose.connection.once('open', () => {
			console.log('数据库连接成功!')
		})
	}
	public static loadPlugin(): void {
		mongoosePaginate.paginate.options = {
			limit: config.APP.LIMIT
		}
	}
}

export default mongooseConnect
// exports.mongoose = mongoose

// exports.connect = () => {

// 	mongoose.connect(config.MONGODB.uri, { useMongoClient: true})

// 	mongoose.connection.on('error', error => {
// 		console.log('数据库连接失败!', error)
// 	})

// 	mongoose.connection.once('open', () => {
// 		console.log('数据库连接成功!')
// 	})

// 	return mongoose
// }
