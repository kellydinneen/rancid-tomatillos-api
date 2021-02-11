const express = require('express');
const app = express();

app.locals.users = [
  { id: 'u1', name: 'Jessica Candel', username: 'Jessica', password: 'Candel' },
  { id: 'u2', name: 'Marcus Aurelius', username: 'Marcus', password: 'Aurelius' },
  { id: 'u3', name: 'Thirdu Ser', username: 'Thirdu', password: 'Ser' }
];

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Rancid Tomatillos API';

app.get('/', (request, response) => {
  response.send('Oh hey Rancid Tomatillos API');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/api/v1/users', (request, response) => {
  const users = app.locals.users;

  response.json({ users });
});
