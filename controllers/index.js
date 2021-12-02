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
        res.redirect ('/leads');
    }
    catch(err){
        console.log(err)
    }
} 

exports.leads = function(req, res, next) {
    Lead.find().then(leads=>{
        res.render('index', { title: 'Express', leads: leads });
    })
}

exports.show_lead = function(req, res, next) {
    const query = req.params
	Lead.findOne(query).then(leads=>{
        res.render('lead', { title: 'Express', leads: leads });
    })
}
