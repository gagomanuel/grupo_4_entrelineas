const User = require('../modelo/User');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

   

    if(req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    
    next()
}

module.exports = userLoggedMiddleware;