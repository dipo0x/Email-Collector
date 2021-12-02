const Lead = require('../models/lead')

exports.get_landing = function(req, res, next) {
    res.render('index', { title: 'Express' });
}

exports.post_lead = function(req, res, next) {
    try{
        let author = new Lead({
            email: req.body.lead_email
        })
        author.save()
        res.redirect ('/');
    }
    catch(err){
        console.log(err)
    }
} 