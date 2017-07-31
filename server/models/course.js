const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const CourseSchema = new Schema({

  name: {
    type: String,
    required: [true, 'name is mandatory'],
    unique: true,
    dropDups: true
  },
  teacher: { type: Schema.Types.ObjectId, ref: 'teacher' },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'student'
  }]
});

CourseSchema.plugin(uniqueValidator);

CourseSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

const Course = mongoose.model('course', CourseSchema);

module.exports = {Course};
