

const http = require('http');
const fs   = require('fs');

const FeedbackItem = require('./FeedbackItem.js');

const PORT = 7070;

const STRATEGIES_FOLDER = 'strategies';
const strategies = [];

function readStrategiesAndStart() {
    fs.readdir(STRATEGIES_FOLDER, (err,files) => {

        if(err)
            console.log(err);
        else {
            files.forEach(file => 
                strategies.push(require('./'+STRATEGIES_FOLDER+'/'+file)));

                startServer();
            }
    });
}

async function getBestFeedback(input) {
    const allFeedbacks = await Promise.all( strategies.map( s => s.getFeedback(input)) );
    const feedback  = allFeedbacks.length > 0 ? allFeedbacks.sort(FeedbackItem.compare)[0].text : "hum...";

    persist(input,feedback);

    return feedback;
}

function persist(input,feedback) {
    // ...
}

function readInput(request) {
    //...
    return null;
}

function startServer() {
    
    http.createServer( (request,response) => {
        const input = readInput(request);


        getBestFeedback(input)
            .then( (feedback)  => {
                response.writeHead(200,{'Content-type': 'text-plain'});
                response.end(`${feedback}\n`);
            })
            .catch( (error) => {
                response.writeHead(500,{'Content-type': 'text-plain'});
                response.end(`${error.message}\n`);
            });

    }).listen(PORT);
}

readStrategiesAndStart();
