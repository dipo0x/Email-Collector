const Lead = require('../models/lead');
const redis = require('redis');

/////////REDIS
const client = redis.createClient()
client.connect()
client.on('connect', () => {
    console.log('Redis connected');
});
const DEFAULT_EXPIRATION = 120
/////////REDIS END

exports.get_landing = async function(req, res, next) {
    res.render('index', { title: 'Express', user:req.user});
}

exports.get_lead = async function(req, res, LeadEmail) {
    res.render('index', { title: 'Express', user:req.user});
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
            client.hSet(lead.id, [
                'email', theEmail
            ]).then(()=>{
                res.redirect ('/leads');
            }) 
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

exports.show_lead = async function(req, res, next){
    client.HGETALL(req.params.lead_id).then(obj => {
        if (!obj.email){
            Lead.findById(req.params.lead_id).then(leads=>{
            client.hSet(req.params.lead_id, [
                'email', leads.email
            ]).then(()=>{
                res.render('lead', {leads: leads, id: req.params.lead_id});
            })})
        }else{
            res.render('lead', {leads: obj, id: req.params.lead_id});
        }}
    )}   

exports.edit_lead = async function(req, res, next) {
    client.HGETALL(req.params.lead_id).then(obj => {
        if(!obj){
            Lead.findById(req.params.id).then(leads=>{
                res.render('lead/edit_lead', {email: leads.email, id: req.params.lead_id});
            })
        }else{
            res.render('lead/edit_lead', {email: obj.email, lead_id: req.params.lead_id});
        }
    })
}

exports.post_edit_lead = function(req, res, next) {
    const id = req.params.lead_id
    const email = req.body.lead_email
	const lead = Lead.findById(id)
    client.hSet(id, [
        'email', email
    ]).then(()=>{
        lead.updateOne({
            email : email
        }).then(leads=>{
            res.redirect("/leads/" + id);
        })
    })}

exports.delete_lead = function(req, res, next) {
    const query = req.params.lead_id;
	Lead.find({ID : query}).deleteOne().then(()=>{
        client.del(query).then(()=>{
            res.redirect("/leads/")
        })
    })
}

exports.delete_lead_json = function(req, res, next) {
    const query = req.params;
	Lead.find({ID : query}).deleteOne().then(result=>{
        res.send({msg:"Success"})
    })
}