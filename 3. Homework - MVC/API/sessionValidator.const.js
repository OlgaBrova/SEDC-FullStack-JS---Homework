const validateSession = (req, res, next) => {

    if (req.session.authenticated) {
        next();
    } else {
        res.status(400).json({
            message: 'Error! You are not authenticated!'
        })
        console.log('Error! You are not authenticated!');
    }
}

module.exports = validateSession;