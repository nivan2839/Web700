/*********************************************************************************
* WEB700 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Nivan Hanjura Student ID: 131732232 Date: 7/17/2024
*
********************************************************************************/ 

var HTTP_PORT = 8080;
const sqlHandler = require('sequelize');
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
    res.render('addStudent')
});

app.post('/students/add', (req, res) => {
    collegeData.addStudent(req.body).then(() => {
        res.redirect('/students');
    }).catch(err => {
        res.redirect('/students');
    });
});

app.get("/htmlDemo", (req, res) => {
   res.render('htmlDemo')
});

app.get("/students", (req,res)=>{
    const courseID = req.query.course
    if(courseID){
        collegeData.getStudentsByCourse(courseID).then((data)=>{
            if(data.length > 0) {
                res.render('students', {students: data})
            }
            else {
                res.render('students' , {message : "no results"})

            }
        }).catch((data)=>{
            res.json({ message: data });
        })
    }
    else {
        collegeData.getAllStudents().then((data)=>{
            if(data.length > 0) {
                res.render('students', {students: data})
            }
            else {
                res.render('students' ,{message : "no results"})

            }
    }).catch((data)=>{
        res.json({ message: data });
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
        if(data.length > 0) {
            res.render("courses",{course : data})
        }
        else {
            res.render('courses', {message : "no results"})

        }
    }).catch((data)=>{
        res.json(data)
    })
})
app.get("/student/:num",(req,res)=>{
    let viewData = {};
collegeData.getStudentByNum(req.params.studentNum).then((data) => {
if (data) {
viewData.student = data; //store student data in the "viewData" object as "student"
} else {
viewData.student = null; // set student to null if none were returned
}
}).catch(() => {
viewData.student = null; // set student to null if there was an error
}).then(collegeData.getCourses)
.then((data) => {viewData.courses = data
if (viewData.courses[i].courseId == viewData.student.course) {
    viewData.courses[i].selected = true; 
}
}).catch(() => {
    viewData.courses = []; // set courses to empty if there was an error
    }).then(() => {
    if (viewData.student == null) { // if no student - return an error
    res.status(404).send("Student Not Found");
    } else {
    res.render("student", { viewData: viewData }); // render the "student" view
    }
    });
})
app.get("/course/:id",(req,res)=>{
    const courseID = req.params.id
    collegeData.getCourseById(courseID).then((data)=>{
        if(data.length > 0) {
            res.render('course',{course:data})
        }
        else {
            res.render('error')
        }
    }).catch((data)=>{
        res.json(data)
    })
})
app.get("/courses/add", (req,res)=>{
        res.render('addCourse')
})
app.post("/courses/add", (req,res)=>{
    collegeData.addCourse(req.body).then(() => {
        res.redirect('/courses');
    }).catch(err => {
        res.redirect('/courses');
    });
})

app.post("/courses/update", (req,res)=>{
    collegeData.updateCourse(req.body).then(()=>{
        res.redirect('/courses');
    }).catch(err => {
        res.redirect('/courses');
    });
})
app.get("/course/delete/:id",(req,res)=>{
    const courseID = req.params.id
    collegeData.deleteCourseByID(courseID).then((data)=>{
        if(data.length > 0) {
            res.render('course',{message : "Remove course"})
        }
        else {
            res.render('Couldnt remove course')
        }
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