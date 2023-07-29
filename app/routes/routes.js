module.exports = app => {
    const teacher = require("../controllers/teacher.controller")

    var router = require("express").Router();

    router.post("/", teacher.addTeacher);

    app.use('/api/teachers', router);
}