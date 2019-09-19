const router = require("express").Router();

const Users = require("./user-model.js.js");

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting the users from database" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.getUsersById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting this user from database" });
    });
});

router.post("/", (req, res) => {
  const user = req.body;

  Users.add(user)
    .then(count => {
      res.status(201).json({ message: "User has been added" });
    })
    .catch(err => {
      res.status(500).json({ message: "Error with creating user in database, try again later" });
    });
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
            res.json({ removed: deleted });
            } else {
            res.status(404).json({ message: 'Could not find scheme with given id' });
            }
        })
        .catch (err => {
            res.status(500).json({message: 'Failed to delete user, error with database'})
        })
});

module.exports = router;