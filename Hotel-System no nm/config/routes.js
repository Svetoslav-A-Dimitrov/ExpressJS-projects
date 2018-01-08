const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);

    app.get('/loginRegister', controllers.user.loginRegisterView)

    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);

    app.post('/logout', controllers.user.logout);

    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/addHotel', controllers.hotel.addGet)
    app.post('/addHotel', controllers.hotel.addPost)
    app.get('/list', controllers.hotel.list)
    app.get('/details',controllers.hotel.details);

    app.post('/comment/:hotelId',restrictedPages.isAuthed,controllers.comment.createComment);

    app.get('/profile/:userName', restrictedPages.isAuthed, controllers.user.getProfile);
    app.get('/like/:id', controllers.hotel.likeDislike);

    app.get('/addCategories', controllers.category.getView)
    app.post('/addCategory', controllers.category.createCategory
    )

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};