const express = require("express")
const ClassRouter = express.Router();
const { classes, students } = require("./data")

let classId = 1;

// Create a class
ClassRouter.post("/", (req, res) => {
    const { name } = req.body;

    if(!name) return res.status(400).send("Class name is required");
    if(isDuplicatedName(name)) return res.status(400).send("Class name must be unique");

    const newClass = { id: classId++, name };
    classes.push(newClass);
    res.status(201).send(newClass);
});

// Get a class information using its ID
ClassRouter.get("/:id", (req, res) => {
    const { id } = req.params;

    const classInfo = findByID(parseInt(id));

    if(!classInfo) return res.status(404).send("Class not found");
    res.status(200).send(classInfo);
});

// Update a class information
ClassRouter.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    const classInfo = findByID(parseInt(id));

    if(!classInfo) return res.status(404).send("Class not found");
    if(isDuplicatedName(name)) return res.status(400).send("Class name must be unique");

    classInfo.name = name;
    res.status(200).send(classInfo);
});

// Delete a class information only when the class has no students
ClassRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    const classInfo = findByID(parseInt(id));
    if(!classInfo) return res.status(404).send("Class not found");

    if(students.some((student) => student.className.toLowerCase() === classInfo.name.toLowerCase())) 
        return res.status(400).send("Cannot delete a class with studetns");

    const classIndex = classes.findIndex((obj) => obj.id === parseInt(id));
    const deletedClass = classes.splice(classIndex, 1);
    return res.send(deletedClass);
});

// Helper functions
const findByID = (id) => classes.find((obj) => obj.id === id);
const isDuplicatedName = (name) => classes.some((obj) => obj.name.toLowerCase() === name.toLowerCase());

module.exports = ClassRouter;