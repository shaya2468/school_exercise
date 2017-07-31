
const UserController = require('../controllers/user_controller');
const StudentsController = require('../controllers/student_controller');
const TeachersController = require('../controllers/teacher_controller');
const CoursesController = require('../controllers/course_controller');
const GradesController = require('../controllers/grade_controller');


var {authenticate} = require('../middleware/authenticate');
module.exports = (app) => {



  // users
  app.post('/users', UserController.create),
  app.post('/users/login', UserController.login),
  app.delete('/users/me/token', authenticate, UserController.deleteToken),
  app.get('/users/me', authenticate, UserController.getMe),

  //students
  app.post('/students', authenticate, StudentsController.add),
  app.get('/students/:id', authenticate, StudentsController.getById),
  app.delete('/students/:id', authenticate, StudentsController.delete),
  app.patch('/students/:id', authenticate, StudentsController.patch),

  //teachers
  app.post('/teachers', authenticate, TeachersController.add),
  app.get('/teachers/:id', authenticate, TeachersController.getById),
  app.delete('/teachers/:id', authenticate, TeachersController.delete),
  app.patch('/teachers/:id', authenticate, TeachersController.patch),

  //courses
  app.post('/courses', authenticate, CoursesController.add),
  app.patch('/courses/students/:id', authenticate, CoursesController.addStudent),
  app.get('/courses/:id', authenticate, CoursesController.getById),
  app.delete('/courses/:id', authenticate, CoursesController.delete),
  app.patch('/courses/:id', authenticate, CoursesController.patch),

  //grades
  app.post('/grades', authenticate, GradesController.add),
  app.delete('/grades', authenticate, GradesController.delete),
  app.get('/grades/:id', authenticate, GradesController.getById),


  //queries
  app.get('/teachers_max/', authenticate, TeachersController.getMaxStudentTeacher),
  app.get('/max_average', authenticate, GradesController.getMaxAverage),
  app.get('/easiest_course', authenticate, GradesController.easiestCourse)
};
