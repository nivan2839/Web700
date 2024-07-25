
/*********************************************************************************
* WEB700 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Nivan Hanjura Student ID: 131732232 Date: 5/24/2024
*
********************************************************************************/

const serverVerbs = ["GET", "GET", "GET", "POST", "GET", "POST"]
const serverPaths = ["/", "/about", "/contact", "/login","/panel", "/logout"]
const serverResponses = ["Welcome to Web700 Assignment1", "This course name is WEB700. This assignment was prepared by Nivan Hanjura","nhanjura@myseneca.ca Nivan  Hanjura", 
"Hello, User Logged In", "Main Panel", "Logout Complete. Goodbye"]

function httpRequest(httpVerb, path){
    if(serverVerbs.includes(httpVerb) && serverPaths.includes(path)){
        const pathVal = serverPaths.indexOf(path)
        if(serverVerbs[pathVal] === httpVerb){
            return `200: ${serverResponses[pathVal]}`
        }
    }
    return `404: Unable to process ${httpVerb} request for ${path}`
}
console.log(httpRequest("GET", "/"));
console.log(httpRequest("GET", "/about"));
console.log(httpRequest("PUT", "/"))

function automateTests(){
    const testVerbs = ["GET", "POST"]
    const testPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout", "/randomPath1", "/randomPath2"]
    function randomRequest(){
        randVerb = testVerbs[Math.floor(Math.random() * testVerbs.length)]
        randPath = testPaths[Math.floor(Math.random() * testPaths.length)]
        console.log(httpRequest(randVerb,randPath))
    }
    setInterval(randomRequest,1000)
}

automateTests()
