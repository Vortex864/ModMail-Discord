  
const mongoose = require('mongoose')
const config = require('../config.json')

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        }

        mongoose.connect(config.monogdbURI, dbOptions)
        mongoose.set('useFindAndModify', false)
        mongoose.Promise = global.Promise

        mongoose.connection.on('connected', () => {
            console.log('Successfully connected to MongoDB Database!')
        })

        mongoose.connection.on('err', err => {
            console.error(`Error while connecting to MongoDB Database: \n${err.stack}`)
        })

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB Database connection was disconnected!')
        })
    }
}
