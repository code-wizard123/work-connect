const { Router } = require('express');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Client = require('../models/client')
const router = Router();

const createToken = (id) => {
  return jwt.sign({ id }, 'apna secret', {
    expiresIn: 3 * 24 * 60 * 60
  });
};

router.post('/signup2',async(req,res) =>{
    const salt = await bcrypt.genSalt(12)
    pass = req.body.password
    const hashp = await bcrypt.hash(pass, salt);
    try{
        const newClient = new Client({
            cusername : req.body.username,
            cemail : req.body.email,
            cpassword : hashp
        })
        await newClient.save()
        res.redirect('/')
    }
    catch(err){
        res.send(err)
    }
})

router.post('/login2', async(req,res) =>{
    const user  = await Client.findOne({cusername : req.body.username})
    if(user)
    {
        const match = await bcrypt.compare(req.body.password,user.cpassword)
        if(match)
        {
            const token = createToken(user._id)
            res.cookie('jwt', token, {maxage : 3 * 24 * 60 * 60 * 1000 })
            res.redirect('/welcome2')
        }
        else{
            res.redirect('/login2')
        }
    }
    else{
        res.send("Aap exist nhi karte")
    }
})

module.exports = router;