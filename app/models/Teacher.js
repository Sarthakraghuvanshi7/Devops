const sql = require("./db.js");
const dbConfig = require("../config/db.config.js")

const Teacher = function (teacher) {
    this.teacher_id = teacher.teacher_id;
    this.name = teacher.name;
    this.is_active = teacher.is_active;
    this.designation = teacher.designation;
}

Teacher.add = function(teacher, result) {
    console.log(dbConfig)
    console.log("teacher: ", teacher)
    sql.query("INSERT INTO teachers SET ?", teacher, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Added teacher: ", { id: res.insertId, ...teacher });
        result(null, { id: res.insertId, ...teacher });
    });
}

module.exports = Teacher;