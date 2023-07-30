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

exports.getTeacherWithId = (req, res) => {
  Teacher.findById(req.params.id, (err, data) => {
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
};

exports.getTeachersWithFilters = (req, res) => {
  console.log(typeof req.query)
  Teacher.findByFilter(req.query, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teacher with params ${req.params}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
