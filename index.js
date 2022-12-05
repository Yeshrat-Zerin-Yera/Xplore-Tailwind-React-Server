const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const categories = require('./data/categories.json');
const courses = require('./data/courses.json');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Xplore API Running');
});

app.get('/categories', (req, res) => {
    res.send(categories);
});

app.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    if (id === '01') {
        const categoryCourses = courses.filter(course => course?.others_info?.price === 0);
        res.send(categoryCourses);
    }
    else if (id === '02') {
        const categoryCourses = courses.filter(course => course?.others_info?.price !== 0);
        res.send(categoryCourses);
    }
    else if (id === '07') {
        const categoryCourses = courses.filter(course => course?.rating?.badge === 'New');
        res.send(categoryCourses);
    }
    else if (id === '08') {
        const categoryCourses = courses.filter(course => course?.rating?.badge === 'Special');
        res.send(categoryCourses);
    }
    else {
        const categoryCourses = courses.filter(course => course?.category_id === id);
        res.send(categoryCourses);
    }
});

app.get('/courses', (req, res) => {
    res.send(courses);
});

app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    const selectedCourse = courses.find(course => course?._id === id);
    res.send(selectedCourse);
});

app.get('/checkout/:id', (req, res) => {
    const id = req.params.id;
    const selectedCourse = courses.find(course => course?._id === id);
    res.send(selectedCourse);
});


app.listen(port, () => {
    console.log('Xplore Running On Port: ', port);
});