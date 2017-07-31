const _ = require('lodash');
const {Student} = require('../models/student');
const {ObjectID} = require('mongodb');
module.exports = {

  add(req, res) {
   var body = _.pick(req.body, ['email', 'first_name', 'last_name']);
   var student = new Student(body);

   student.save().then((doc) => {
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
  Student.findOne({
    _id: id
  })
  .then((student) => {
    res.send(student);
  }).catch((e) => {
    res.status(400).send(e);
  });
},

delete(req, res){
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Student.findOneAndRemove({
    _id: id
  }).then((student) => {
    if (!student) {
      return res.status(404).send();
    }

    res.send({student});
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

  Student.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((student) => {
    if (!student) {
      return res.status(404).send();
    }

    res.send({student});
  }).catch((e) => {
    res.status(400).send();
  })
}

};
