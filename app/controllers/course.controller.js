const Course = require("../models/Course")

exports.addCourse = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    
    const course = new Course({
        course_id: req.body.course_id,
        course_mentor: req.body.course_mentor,
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description,
        is_active: req.body.is_active
    })

    Course.add(course, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while adding teacher."
        });
        else res.send(data);
    });
}

exports.getCourseWithId = (req, res) => {
    Course.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Teacher with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      });
}