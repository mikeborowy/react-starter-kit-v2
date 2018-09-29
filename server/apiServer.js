//http://localhost:3333/courses
/*eslint-disable */
const colors = require('colors');
const express = require('express');
const open = require('open');
const cors = require( 'cors');

const bodyParser = require('body-parser');
import users from './routes/users';

// const { port=3333, delay=1000 } from'minimist')(process.argv);

const logger = (req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
}

const port = 3333;

const app = express()
    .use(logger)
    .use(cors())
    .use(bodyParser.json())
    .use(`/api/users`, users)
    .listen(port, function (err) { if (err) { console.log(err); } else { open(`http://localhost:${port}`); }});

 console.log(`Data Server is running at port:${port}.`.green);

    // .get('/resorts/:name', (req, res) =>
    //     setTimeout(() =>
    //             res.status(200).json(
    //                 resorts.filter(byName(req.params.name))
    //             ),
    //         delay
    //     )
    // )

// app.listen(port, () => console.log('Courses app running on port ' + port + ' with a ' + delay/1000 + ' second delay'));