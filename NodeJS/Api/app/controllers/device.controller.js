const db = require("../models");
//const { regexp } = require("sequelize/types/lib/operators");
const Device = db.devices;
//const Op = db.Sequelize.Op;

// Create and Save a new Device
exports.create = (req, res) => {
  
  // Create a Device Object
  const device = {
    id: req.body.id,
    category: req.body.category,
    color: req.body.color,
    partNumber: req.body.partNumber
  };

  // Save Tutorial in the database
  Device.create(device)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Device."
      });
    });
};

// Retrieve all Devices from the database.
exports.findAll = (req, res) => {   
    Device.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving devices."
        });
        });
};

// Find a single Device with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Device.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Device with id=" + id
        });
      });
};

// Update a Device by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Device.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Device was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Device with id=" + id
        });
      });
};

// Delete a Device with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Device.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Device was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Device with id=${id}. Maybe Device was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Device with id=" + id
        });
      });
};

// Delete all Devices from the database.
exports.deleteAll = (req, res) => {
    Device.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};
