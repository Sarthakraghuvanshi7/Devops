const sql = require("./db.js");
const dbConfig = require("../config/db.config.js")

const Course = function (course) {
    this.course_id = course.course_id;
    this.course_mentor = course.course_mentor;
    this.name = course.name;
    this.start_date = course.start_date;
    this.end_date = course.end_date;
    this.description = course.description;
    this.is_active = course.is_active;
}