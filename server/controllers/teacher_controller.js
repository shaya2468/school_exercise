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

  Course.find()
  .populate('teacher')
  .then((courses) => {


    var teachers = [];
    var current_max = null;
    var updateTeachersCount = (temp_teacher, count) => {
      var wasFound = false;
      teachers.forEach((teacher) => {
        if (teacher.current_teacher._id === temp_teacher._id){
            teacher.count = teacher.count + count;
            wasFound = true;
            if ((!current_max) || teacher.count > current_max.count){
              current_max = teacher;
            }
        }
      })
      if (!wasFound){
        var teacherNew = {
          current_teacher: temp_teacher,
          count
        }
        teachers.push(teacherNew)

        if ((!current_max) || teacherNew.count > current_max.count){
          current_max = teacherNew;
        }
      }
    }

    courses.forEach((course) => {
      updateTeachersCount(course.teacher, course.students.length);
    })

    res.send(current_max);
  }).catch((e) => {
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
