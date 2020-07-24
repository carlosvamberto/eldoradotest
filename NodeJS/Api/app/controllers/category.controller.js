const db = require("../models");

const Category = db.category;

// Create and Save a new Categories
exports.create = (req, res) => {
  
  // Create a Category Object
  const category = {
    id: req.body.id,
    name: req.body.name
  };

  // Save Category in the database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {   
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving categories."
        });
        });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Category with id=" + id
        });
      });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + id
        });
      });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + id
        });
      });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all categories."
          });
        });
};
