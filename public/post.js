const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FinalOfGameSchema = new Schema ({
	final: {
		type: String,
		required:true
	}
},	{ timestamps: true });
const Final = mongoose.model("Final", FinalOfGameSchema)
module.exports = Final