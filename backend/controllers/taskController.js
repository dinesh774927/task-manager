
const db = require('../models');

const baseSelect = `SELECT tasks.*, users.username as createdByName FROM tasks 
  JOIN users ON users.id = tasks.createdBy`;

exports.getTasks = (req,res)=>{
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 10));
  const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);
  const whereClause = req.user.role==='admin' ? '' : ' WHERE tasks.createdBy=?';
  const params = req.user.role==='admin' ? [] : [req.user.id];
  const countSql = `SELECT COUNT(*) as total FROM tasks${whereClause.replace('tasks.', '')}`;
  db.get(countSql, params, (countErr, countRow)=>{
    if(countErr) 
return res.status(500).json({message:'DB error'});
    const dataSql = `${baseSelect}${whereClause} ORDER BY tasks.createdAt DESC LIMIT ? OFFSET ?`;
    db.all(dataSql,[...params, limit, offset],(err,rows)=>{
      if(err) return res.status(500).json({message:'DB error'});
      res.json({tasks: rows, total: countRow?.total || 0});
    });
  });
};

exports.getTask = (req,res)=>{
  const id = req.params.id;
  db.get(`${baseSelect} WHERE tasks.id=?`,[id],(err,row)=>{
    if(err || !row) return res.status(404).json({message:'Not found'});
    if(req.user.role!=='admin' && row.createdBy !== req.user.id) return res.status(403).json({message:'Forbidden'});
    res.json(row);
  });
};

exports.createTask = (req,res)=>{
  const {title,description,status} = req.body;
  db.run(`INSERT INTO tasks(title,description,status,createdBy) VALUES(?,?,?,?)`,

  [title,description,status||'pending',req.user.id], function(err){
    if(err) return res.status(400).json({message:'Err'});
    db.get(`${baseSelect} WHERE tasks.id=?`,[this.lastID], (e,row)=> res.json(row));
  });
};

exports.updateTask = (req,res)=>{
  const id = req.params.id;
  const {title,description,status} = req.body;
  db.get(`SELECT * FROM tasks WHERE id=?`,[id],(err,row)=>{
    if(err || !row) return res.status(404).json({message:'Not found'});
    if(row.createdBy !== req.user.id) return res.status(403).json({message:'Forbidden'});
    db.run(`UPDATE tasks SET title=?,description=?,status=? WHERE id=?`,[title,description,status,id], function(err){
      if(err) return res.status(500).json({message:'Err'});
      db.get(`${baseSelect} WHERE tasks.id=?`,[id],(e,r)=> res.json(r));
    });
  });
};

exports.deleteTask = (req,res)=>{
  const id = req.params.id;
  db.get(`SELECT * FROM tasks WHERE id=?`,[id],(err,row)=>{
    if(err || !row) return res.status(404).json({message:'Not found'});
    if(req.user.role!=='admin' && row.createdBy !== req.user.id) return res.status(403).json({message:'Forbidden'});
    db.run(`DELETE FROM tasks WHERE id=?`,[id],function(err){
      if(err) return res.status(500).json({message:'Err'});
      res.json({message:'deleted'});
    });
  });
};
