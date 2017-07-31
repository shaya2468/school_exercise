const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({

  grade: {
    type: Number,
    required: [true, 'name is mandatory']
  },
  student: { type: Schema.Types.ObjectId, ref: 'student' },
  course: { type: Schema.Types.ObjectId, ref: 'course' }
});

GradeSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         delete ret._id;
         delete ret.__v;
     }
});

const Grade = mongoose.model('grade', GradeSchema);

module.exports = {Grade};
