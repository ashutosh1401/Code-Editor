const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const apiFile = require('./api/apiFile')
const RunnerManager = require('./compiler/RunnerManager')
const PORT = process.env.PORT || 4000

const app = express();
app.use(express.json());

// Serving static Files
app.use(express.static('dist'));

//Handling CORS
app.use(cors());

// logging
app.use(morgan('dev'))

app.get('/api/file/:lang', (req,res) => {
    const language = req.params.lang
    console.log(language)
    apiFile.getFile(language,(content) => {
        const file = {
            lang:language,
            code:content
        }
        res.send(JSON.stringify(file));
    })
})

app.post('/api/run', (req,res) => {
    const file = req.body;
  console.log(`file.lang: ${file.lang}`, `file.code:${file.code}`);
  RunnerManager.run(file.lang, file.code, res);
})

app.listen(PORT,() => {
    console.log("Listening to PORT ",PORT)
})
