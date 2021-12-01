exports.get_landing = function(req, res, next) {
    res.render('index', { title: 'Express' });
}

exports.post_landing = function(req, res, next) {
    console.log("Email :", req.body.lead_email);
    res.redirect ('/'); 
} 