module.exports = app => {
    const course = require("../controllers/course.controller")

    var router = require("express").Router();

    router.post("/", course.addCourse);

    router.get("/:id", course.getCourseWithId)

    router.get("/", course.getCoursesWithFilters)

    app.use('/course', router);

}