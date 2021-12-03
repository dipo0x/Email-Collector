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
    const query = req.params;
	Lead.findOne(query).then(leads=>{
        res.render('lead', { title: 'Express', leads: leads });
    })
}

exports.edit_lead = function(req, res, next) {
    const query = req.params;
	Lead.findOne(query).then(leads=>{
        res.render('lead/edit_lead');
    })
}

exports.post_edit_lead = function(req, res, next) {
    const id = req.params.lead_id
    const email = req.params.lead_email

	const lead = Lead.findOne(query)
    lead.email = email
    lead.email.save().then(leads=>{
        res.redirect("/leads/" + id, { title: 'Saved', leads: leads });
    })
}
