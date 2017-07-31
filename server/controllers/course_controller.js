const _ = require('lodash');
const {Course} = require('../models/course');
const {ObjectID} = require('mongodb');
module.exports = {

  add(req, res) {
   var body = _.pick(req.body, ['name', 'teacher']);
   var course = new Course(body);

   course.save().then((doc) => {
     res.send(doc);
   }, (e) => {
     res.status(400).send(e);
   });
},
addStudent(req, res){
  var id = req.params.id;
  var body = _.pick(req.body, ['student']);
  Course.findOneAndUpdate({_id: id, 'students': {$ne: body.student}}, {$push: {students: body.student}}, {new: true})
  .then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  })
},
getById(req, res){
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Course.findOne({
    _id: id
  })
  .populate('students')
  .populate('teacher')
  .then((course) => {
    res.send(course);
  }).catch((e) => {
    res.status(400).send(e);
  });
},

delete(req, res){
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Course.findOneAndRemove({
    _id: id
  }).then((course) => {
    if (!course) {
      return res.status(404).send();
    }

    res.send({course});
  }).catch((e) => {
    res.status(400).send();
  });
},

patch(req, res){
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'teacher']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Course.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((course) => {
    if (!course) {
      return res.status(404).send();
    }

    res.send({course});
  }).catch((e) => {
    res.status(400).send();
  })
}

};
