'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models/todos')


// write your routes here. Feel free to split into multiple files if you like.
router.get('/', function(req,res,next){
  res.send(db.listPeople());
})

router.get('/:name/tasks', (req,res,next)=>{
  if (db.listPeople().indexOf(req.params.name) === -1){
    return res.sendStatus(404);
  }

  if (Object.keys(req.query).length !== 0){
    var output = [];
    var qryReq = req.query.status;
    var taskArr = db.list(req.params.name);
    if (taskArr.length)
    for (var i = 0; i < taskArr.length; i++){
      if (qryReq === 'complete' && taskArr[i].complete){
        output.push(taskArr[i]);
      }else if (!taskArr[i].complete && qryReq === 'active'){
        output.push(taskArr[i]);
      }
    }
    res.send(output);
  }else{
   res.send(db.list(req.params.name));
  }
})

router.post('/:name/tasks', (req,res,next)=>{

  for (var key in req.body){
    if (key !== 'content' && key !== 'complete'){
      return res.sendStatus(400);
    }
  }
  db.add(req.params.name, req.body)
  var lastId = db.list(req.params.name).length - 1;
  res.status(201).send(db.list(req.params.name)[lastId]);

})

router.put('/:name/tasks/:index', (req,res,next)=>{
  const id = req.params.index*1;
  db.complete(req.params.name, id);
  res.send(db.list(req.params.name)[id].complete);
})

router.delete('/:name/tasks/:index', (req,res,next)=>{
  const id = req.params.index*1;
  db.remove(req.params.name, id);
  res.status(204).send();
})

module.exports = router;
