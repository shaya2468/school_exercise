const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const StudentSchema = new Schema({

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

StudentSchema.plugin(uniqueValidator);

StudentSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

const Student = mongoose.model('student', StudentSchema);

module.exports = {Student};
