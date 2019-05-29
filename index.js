// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());


//GET
server.get('/api/users', (req,res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving users "});
        });
})

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;

    db
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found "});
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving user "});
        })
})


// POST
server.post('/api/users', (req,res) => {
    const newUser = req.body;

    db
        .insert(newUser)
        .then(user => {
            if (newUser.name && newUser.bio) {
                res.status(201).json(user);
            } else {
                res.status(406).json({ message: "Please send a name and bio" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error creating user" });
        })
})

// PUT
server.put('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    db
        .update(id, updatedUser)
        .then(user => {
            if (user) {
                res.status(200).json(db.findById(id));
            } else {
                res.status(404).json({ message: "User not found "});
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error updating the user "});
        })
})

// DELETE
server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;

    db
        .remove(id)
        .then(deleted => {
            res.status(204).end();
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting the user "});
        })
})

server.listen(4000, () => {
    console.log("\n*** API RUNNING ON 4000 ***");
})