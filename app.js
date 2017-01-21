
import express from 'express';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

import schema from './schema';

let app  = express();
const PORT = 3000;

app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  const third = { rkt:"this is 3th argument" }; // resolve function 의 첫번째 인자값으로 들어감
  graphql(schema, req.body, third)
  .then((result) => {
    console.log("-");
    console.log("------------------------------");
    console.log(third);
    res.send(JSON.stringify(result, null, 2));
  });
});

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});
