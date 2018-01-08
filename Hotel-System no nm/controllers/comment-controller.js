/**
 * Created by sve on 19.10.2017 г..
 */
const Hotel = require('../models/Hotel')
const Comment = require('../models/Comment')

module.exports = {
  createComment: (req, res) => {
    let commentData = req.body
    let hotelId = req.params.hotelId
    let commentObj = {
      title: commentData.title,
      comment: commentData.comment,
      hotel: hotelId,
      user: req.user.username,
    }

    Comment.create(commentObj).then((comment =>{
      'use strict'
      Hotel.findById(hotelId).then(hotel=>{
        hotel.comments.push(comment._id)
        hotel.save().then(()=>{
          res.redirect('/details?id=' + hotelId)
        })
      })
    }))
  },
};