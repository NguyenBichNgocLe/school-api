const express = require("express")
const StudentRouter = express.Router();
const { classes, students } = require("./data")

let studentId = 1;

// Create a student
StudentRouter.post("/", (req, res) => {
    const { studentName, className } = req.body;

    if(!studentName) return res.status(400).send("Student name is required");
    if(!className) return res.status(400).send("Class name is required");

    if(!isExistedClass(className)) return res.status(400).send("This class is unavailable");
    if(isDuplicatedName(studentName)) return res.status(400).send("Student name must be unique");

    const newStudent = { id: studentId++, studentName, className };
    students.push(newStudent);
    res.status(201).send(newStudent);
});

// Update a student information
StudentRouter.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { studentName, className } = req.body;

    const student = findStudentByID(parseInt(id));
    if(!student) return res.status(404).send("Student not found"); 

    if(!studentName && !className) return res.status(400).send("Please provide student name and/or class name");

    if(studentName) {
        if(!(students.some((student) => student.studentName === studentName))) {
            student.studentName = studentName;
        } else {
            return res.status(400).send("Student name must be unique");
        }
    }

    if(className) {
        if(isExistedClass(className)) 
            student.className = className;
        else return res.status(400).send("This class is unavailable")
    }

    const updatedStudent = findStudentByID(parseInt(id));
    return res.status(200).send(updatedStudent);
});

// Delete a student information
StudentRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    const studentInfo = findStudentByID(parseInt(id));
    if(!studentInfo) return res.status(404).send("Student not found");

    const studentIndex = students.findIndex((student) => student.id === parseInt(id));

    const deletedStudent = students.splice(studentIndex, 1);
    return res.send(deletedStudent);
});

// Get all students
StudentRouter.get("/all", (req, res) => {
    res.status(200).send(students);
});

// Get a student using their ID
StudentRouter.get("/usingID/:id", (req, res) => {
    const { id } = req.params;

    const studentInfo = findStudentByID(parseInt(id));
    if(!studentInfo) return res.status(404).send("Student not found");

    res.status(200).send(studentInfo);
});

// Get a student using their name (search LIKE)
StudentRouter.get("/usingName", (req, res) => {
    const { studentName } = req.body;

    if(!studentName) return res.status(404).send("Student name is required");

    const studentsInfo = students.filter((student) => namesMatch(studentName, student.studentName));
    if(studentsInfo.length === 0) return res.status(404).send("Student not found");

    res.status(200).send(studentsInfo);
});

// Get all student in a class (using class name)
StudentRouter.get("/inOneClass", (req, res) => {
    const { className } = req.body;

    if(!className) return res.status(404).send("Class name is required");
    if(!isExistedClass(className)) return res.status(400).send("This class is unavailable");

    const studentsInOneClass = students.filter((student) => student.className.toLowerCase() === className.toLowerCase());
    res.status(200).send(studentsInOneClass);
});

// Helper functions
const isExistedClass = (className) => classes.some((c) => c.name.toLowerCase() === className.toLowerCase());
const isDuplicatedName = (studentName) => students.some((student) => student.studentName.toLowerCase() === studentName.toLowerCase());
const findStudentByID = (id) => students.find((student) => student.id === id);
const namesMatch = (searchString, name) => name.toLowerCase().includes(searchString.toLowerCase())

module.exports = StudentRouter;