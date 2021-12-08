const Lead = require('../models/lead')

exports.get_landing = function(req, res, next) {
    res.render('index', { title: 'Express', user:req.user[0].email});
}

exports.post_lead = function(req, res, next) {
    const theEmail = req.body.lead_email
    try{
        let lead = new Lead({
            email: theEmail
        })
        filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(theEmail)){
            lead.save()
            res.redirect ('/leads');
        }
        else{
            res.render('index', { email: 'Not a valid email!' });
        }
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

exports.show_lead = async function(req, res, next) {
    const query = req.params.lead_id;
	return Lead.findById(query).then(leads=>{
        res.render('lead', { title: 'Express', leads: leads });
    })
}

exports.edit_lead = function(req, res, next) {
    const query = req.params.lead_id;
	Lead.findById(query).then(leads=>{
        res.render('lead/edit_lead', {email: leads.email, id: leads.id});
    })
}

exports.post_edit_lead = function(req, res, next) {
    const id = req.params.lead_id
    const email = req.body.lead_email
	const lead = Lead.findById(id)
    lead.updateOne({
        email : email
    }).then(leads=>{
        res.redirect("/leads/" + id);
    })
}

exports.delete_lead = function(req, res, next) {
    const query = req.params;
	Lead.find({ID : query}).deleteOne().then(
        res.redirect("/leads/")
)}

exports.delete_lead_json = function(req, res, next) {
    const query = req.params;
	Lead.find({ID : query}).deleteOne().then(result=>{
        res.send({msg:"Success"})
    })
}