# Simple School API
A simple Express.js API for managing a school system with **Classes** and **Students**. This project uses an in-memory data store (no database) to store information about classes and students.

## Entities
### 1. Class
Represents a school class with the following attributes:
- `id` (integer): Unique identifier for the class.
- `name` (string): The name of the class (must be unique).

### 2. Student
Represents a student with the following attributes:
- `id` (integer): Unique identifier for the student.
- `studentName` (string): The name of the student (must be unique).
- `className` (string): The name of the class the student belongs to.

## Usage
1. Clone the repository:
```
git clone <repository-url>
```
2. Install dependencies:
```
npm install
```
3. Start the server:
```
node index.js
```
4. Access the API at:
```
http://localhost:3000
```

## Routes
### Class Routes
Base URL: `/classes`

|Method | Endpoint | Description                               | Request Body                   |
|-------|----------|-------------------------------------------|--------------------------------|
|POST   |`/`       |Create a new class                         |`{ "name" : "class name" }`     |
|GET    |`/:id`    |Get class information by ID                | None                           |
|PATCH  |`/:id`    |Update class information by ID             | `{ "name": "new class name" }` |
|DELETE |`/:id`    |Delete a class (only if it has no students)| None                           |

### Student Routes
Base URL: `/students`

|Method | Endpoint       | Description                               | Request Body                                    |
|-------|----------------|-------------------------------------------|-------------------------------------------------|
|POST   |`/`             |Create a new student                       |`{ "studentName" : "name", "className": "name" }`|
|PATCH  |`/:id`          |Update student information by ID           |`{ "studentName" : "name", "className": "name" }`|
|DELETE |`/:id`          |Delete a student by ID                     | None                                            |
|GET    |`/all`          |Get a list of all students                 | None                                            |
|GET    |`/usingID/:id`  |Get a student information by ID            | None                                            |
|GET    |`/usingName/:id`|Search students by name (case-insensitive) |`{ "studentName" : "name" }`                     |
|GET    |`/inOneClass`   |Get all students in a class by class name  |`{ "className" : "name" }`                       |

## Running the API with Docker
You can download and run the pre-built Docker image of the School API directly from Docker Hub without cloning the code.

### Pull the Docker Image
1. Make sure [Docker](https://www.docker.com/products/docker-desktop/) is installed on your system.
2. Pull the image from Docker Hub: **[Docker Hub link](https://hub.docker.com/r/arilalale/schoolapi_ngocle)**
```shell
docker pull arilalale/schoolapi_ngocle
```

### Run the Docker Container
1. Run the container and map the API's port to your local machine:
```shell
docker run -p 3000:3000 arilalale/schoolapi_ngocle
```
2. The API will now be accessible at:
```
http://localhost:3000
```
You can use [POSTMAN](https://www.postman.com/downloads/) to test the API routes.