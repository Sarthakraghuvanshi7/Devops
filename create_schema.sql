USE teachers_courses;

CREATE TABLE teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL, 
  name VARCHAR(255)  NOT NULL,
  is_active BOOLEAN  NOT NULL,
  designation VARCHAR(255)  NOT NULL
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  course_mentor INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL
);
