/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Nivan Hanjura Student ID: 131732232 Date: 6/14/2024
*
********************************************************************************/ 
var HTTP_PORT = 8080;
let collegeData = require("./modules/collegeData")
var express = require("express");
var app = express();
var path = require("path")
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    filePath = path.join(__dirname, 'views', 'home.html')
    res.sendFile(filePath);
});
app.get("/about", (req, res) => {
    filePath = path.join(__dirname, 'views', 'about.html')
    res.sendFile(filePath);
});
app.get("/htmlDemo", (req, res) => {
    filePath = path.join(__dirname, 'views', 'htmlDemo.html')
    res.sendFile(filePath);
});

app.get("/students", (req,res)=>{
    const courseID = req.query.course
    if(courseID){
        collegeData.getStudentsByCourse(courseID).then((data)=>{
            res.json(data)
        }).catch((data)=>{
            res.json(data)
        })
    }
    else {
        collegeData.getAllStudents().then((data)=>{
        res.send(data)
    }).catch((data)=>{
        res.send(data)
    })
    }
})
app.get("/tas", (req,res)=>{
    collegeData.getTAs().then((data)=>{
        res.json(data)
    }).catch((data)=>{
        res.json(data)
    })

})
app.get("/courses",(req,res)=>{
    collegeData.getCourses().then((data)=>{
        res.json(data)
    }).catch((data)=>{
        res.json(data)
    })
})
app.get("/student/:num",(req,res)=>{
    const studentNumber = req.params.num
    collegeData.getStudentByNum(studentNumber).then((data)=>{
        res.json(data)
    }).catch((data)=>{
        res.json(data)
    })
})

app.get("",(req,res)=>{

})
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, ()=>
    {
        console.log("server listening on port: " + HTTP_PORT)
        collegeData.initialize()

});