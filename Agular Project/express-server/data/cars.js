const cars = {1 : {
  id: 1, createdBy:"Ivan", title:"Tesla S", author:"Ivan",
  imageUrl: "https://buyersguide.caranddriver.com/media/assets/submodel/7651.jpg",
  description:`Lightweight aluminum body reinforced with high strength, boron steel elements
   UV and infrared blocking safety glass windshield
   Frameless, tempered safety glass front windows
  Solar absorbing, laminated safety glass rear window with defroster
  Flush mounted door handles
  Power folding, heated side mirrors with memory
  19" aluminum alloy wheels with all-season tires
  Glass roof
  LED fog lights
  Three-position dynamic LED turning lights
  LED daytime running lights
  Backlit side turn signals, front side marker lights and rear reflex lights
  LED rear taillights and high-mounted LED stop lamp`,
  wishes: 'I wish to be in red'}}
let currentId = 1

module.exports = {
  total: () => Object.keys(cars).length,
  save: (wishlist) => {
    const id = ++currentId
    wishlist.id = id

    let newCar = {
      id,
      createdBy: wishlist.createdBy,
      title: wishlist.title,
      author: wishlist.author,
      imageUrl: wishlist.imageUrl,
      description: wishlist.description,
      wishes: wishlist.wishes,
    }


    cars[id] = newCar
  },
  all: (page, search) => {
    const pageSize = 2

    let startIndex = (page - 1) * pageSize
    let endIndex = startIndex + pageSize

    return Object
      .keys(cars)
      .map(key => cars[key])
      .filter(car => {
        if (!search) {
          return true
        }

        const carMake = car.make.toLowerCase()
        const carModel = car.model.toLowerCase()
        const searchTerm = search.toLowerCase()

        return carModel.indexOf(searchTerm) >= 0 ||
          carMake.indexOf(searchTerm) >= 0
      })
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex)
  },
  total: () => {
    return Object.keys(cars).length

  },
  findById: (id) => {
    return cars[id]
  },
  // addReview: (id, rating, comment, user) => {
  //   const review = {
  //     rating,
  //     comment,
  //     user,
  //     createdOn: new Date()
  //   }
  //
  //   cars[id].reviews.push(review)
  // },
  // allReviews: (id) => {
  //   return cars[id]
  //     .reviews
  //     .sort((a, b) => b.createdOn - a.createdOn)
  //     .slice(0)
  // },
  like: (id, user) => {
    const likes = cars[id].likes

    if (likes.indexOf(user) >= 0) {
      return false
    }

    likes.push(user)

    return true
  },
  byUser: (user) => {
    return Object
      .keys(cars)
      .map(key => cars[key])
      .filter(car => car.createdBy === user)
      .sort((a, b) => b.id - a.id)
  },
  delete: (id) => {
    delete cars[id]
  }
}
