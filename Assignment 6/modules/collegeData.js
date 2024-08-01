const Sequelize = require('sequelize');
var sequelize = new Sequelize('assignment6', 'assignment6_owner', 'Gudf6Jx8rDRB', {
dialectModule: require('pg'),
host: 'ep-lingering-mountain-a5hjg1iy.us-east-2.aws.neon.tech',
dialect: 'postgres',
port: 5432,
dialectOptions: {
ssl: { rejectUnauthorized: false }
},
query:{ raw: true }
})


var Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
});

var Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
});

Course.hasMany(Student, { foreignKey: 'course' });

module.exports.initialize = async function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync()
        .then(() => resolve("Connected to Database"))
        .catch((err) => reject("Unable to sync the database:", err));
    })
}

module.exports.getAllStudents = function(){
    return new Promise((resolve,reject)=>{
        Student.findAll().then(data => resolve(data)).catch((value) => reject(value)) 
    })
}

module.exports.getTAs = function () {
    return new Promise(function (resolve, reject) {
        Student.findAll({where : {TA: true}}).then((data)=>resolve(data)).catch((data)=>reject(data))
    });
};

module.exports.getCourses = function(){
   return new Promise((resolve,reject)=>{
    Course.findAll().then(data => resolve(data)).catch((value) => reject(value)) 
   })
};

module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Student.findAll({where : {studenNum :  { type: num}}}).then((data) => resolve(data)).catch((data) => reject(data))

    });
};

module.exports.getStudentsByCourse = function (courseFiltered) {
    return new Promise(function (resolve, reject) {
        Student.findAll({where : {course: courseFiltered}}).then((data)=>resolve(data)).catch((data)=>reject(data))
    });
};
module.exports.addStudent = function(courseData) {
    return new Promise((resolve, reject) => {
        studentData.TA = studentData.TA ? true : false;
        for (let property in studentData) {
            if (studentData[property] === "") {
                studentData[property] = null;
            }
        }
        Student.create(studentData)
            .then(() => {
                resolve("Student created");
            })
            .catch(err => {
                reject("unable to create student: " + err);
            });
    });

};
module.exports.addCourse = function(studentData) {
    return new Promise((resolve, reject) => {
        for (let property in courseData) {
            if (courseData[property] === "") {
                studentData[property] = null;
            }
        }
        Course.create(courseData)
            .then(() => {
                resolve("Course created");
            })
            .catch(err => {
                reject("unable to create course: " + err);
            });
    });

};

module.exports.updateCourse = function(courseData){
    return new Promise(function (resolve, reject) {
        let courseToUpdate = null
        Course.findAll({where : {courseId: courseData.courseId}}).then((data)=>courseToUpdate = data).catch((data)=>reject(data))
        courseToUpdate = courseData
        Course.update({where : {courseId: courseData.courseId}}).then((data)=> resolve("Student Updated")).catch((data) => reject("Student not updated"))

    });
}


module.exports.getCourseById = function(CourseID){
    return new Promise(function (resolve, reject) {
        Course.findAll({where : {courseID: {type : CourseID}}}).then((data)=>resolve(data)).catch((data)=>reject(data))
    });
}
module.exports.deleteStudent = (studenNum) => {
    return new Promise((resolve, reject) => {
        Student.destroy({ where: { studentNum: studenNum }})
            .then(() => resolve("Student deleteda"))
            .catch(err => reject("Unable to delete Student"));
    });
};
module.exports.deleteCourseByID = (courseid) => {
    return new Promise((resolve, reject) => {
        Course.destroy({ where: { courseID: {type : courseid }}})
            .then(() => resolve("Student deleteda"))
            .catch(err => reject("Unable to delete Student"));
    });
};

module.exports.updateStudent = function(studentData){
    return new Promise(function (resolve, reject) {
        let studentToChange = null
        Student.findAll({where : {studenNum: {type : studentData.num}}}).then((data)=>studentToChange = data).catch((data)=>reject(data))
        studentToChange = studentData
        Student.update({where : {studenNum : {type : studentData.num}}}).then((data)=> resolve("Student Updated")).catch((data) => reject("Student not updated"))

    });
}


