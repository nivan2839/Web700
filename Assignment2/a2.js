/*********************************************************************************
* WEB700 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Nivan Hanjura Student ID: 131732232 Date: 6/6/2024
*
********************************************************************************/
const collegeData = require("./modules/collegeData")
collegeData.initialize().then((data)=>{
    console.log("Success in initialization of data")

}).catch(()=>{
    console.log(`Error : ${data}`)
})

collegeData.getAllStudents().then((data)=>{
    console.log(`Successfully retrieved ${data.length} students`)
}).catch((data)=>{
    console.log(`Error : ${data}`)
})

collegeData.getCourses().then((data)=>{
    console.log(`Successfully retrieved ${data.length} courses`)
}).catch((data)=>{
    console.log(`Error : ${data}`)
})

collegeData.getTAs().then((data)=>{
    console.log(`Successfully retrieved ${data.length} TAs`)
}).catch((data)=>{
    console.log(`Error : ${data}`)
})