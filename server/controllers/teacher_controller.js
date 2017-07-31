const _ = require('lodash');
const {Teacher} = require('../models/teacher');
const {ObjectID} = require('mongodb');
module.exports = {

  add(req, res) {
   var body = _.pick(req.body, ['email', 'first_name', 'last_name']);
   var teacher = new Teacher(body);

   teacher.save().then((doc) => {
     res.send(doc);
   }, (e) => {
     res.status(400).send(e);
   });
},

getById(req, res){
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Teacher.findOne({
    _id: id
  })
  .then((teacher) => {
    res.send(teacher);
  }).catch((e) => {
    res.status(400).send(e);
  });
},

delete(req, res){
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Teacher.findOneAndRemove({
    _id: id
  }).then((teacher) => {
    if (!teacher) {
      return res.status(404).send();
    }

    res.send({teacher});
  }).catch((e) => {
    res.status(400).send();
  });
},

patch(req, res){
  var id = req.params.id;
  var body = _.pick(req.body, ['first_name', 'last_name']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Teacher.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((teacher) => {
    if (!teacher) {
      return res.status(404).send();
    }

    res.send({teacher});
  }).catch((e) => {
    res.status(400).send();
  })
}

};
