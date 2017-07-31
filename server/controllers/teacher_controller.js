const _ = require('lodash');
const {Teacher} = require('../models/teacher');
const {Course} = require('../models/course');
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

getMaxStudentTeacher(req, res){
  var numberOfStudents;
  Course.aggregate(
   {$group: { _id:'$teacher',  number_of_students: {$sum: {$size: '$students'}}}})
   .sort({ number_of_students: -1 })
   .limit(1)
   .then((teachers) => {
      if (!teachers){
        res.send({});
      }
      numberOfStudents = teachers[0].number_of_students;
      return Teacher.findById(teachers[0]._id);
    })
    .then((result) => {
      res.send({
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        number_of_students: numberOfStudents
      });
    })
    .catch((e) => {
      console.log(e);
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
