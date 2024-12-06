const express = require("express")
const StudentRouter = express.Router();
const { students } = require("./data")

let studentId = 1;

// Create a student
StudentRouter.post("/", (req, res) => {
    const { studentName, className } = req.body;

    if(!studentName) return res.status(400).send("Student name is required");
    if(!className) return res.status(400).send("Class name is required");

    if(!isExistedClass(className)) return res.status(400).send("This class is unavailable");
    if(isDuplicatedName(studentName)) return res.status(400).send("Student name must be unique");

    const newStudent = { id: studentId++, name: studentName, class: className };
    students.push(newStudent);
    res.status(201).send(newStudent);
});

// Update a student information
StudentRouter.patch("/:id", (req, res) => {
    res.status(200).send("Updated student information");
});

// Delete a student information

// Get all students

// Get a student using their ID

// Get a student using their name (search LIKE)

// Get all student in a class (using class name)

// Helper functions

const isExistedClass = (className) => classes.some((c) => c.name === className);
const isDuplicatedName = (studentName) => students.some((s) => s.name === studentName);

module.exports = StudentRouter;