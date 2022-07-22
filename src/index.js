const express = require('express');

const app = express();

app.use(express.json());

const users = new Map();

let id = 0;

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = ++id;
    users.set(user.id, user);
    res.json(user);
});

app.get('/users', (req, res) => {

    res.json(Array.from(users.values()));
});

app.get('/users/:id', (req, res) => {
const idUser = Number(req.params.id);
  const user = users.get(idUser);
  res.json(user || null);
});

app.put('/users/:id', (req, res) => {
    const idUser = Number(req.params.id);
    const user = users.get(idUser);
    if (!user) {
        res.json(null);
    } else {
        const finalUser = {...user, ...req.body, id: user.id};
        users.set(idUser, finalUser);
        res.json(finalUser);
    }
});

app.delete('/users/:id', (req, res) => {
    const idUser = +req.params.id;
    users.delete(id ,idUser);
    res.json("ok");
});




















app.listen(3000);