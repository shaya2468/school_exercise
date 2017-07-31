const _ = require('lodash');
const {Grade} = require('../models/grade');
const {Course} = require('../models/course');
const {Student} = require('../models/student');
const {ObjectID} = require('mongodb');
module.exports = {

  add(req, res) {
   var tempForDup = _.pick(req.body, ['course', 'student']);

   // this is a temporary hack, for lack of time, because for now, I can't make the two above fields unique
   Grade.findOne(tempForDup)
   .then((grade) => {

     var body = _.pick(req.body, ['course', 'student', 'grade']);
     if (grade){
      return Grade.findOneAndUpdate(tempForDup, {$set: body}, {new: true})
     }

     var grade = new Grade(body);
     return grade.save();

   })
   .then((doc) =>{
     res.send(doc);
   }).catch((e) =>{
     res.status(400).send(e);
   })
 },


 getById(req, res){
   var id = req.params.id;

   if (!ObjectID.isValid(id)) {
     return res.status(404).send();
   }
   Grade.find({
     course: id
   })
   .populate('student')
   .then((grades) => {
     res.send(grades);
   }).catch((e) => {
     res.status(400).send(e);
   });
 },

 delete(req, res){
   var gradeInfo = _.pick(req.body, ['course', 'student']);
   Grade.findOneAndRemove(gradeInfo)
   .then((grade) => {
     console.log('after');
     console.log(grade);
     if (!grade) {
       return res.status(404).send();
     }

     res.send({grade});
   }).catch((e) => {
     res.status(400).send();
   });
 },
 getMaxAverage(req, res){
   var topAverage;
   Grade.aggregate(
        {$group: {_id:
          '$student', average: {$avg: '$grade'}}}
    )
    .sort({ average: -1 })
    .limit(1)

    .then((result) => {
      if (!res){
        res.send({});
      }
      topAverage = result[0].average;
      return Student.findById(result[0]._id);
    })
    .then((result) => {
      res.send({
        id: result._id,
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        average: topAverage
      });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
 },

 easiestCourse(req, res){

   var topAverage;
   Grade.aggregate(
        {$group: {_id:
          '$course', average: {$avg: '$grade'}}}
    )
    .sort({ average: -1 })
    .limit(1)

    .then((result) => {
      if (!res){
        res.send({});
      }
      topAverage = result[0].average;
      return Course.findById(result[0]._id);
    })
    .then((result) => {
      res.send({
        id: result._id,
        name: result.name,
        average: topAverage
      });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
 }

};
