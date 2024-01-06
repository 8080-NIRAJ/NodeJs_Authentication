// create a middleware to set flesh messages in response locals object.
export const displayFlash = (req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    };
    next();
};