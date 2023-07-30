module.exports = app => {
    const teacher = require("../controllers/teacher.controller")

    var router = require("express").Router();

    router.post("/", teacher.addTeacher);

    router.get("/:id", teacher.getTeacherWithId)

    router.get("/", teacher.getTeachersWithFilters)

    app.use('/teacher', router);
}