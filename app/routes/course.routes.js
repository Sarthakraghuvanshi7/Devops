module.exports = app => {
    const course = require("../controllers/course.controller")

    var router = require("express").Router();

    router.post("/", course.addCourse);

    app.use('/course', router);

}