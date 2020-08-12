const dataBase = require('./database/db')
const{subjects, weekdays, getSubject, convertHoursToMinutes} = require('.utils/format')
const{prototype} = require('sqlite-async')
const { catch, catch } = require('./database/db')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filtes = req.query

    if (!filtes.subject || !filters.weekday || !filters.time) {
        const proffys = ""
        return res.render("study.html", {proffys, filters, subjects, weekdays})
    }
    
    const timeToMinutes = convertHoutsToMinutes(filters.time)
    console.log(filters.time + "em minutos: " + timeToMinutes)

    const query = `
        SELECT classes.*,proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filtes.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filtes.subject}"
    `

    try {
        const db = await dataBaseconst proffys = await db.all(query)
        proffys.map((p) => {
            proffys.subject = getSubject(proffy.subject)
        })
        return res.render("study.html", {proffys, filtes, subjects, weekdays})
    } catch(error) {
        console.log("error: " + error)
    }
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {subjects, weekdays})
}

function pageSuccessInsert(req, res) {
    const createProffy = requiere('./database/createProffy')
    const proffyValue = {
        name: req.body.name, 
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekdat, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await dataBasecreateProffy(db, {proffyValue, classValuem classScheduleValues})
        let querryString = "?subject="+req.body.subject
        queryString +="&weekday="+req.body.weekday[0]
        queryString += "&time="+req.body.time_from[0]
        return res.redirect("/success-insert + queryString")
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSuccessInsert
}