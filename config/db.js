const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser:  true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected using ${conn.connection.host} as host`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB