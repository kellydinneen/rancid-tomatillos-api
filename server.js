const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.locals.users = [
  { id: 'u1', name: 'Jessica Candel', username: 'Jessica', password: 'Candel', favorites:[] },
  { id: 'u2', name: 'Marcus Aurelius', username: 'Marcus', password: 'Aurelius', favorites:[] },
  { id: 'u3', name: 'Thirdu Ser', username: 'Thirdu', password: 'Ser', favorites:[] }
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

app.get('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const user = app.locals.users.find(user => user.id === id);
  if (!user) {
    return response.sendStatus(404);
  }

  response.status(200).json(user);
});

app.use(express.json());


app.patch('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const newFavorite = request.body;
  const user = app.locals.users.find(user => user.id === id);
  if (!user) {
    return response.sendStatus(404);
  }
  
  if(!user.favorites.some(fav => fav.id === newFavorite.id)) {
    user.favorites.push(newFavorite)
  } else {
    user.favorites = user.favorites.filter(movie => movie.id !== newFavorite.id);
  }
  response.status(201).json(user.favorites);
});


app.delete('/api/v1/users/:id', (request, response) => {
  let { id } = req.params;
  const favoriteToDelete = request.body;

  const user = app.locals.users.find(user => user.id === id);
  if (!user) {
    return response.sendStatus(404);
  }
  const originalFavoriteNumber = user.favorites.length;

  user.favorites = user.favorites.filter(movie => movie.id !== favoriteToDelete.id);
  if (user.favorites.length = originalFavoriteNumber) {
    return res.status(404).json({
      message: `No found favorite with id of #${favoriteToDelete.id}.`
    })
  }

  res.status(200).json({
    message: `Favorite with title ${favoriteToDelete.title} has been deleted`
  })
})
