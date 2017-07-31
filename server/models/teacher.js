const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const TeacherSchema = new Schema({

  email: {
    type: String,
    required: [true, 'email  is mandatory'],
    unique: true,
    dropDups: true
  },
  first_name: {
    type: String,
    required: [true, 'first name is mandatory']
  },
  last_name: {
    type: String,
    required: [true, 'last name is mandatory']
  }
});

TeacherSchema.plugin(uniqueValidator);

TeacherSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = {Teacher};
