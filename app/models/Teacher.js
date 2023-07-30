const sql = require("./db.js");
const dbConfig = require("../config/db.config.js")

const Teacher = function (teacher) {
    this.teacher_id = teacher.teacher_id;
    this.name = teacher.name;
    this.is_active = teacher.is_active;
    this.designation = teacher.designation;
}

Teacher.add = function(teacher, result) {
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

Teacher.findById = function(id, result) {
    sql.query(`SELECT * FROM teachers WHERE teacher_id = ${id}`, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
            delete res[0]["id"];
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    })
}

Teacher.findByFilter = function(filters, result) {
    query = "SELECT * FROM teachers"
    checked = false
    if (filters["teacher_id"]) {
        query = query.concat(" WHERE ", `teacher_id='${filters["teacher_id"]}'`)
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
    if (filters["designation"]) {
        if (checked) {
            query = query.concat(" &&")
        } else {
            query = query.concat(" WHERE ")
        }
        query = query.concat(" ", `designation='${filters["designation"]}'`)
        checked = true;
    }
    console.log("query: ", query)

    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("result: ", res)

        if (res.length) {
            for (i = 0;i<res.length;i++) {
                delete res[i].id
            }
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    })
}

module.exports = Teacher;