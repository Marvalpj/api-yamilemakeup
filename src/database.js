const mongoose = require('mongoose')

// mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/yamileMakeUp' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(
        db => console.log('database is connected')
    )
  