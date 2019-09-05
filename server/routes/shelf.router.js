const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "item";`;
    pool.query(queryText)
    .then((result) => {
        console.log('GET from the DB', result.rows);
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('error in GET', error);
    })
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    const newItem = req.body.description;
    const image = req.body.image;
    const user = req.user.id;
    const queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
        VALUES ($1, $2, $3)`;
    pool.query(queryText, [newItem, image, user])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in post query: ', error);
            res.sendStatus(500);     
        });
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "item" WHERE "id" = $1`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
        res.sendStatus(200)
    })
    .catch((error) => {
        console.log('error delete router:', error)
    })
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;