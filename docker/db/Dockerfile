FROM mysql:5.7

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_DATABASE=teachers_courses
ENV MYSQL_USER=root

# Copy SQL script to create schema
COPY create_schema.sql /docker-entrypoint-initdb.d/

# Expose MySQL default port
EXPOSE 5000