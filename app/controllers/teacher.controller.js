const Teacher = require("../models/Teacher")

exports.addTeacher = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    const teacher = new Teacher({
        teacher_id: req.body.teacher_id,
        name: req.body.name,
        is_active: req.body.is_active,
        designation: req.body.designation
    });
    Teacher.add(teacher, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding teacher."
        });
      else res.send(data);
    });
  };