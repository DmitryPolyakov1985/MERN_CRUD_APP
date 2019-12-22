const express = require('express');
const router = express.Router();
const Articles = require("../models/articles");

// REQUEST GET ALL ARTICLES

router.get('/', (req, res) => {
    Articles.find()
     .then(article => res.json(article))
     .catch(err => res.status(400).json(`Error: ${err}`))
});

// REQUEST ADD NEW ARTICLE
router.post('/add', (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article
    });

    newArticle
        .save()
        .then(() => res.send(`New Article has been added`))
        .catch(err => res.status(400).send(`Error: ${err}`))
});

// REQUEST FIND ARTICLE BY ID
router.get('/:id', (req, res) => {
    Articles.findById(req.params.id)
        .then(article => res.json(article) )
        .catch(err => res.status(400).send(`Error: ${err}`) )
});

// REQUEST FIND ARTICLE BY ID AND UPDATE
router.put('/update/:id', (req, res) => {
    Articles.findById(req.params.id)
        .then(article => {
            article.title = req.body.title,
            article.article = req.body.article

            article
                .save()
                .then(() => res.send(`The article has been updated successfully`))
                .catch(err => res.status(400).send(`Error: ${err}`))
        })
        .catch(err => res.status(400).send(`Error: ${err}`))
});

// REQUEST ARTICLE BY ID AND DELETE
router.delete('/:id', (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
        .then(() => res.send(`Article has been deleted successfully`) )
        .catch(err => res.status(400).send(`Error: ${err}`))
});


module.exports = router;