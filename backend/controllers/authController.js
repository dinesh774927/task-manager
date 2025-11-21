

const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req,res)=>{
  const {username,password,role} = req.body;
  bcrypt.hash(password,10,(err,hash)=>{
    db.run(`INSERT INTO users(username,password,role) VALUES (?,?,?)`,

    [username,hash,role||'user'], function(err){
      if(err) 
return res.status(400).json({message:'User exists'});
      const token = jwt.sign({id:this.lastID,role:role||'user'},process.env.JWT_SECRET);
      res.json({token,user:{id:this.lastID,username,role:role||'user'}});
    });
  });
};

exports.login = (req,res)=>{
  const {username,password} = req.body;
  db.get(`SELECT * FROM users WHERE username=?`,[username],(err,user)=>{
    if(!user) return res.status(400).json({message:'Invalid'});
    bcrypt.compare(password,user.password,(err,match)=>{
      if(!match) return res.status(400).json({message:'Invalid'});
      const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET);
      res.json({token,user:{id:user.id,username:user.username,role:user.role}});
    });
  });
};
