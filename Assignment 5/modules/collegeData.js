const fs = require("fs");

class Data{
    constructor(students, courses){
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/courses.json','utf8', (err, courseData) => {
            if (err) {
                reject("unable to load courses"); return;
            }

            fs.readFile('./data/students.json','utf8', (err, studentData) => {
                if (err) {
                    reject("unable to load students"); return;
                }

                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                resolve();
            });
        });
    });
}

module.exports.getAllStudents = function(){
    return new Promise((resolve,reject)=>{
        if (dataCollection.students.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(dataCollection.students);
    })
}

module.exports.getTAs = function () {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].TA == true) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredStudents);
    });
};

module.exports.getCourses = function(){
   return new Promise((resolve,reject)=>{
    if (dataCollection.courses.length == 0) {
        reject("query returned 0 results"); return;
    }

    resolve(dataCollection.courses);
   });
};

module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundStudent = null;

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].studentNum == num) {
                foundStudent = dataCollection.students[i];
            }
        }

        if (!foundStudent) {
            reject("query returned 0 results"); return;
        }

        resolve(foundStudent);
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].course == course) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredStudents);
    });
};
module.exports.addStudent = function(studentData) {
    return new Promise((resolve, reject) => {
        console.log('Student Data',studentData);
        studentData.TA = studentData.TA !== undefined;
        studentData.studentNum = dataCollection.students.length + 1;
        dataCollection.students.push(studentData);
        
        fs.writeFile(studentPath, JSON.stringify(dataCollection.students, null, 2), (err) => {
            if (err) {
                console.log('Error',err);
                reject(err);
            } else {
                resolve();
            }
        });
    });

};

module.exports.getCourseById = function(CourseID){
    return new Promise(function (resolve, reject) {
        var courseFound = null;
        console.log(dataCollection.courses)
        for (let i = 0; i < dataCollection.courses.length; i++) {
            if (dataCollection.courses[i].courseId == CourseID) {
                courseFound = dataCollection.courses[i]
            }
        }
        if (!courseFound) {
            reject("query returned 0 results"); return;
        }

        resolve(courseFound);
    });
}


module.exports.updateStudent = function(studentData){
    return new Promise(function (resolve, reject) {
        var studentTochange = null;
        studentTochange = dataCollection.students.find(student => student.studentNum === studentData.studenNum)
        if (!studentTochange) {
            reject("query returned 0 results"); return;
        }
        else {
            fs.writeFile('./data/students.json', JSON.stringify(dataCollection), (err) => {
                if(err){
                    reject(err)
                }
                else {
                    resolve
                }
            }
        )
        }

    });
}
