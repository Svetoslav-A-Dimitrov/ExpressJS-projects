const Hotel = require('../models/Hotel')
const Category = require('../models/Category')

module.exports = {
  addGet: (req, res) => {
    Category.find({}).then(cats =>{
      'use strict'
      res.render('hotels/generateHotel', {cats})
    })

  },
  addPost: (req, res) => {
    let hotelData = req.body
    //Security
    let hotelObj = {
      views:0,
      title: hotelData.title,
      description: hotelData.description,
      image: hotelData.image,
      location: hotelData.location,
      user: req.user._id,
      like: [],
      category: hotelData.type
    }
    //TODO add hotels to the USER
    Hotel.create(hotelObj).then((hotel)=>{
      'use strict'
      res.redirect('/')
    }).catch(err=>{
      'use strict'
      console.log('hotel not added')
      console.log(err)
    })
  },
  list:(req, res) =>{
    'use strict'
    let page = Number(req.query.page)
    let prevPage = page-1
    let nextPage = page+1
    let limit = 2

    Hotel.count({}).then(hotelCount =>{
      let maxPages = Math.ceil(hotelCount/limit)
      if(nextPage > maxPages-1){
        nextPage = maxPages-1
      }
      if(prevPage < 0){
        prevPage = 0
      }

      Hotel.find({})
        .sort('-dateCreation')
        .skip(page*limit)
        .limit(limit)
        .then(hotels=>{

          let pages = {
            prevPage,
            nextPage
          }

          res.render('hotels/hotelList', {hotels, pages})
        })
    })


  },
  details: (req, res)=>{
    'use strict'
    let hotelId = req.query.id

     Hotel.findById(hotelId)
      .populate('comments')
      .then(hotel =>{
        let comments= []
        for(let comment of hotel.comments){
          let newComment ={
            userName: comment.user,
            userComment: comment.comment,
            datePosted: comment.datePosted
          }
          comments.push(newComment)
        }
        let selectedHotel = {
          _id : hotel._id,
          views: hotel.views +1,
          title: hotel.title,
          location: hotel.location,
          image: hotel.image,
          description: hotel.description,
        }
        hotel.views += 1
        hotel.save().then(()=>{
          res.render('hotels/details', {selectedHotel, comments})
        })

      })
  },
  likeDislike:(req, res)=>{
    let hotelId = req.params.id
    let userId = req.user._id

    Hotel.findById(hotelId).then(selectedHotel=>{
      'use strict'
      let index = selectedHotel.like.indexOf(userId)
      if(index>= 0){
        selectedHotel.like.splice(index, 1)
      }
      else {
        selectedHotel.like.push(userId)
      }
      selectedHotel.likes = selectedHotel.like.length
      selectedHotel.save().then(()=>{
        let comments= []
        for(let comment of selectedHotel.comments){
          let newComment ={
            userName: comment.user,
            userComment: comment.comment,
            datePosted: comment.datePosted
          }
          comments.push(newComment)
        }
        res.redirect('back')
      })
    })

  }
}