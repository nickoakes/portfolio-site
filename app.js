/*
    Portfolio Site
    app.js
*/

//dependencies

const express = require('express');
const app = express();
var data = require('./data.json');
var projects = data.projects;

/*
development server port
(process.env.PORT is to enable Heroku to set its own port, as it will not function with a hard-coded port)
*/

const port = process.env.PORT || 3000;

//set view engine to pug

app.set('view engine', 'pug');

//routing

app.use('/static', express.static('public'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    res.render('project', {
        project_name: projects[req.params.id].project_name,
        description: projects[req.params.id].description,
        technologies: projects[req.params.id].technologies,
        live_link: projects[req.params.id].live_link,
        github_link: projects[req.params.id].github_link,
        image_urls: projects[req.params.id].image_urls
    });
});

//error handling

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log('A ' + err.status + ' error has occurred: ' + err.message);
    res.render('error');
});

//log development server port to console when server is running

app.listen(port, () => console.log(`App is listening on port ${port}.`));