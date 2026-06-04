const express = require('express');
const lodash = require('lodash');
const minimist = require('minimist');

const app = express();
const port = 3000;

// Parse minimist command line arguments (vulnerable to prototype pollution in minimist <=1.2.2)
const args = minimist(process.argv.slice(2));
console.log('Command line arguments parsed with minimist:', args);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the vulnerable application! Try /merge or /unserialize endpoints.');
});

// Prototype Pollution demonstration using lodash.merge
app.post('/merge', (req, res) => {
  let target = {};
  // lodash 4.17.4 is vulnerable to Prototype Pollution via merge
  lodash.merge(target, req.body);
  res.json({ status: 'Merged successfully', target });
});

// Safe deserialization using native JSON.parse (prevents RCE)
app.post('/unserialize', (req, res) => {
  if (req.body.data) {
    try {
      // Safe parsing via built-in JSON.parse
      const obj = JSON.parse(req.body.data);
      res.send(`Unserialized object: ${JSON.stringify(obj)}`);
    } catch (e) {
      res.status(500).send(`Error: ${e.message}`);
    }
  } else {
    res.status(400).send('Please provide a data field in the request body.');
  }
});

app.listen(port, () => {
  console.log(`Vulnerable app listening at http://localhost:${port}`);
});
