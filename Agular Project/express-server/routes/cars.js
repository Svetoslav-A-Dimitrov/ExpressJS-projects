const express = require('express')
const authCheck = require('../middleware/auth-check')
const carsData = require('../data/cars')

const router = new express.Router()

function validateCarForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''


  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.title = 'Title must be more than 3 symbols.'
  }

  if (!payload || typeof payload.imageUrl !== 'string') {
    isFormValid = false
    errors.imageUrl = 'Image must be as url'
  }

  if (!payload || !payload.description || payload.description.length < 10) {
    isFormValid = false
    errors.description = 'Title must be more than 3 symbols.'
  }

  if (!payload || typeof payload.wishes !== 'string' || payload.wishes.length < 3) {
    isFormValid = false
    errors.wishes = 'Wishes must be more than 3 symbol.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const wishlist = req.body
 // wishlist.createdBy = req.user.email

  const validationResult = validateCarForm(wishlist)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  carsData.save(wishlist)

  res.status(200).json({
    success: true,
    message: 'Car added successfuly.',
    wishlist
  })
})

router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  const wishlists = carsData.all(page, search)

  res.status(200).json(wishlists)
})
router.get('/total', (req, res) => {
  const wishlists = carsData.total()

  res.status(200).json(wishlists)
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id

  const car = carsData.findById(id)
  if (!car) {
    return res.status(200).json({
      success: false,
      message: 'Wish does not exists!'
    })
  }

  let response = {
    id,
    createdBy: car.createdBy,
    title: car.title,
    imageUrl: car.imageUrl,
    description: car.description,
    wishes: car.wishes,
    author: car.author
  }

  res.status(200).json(response)
})

router.post('/details/:id/reviews/create', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.name

  const car = carsData.findById(id)

  if (!car) {
    return res.status(200).json({
      success: false,
      message: 'Car does not exists!'
    })
  }

  let rating = req.body.rating
  const comment = req.body.comment

  if (rating) {
    rating = parseInt(rating)
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(200).json({
      success: false,
      message: 'Rating must be between 1 and 5.'
    })
  }

  carsData.addReview(id, rating, comment, user)

  res.status(200).json({
    success: true,
    message: 'Review added successfuly.',
    review: {
      id,
      rating,
      comment,
      user
    }
  })
})

router.post('/details/:id/like', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.email

  const car = carsData.findById(id)

  if (!car) {
    return res.status(200).json({
      success: false,
      message: 'Car does not exists!'
    })
  }

  const result = carsData.like(id, user)

  if (!result) {
    return res.status(200).json({
      success: false,
      message: 'This user has already liked this car!'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Thank you for your like!'
  })
})

router.get('/details/:id/reviews', authCheck, (req, res) => {
  const id = req.params.id

  const car = carsData.findById(id)

  if (!car) {
    return res.status(200).json({
      success: false,
      message: 'Car does not exists!'
    })
  }

  const response = carsData.allReviews(id)

  res.status(200).json(response)
})

router.get('/mine', authCheck, (req, res) => {

  const user = req.user.email


  const cars = carsData.byUser(user)

  res.status(200).json(cars)
})

router.post('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id

  const car = carsData.findById(id)

  if (!car) {
    return res.status(200).json({
      success: false,
      message: 'Car does not exists!'
    })
  }

  carsData.delete(id)

  return res.status(200).json({
    success: true,
    message: 'Car deleted successfully!'
  })
})

module.exports = router
