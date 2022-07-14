DROP DATABASE IF EXISTS Edata_db;
CREATE DATABASE Edata_db;

USE eData_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30)
    salary DECIMAL(10,2),
    department_id INT references department(id)
  
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT references roles(id),
    manager_id INT references employees(id) on delete set NULL);
    