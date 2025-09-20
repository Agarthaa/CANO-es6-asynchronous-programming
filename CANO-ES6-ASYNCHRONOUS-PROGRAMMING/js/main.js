// Part 1: ES6 Classes
class Student {
    constructor(id, name, age, course) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.course = course;
    }
    introduce() {
        return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
    }
}

class Instructor {
    constructor(id, name, subject) {
        this.id = id;
        this.name = name;
        this.subject = subject;
    }
    teach() {
        return `I am ${this.name} and I teach ${this.subject}.`;
    }
}

// Part 2: Fetch Data (Promises)
function fetchDataWithPromises() {
    return fetch('data/students.json')
        .then(response => response.json())
        .then(data => {
            console.log('Promise version:', data);
            return data;
        });
}

// Part 2: Fetch Data (Async/Await)
async function fetchDataWithAsyncAwait() {
    const response = await fetch('data/students.json');
    const data = await response.json();
    console.log('Async/Await version:', data);
    return data;
}

// Part 3: Display Data
function displayData(data) {
    const output = document.getElementById('output');
    let html = '';

    // Students
    html += '<h2>Students:</h2><ul>';
    data.students.forEach(student => {
        const isOlder = student.age > 21;
        const highlight = isOlder ? ' <b>*</b>' : '';
        html += `<li>${student.name} (${student.age}) - ${student.course}${highlight}</li>`;
    });
    html += '</ul>';

    // Courses
    html += '<h2>Courses:</h2><ul>';
    data.courses.forEach(course => {
        html += `<li>${course.title}: ${course.description}</li>`;
    });
    html += '</ul>';

    // Instructors
    html += '<h2>Instructors:</h2><ul>';
    data.instructors.forEach(instr => {
        html += `<li>${instr.name} - ${instr.subject}</li>`;
    });
    html += '</ul>';

    // Student → Course Description
    html += '<h2>Student → Course Description:</h2><ul>';
    data.students.forEach(student => {
        const course = data.courses.find(c => c.title === student.course);
        if (course) {
            html += `<li>${student.name} → ${student.course}: ${course.description}</li>`;
        }
    });
    html += '</ul>';

    // Course → Instructor
    html += '<h2>Course → Instructor:</h2><ul>';
    data.courses.forEach(course => {
        const instructor = data.instructors.find(i => i.id === course.instructorId);
        if (instructor) {
            html += `<li>${course.title} Taught by ${instructor.name}</li>`;
        }
    });
    html += '</ul>';

    output.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    // Create objects from JSON data (using first 3 students and first 2 instructors)
    fetch('data/students.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load students.json');
            return response.json();
        })
        .then(data => {
            // Create Student objects
            const students = data.students.slice(0, 3).map(s => new Student(s.id, s.name, s.age, s.course));
            students.forEach(s => console.log(s.introduce()));

            // Create Instructor objects
            const instructors = data.instructors.slice(0, 2).map(i => new Instructor(i.id, i.name, i.subject));
            instructors.forEach(i => console.log(i.teach()));

            // Display all data
            displayData(data);
        })
        .catch(err => {
            document.getElementById('output').innerHTML = `<b>Error:</b> ${err.message}`;
            console.error(err);
        });

    // Run both fetch functions for console logging
    fetchDataWithPromises().catch(console.error);
    fetchDataWithAsyncAwait().catch(console.error);
});