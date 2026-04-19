module.exports = (req, res, next) => {
    const token = req.session?.adminToken;
    if (token && token === process.env.ADMIN_TOKEN) return next();
    res.redirect('/404');
};
