const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', { title: 'Qui prend quoi ?' });
});

app.get('/err', function(req, res) {
    res.render('err', { title: '404' });
});

app.post('/party', function(req, res) {
    axios
        .post(`${process.env.API_URL}/party`, req.body)
        .then(({ data }) => res.redirect(`/party/${data._id}`))
        .catch((err) => res.redirect(`/err`));
});

app.get('/party/:id', function(req, res) {
    axios
        .get(`${process.env.API_URL}/party/${req.params.id}`)
        .then(({ data }) =>
            res.render('party', {
                party: data,
                title: data.name,
                items: data.items,
                url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`
            }),
        )
        .catch((err) => console.log(err));
});

app.post('/additem', function(req, res) {
    axios
        .post(`${process.env.API_URL}/party/${req.body.party}/items`, req.body)
        .then(({ data }) => res.redirect(`/party/${req.body.party}`))
        .catch((err) => res.redirect(`/err`));
});

app.post('/deleteitem', function(req, res) {
    axios
        .delete(`${process.env.API_URL}/party/${req.body.id_party}/items/${req.body.item}`, req.body)
        .then(({ data }) => res.redirect(`/party/${req.body.id_party}`))
        .catch((err) => res.redirect(`/err`));
});



app.listen(process.env.PORT, () => console.log(`Front app listening on port ${process.env.PORT}!`));