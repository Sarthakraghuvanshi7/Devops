const sql = require("./db.js");
const dbConfig = require("../config/db.config.js")
const Teacher = require("./Teacher.js")

const Course = function (course) {
    this.course_id = course.course_id;
    this.course_mentor = course.course_mentor;
    this.name = course.name;
    this.start_date = course.start_date;
    this.end_date = course.end_date;
    this.description = course.description;
    this.is_active = course.is_active;
}

Course.add = function(course, result) {
    sql.query("INSERT INTO courses SET ?", course, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        Teacher.findById(course.course_mentor, (err, data) => {
            if (err) {
                result(err, null);
                return
            }
            result(null, {...course, course_mentor: data})
        })
    })
}

Course.findById = function(id, result) {
    sql.query(`SELECT * FROM courses WHERE course_id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
            delete res[0]["id"];
            Teacher.findById(res[0].course_mentor, (err, data) => {
                if (err) {
                    result(err, null);
                    return
                }
                result(null, {...res[0], course_mentor: data});
            })
            return;
        }
        result({ kind: "not_found" }, null);
    })
}

module.exports = Course