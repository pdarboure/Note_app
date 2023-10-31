const mongoose = require("mongoose")

const {NOTES_APP_MONGODB_HOST,  NOTES_APP_MONGODB_DATABASE} = process.env
const mongodv_uri =`mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`

mongoose.connect(mongodv_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}) 


.then(db=>console.log(`database esta conectada loco`))
.catch(err=>console.log(err))