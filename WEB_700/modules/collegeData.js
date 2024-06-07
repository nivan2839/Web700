const fs = require('node:fs');
const path = require('node:path'); 
class Data {
    constructor(students, courses){
        this.students = students
        this.courses = courses
    }
}

let dataCollection = null

function initialize(){
    let studentsData = ""
    let coursesData = ""
    try {
        studentsData = fs.readFileSync(path.join(__dirname, '..', 'data', 'students.json') ,'utf-8')
        console.log("Students data successfully retireved and the length is " + `${studentsData.length}`)
        console.log(studentsData)
    }
    catch {
        console.log("Cant read from students.json file")
    }
    try {
        coursesData = fs.readFileSync(path.join(__dirname, '..', 'data', 'courses.json') ,'utf-8')
        console.log("Courses data successfully retireved and the length is " + `${coursesData.length}`)
        console.log(coursesData)

    }
    catch{
        console.log("Cant read from courses.json file")
    }
    let p1 = new Promise((resolve, reject) => {
        const students = JSON.parse(studentsData)
        const courses = JSON.parse(coursesData)
        dataCollection = new Data(students, courses)
        if(students != null && courses!= null){
            resolve("Data successfully parsed")
        }
        else {
            reject("Data empty!")
        }
    });
   
    return p1;
}

function getAllStudents(){
    let p2 = new Promise((resolve, reject)=>{
        if(dataCollection.students.length >  0){
            resolve(dataCollection.students)
        }
        else {
            reject("No students found")
        }

    })
    return p2;
}

function getTAs(){
    let p3 = new Promise((resolve, reject)=> {
        let studentsWithTA = dataCollection.students.filter(studentWithTA => studentWithTA.TA === true)
        if(studentsWithTA.length > 0){
            resolve(studentsWithTA)
        }
        else {
            reject("No students found")
        }   
    })
    return p3;
}

function getCourses(){
    let p4 = new Promise((resolve, reject)=>{
        if(dataCollection.courses.length > 0) {
            resolve(dataCollection.courses)
        }
        else {
            reject("No courses found")
        }
    })
    return p4;
}
module.exports = { initialize, getAllStudents, getTAs, getCourses };