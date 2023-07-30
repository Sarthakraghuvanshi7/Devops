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

Course.findByFilter = function(filters, result) {
    query = "SELECT * FROM courses"
    checked = false
    if (filters["course_id"]) {
        query = query.concat(" WHERE ", `course_id='${filters["course_id"]}'`)
        checked = true;
    }
    if (filters["name"]) {
        if (checked) {
            query = query.concat(" &&")
        } else {
            query = query.concat(" WHERE ")
        }
        query = query.concat(" ", `name='${filters["name"]}'`)
        checked = true;
    }
    if (filters["is_active"]) {
        if (checked) {
            query = query.concat(" &&")
        } else {
            query = query.concat(" WHERE ")
        }
        is_active = filters["is_active"] ? 1 : 0
        query = query.concat(" ", `is_active='${is_active}'`)
        checked = true;
    }
    if (filters["course_mentor"]) {
        if (checked) {
            query = query.concat(" &&")
        } else {
            query = query.concat(" WHERE ")
        }
        query = query.concat(" ", `course_mentor='${filters["course_mentor"]}'`)
        checked = true;
    }

    if (filters["start_date"]) {
        if (checked) {
            query = query.concat(" &&")
        } else {
            query = query.concat(" WHERE ")
        }
        query = query.concat(" ", `start_date='${filters["start_date"]}'`)
        checked = true;
    }

    if (filters["end_date"]) {
        if (checked) {
            query = query.concat(" &&")
        } else {
            query = query.concat(" WHERE ")
        }
        query = query.concat(" ", `end_date='${filters["end_date"]}'`)
        checked = true;
    }

    if (filters["description"]) {
        if (checked) {
            query = query.concat(" &&")
        } else {
            query = query.concat(" WHERE ")
        }
        query = query.concat(" ", `description='${filters["description"]}'`)
        checked = true;
    }


    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
            for (i = 0;i<res.length; i ++) {
                delete res[i]["id"];
                Teacher.findById(res[i].course_mentor, (err, data) => {
                    if (err) {
                        result(err, null);
                        return
                    }
                    res[i] = {...res[i], course_mentor: data}
                    console.log(res[i])
                })
            }
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    })
}

module.exports = Course