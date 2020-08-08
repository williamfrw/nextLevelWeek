// data

const proffys = [
    {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "99999999", 
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química", 
        cost: "20",
        weekday: [
            0
        ], 
        time_from: [720], 
        time_to: [1220]
    },
    {
        name: "William Wang", 
        avatar: "https://avatars1.githubusercontent.com/u/53231921?s=460&u=0074207f0fd45ebe386a2a6d386e36ba819b7dbe&v=4",
        whatsapp: "968190760", 
        bio: "Grande apaixonado por tecnologia. Se diverte enquanto quebra a cabeça por horas tentando codar umas duas linhas de código em C.",
        subject: "Pseudotecnologia", 
        cost: "10.23",
        weekday: [
            0
        ], 
        time_from: [720], 
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// functions

function getSubject(subjectNumber) {
    const arrayPos = +subjectNumber - 1 
    return subjects[arrayPos]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0
    // add data to proffys array
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)

        return res.redirect("/study")
    }
    return res.render("give-classes.html", {subjects, weekdays})
}
 // server

const express = require('express')
const server = express()

// setting nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

// init and setting for server
server
// setting up static documents (css, scripts, images)
.use(express.static("public"))
// application routes
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)


 /*Functions can return objects, example
    function function() {
        return {
            name: "William"
            age: "23"
        }
    }

    function().name || function.()age

    It's possible to input the fucntion in variable for later usability

    ArrowFunction - a short way to use function, example:
    () => {

    }
*/