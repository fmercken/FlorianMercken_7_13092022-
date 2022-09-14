const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  dateCreate: {type: Date, required: true},
  dateLastUpdate: {type: Date, required: true}
})

module.exports = mongoose.model('Post', postSchema)