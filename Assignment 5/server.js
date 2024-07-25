/*********************************************************************************
* WEB700 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Nivan Hanjura Student ID: 131732232 Date: 7/17/2024
*
********************************************************************************/ 
var HTTP_PORT = 8080;
let collegeData = require("./modules/collegeData")
var express = require("express");
var app = express();
var path = require("path")
var exphbs = require("express-handlebars")
// setup a 'route' to listen on the default url path
app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        navLink: function(url, options){
            return '<li' +
            ((url == app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') +
            '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
        },
            
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
            return options.inverse(this);
            } else {
            return options.fn(this);
            }
        }
   }
}));
app.set('view engine', '.hbs');
app.use(express.static('public'));
app.use(function(req,res,next){
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});
app.get("/about", (req, res) => {
    res.render('about')
});
app.get("/students/add", (req, res) => {
    res.render('addStudent.hbs')
});

app.post('/students/add', (req, res) => {
    collegeData.addStudent(req.body).then(() => {
        res.redirect('/students');
    }).catch(err => {
        res.redirect('/students');
    });
});

app.get("/htmlDemo", (req, res) => {
    filePath = path.join(__dirname, 'views', 'htmlDemo.html')
    res.sendFile(filePath);
});

app.get("/students", (req,res)=>{
    const courseID = req.query.course
    if(courseID){
        collegeData.getStudentsByCourse(courseID).then((data)=>{
            res.render('students', {students: data})
        }).catch((data)=>{
            res.json({ message: err });
        })
    }
    else {
        collegeData.getAllStudents().then((data)=>{
            res.render('students', {students: data})
    }).catch((data)=>{
        res.json({ message: err });
    })
    }
})


/*app.get("/tas", (req,res)=>{
    collegeData.getTAs().then((data)=>{
        res.json(data)
    }).catch((data)=>{
        res.json(data)
    })

})*/


app.get("/courses",(req,res)=>{
    collegeData.getCourses().then((data)=>{
        res.render("courses",{course : data})
    }).catch((data)=>{
        res.json(data)
    })
})
app.get("/student/:num",(req,res)=>{
    const studentNumber = req.params.num
    collegeData.getStudentByNum(studentNumber).then((data)=>{
        res.render("student", { student: data });
    }).catch((data)=>{
        res.json(data)
    })
})
app.get("/course/:id",(req,res)=>{
    const courseID = req.params.id
    collegeData.getCourseById(courseID).then((data)=>{
        res.render('course',{course:data})
    }).catch((data)=>{
        res.json(data)
    })
})

app.post("/student/update", (req, res) => {
    res.redirect("/students");
    });
app.get("*",(req,res)=>{
    res.render('error')
})


// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, ()=>
    {
        console.log("server listening on port: " + HTTP_PORT)
        collegeData.initialize()

});