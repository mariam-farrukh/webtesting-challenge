const express = require('express');

const Users = require('../users/user-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'connected' });
});

server.get('/users', (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });

    server.post('/users', (req,res) => {
        Users.insert(req.body).then(result => {
          res.status(201).json(result)
        })
        .catch(error => {
          res.status(500).json(error)
        })
    })
      
    server.put('/users/:id', async (req,res) => {
        const { id } = req.params;
        const changes = req.body;
      
        try {
          const updated = await Users.findById(id)
          
          if(updated) {
            const updatedUser = await Users.update(changes, id)
            res.json(updatedUser)
          } else {
            res.status(404).json({ message: 'Missing id from params' });
          }
        } catch(error) {
          res.status(500).json({message:'failed to update user'})
        }
    })
      
    server.delete('/users/:id', async (req,res) => {
        const { id } = req.params;
      
        try {
          const deleted = await Users.remove(id)
          
          if(deleted) {
            //removed is a TF value
            res.json({removed: deleted, id: id})
          } else {
            res.status(404).json({ message: 'Missing id from params' });
          }
        } catch(error) {
          res.status(500).json({message:'failed to delete user'})
        }
    })
      
});

module.exports = server;