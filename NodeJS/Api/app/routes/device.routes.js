module.exports = app => {
    const devices = require("../controllers/device.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", devices.create);
  
    // Retrieve all Tutorials
    router.get("/", devices.findAll);
    
    // Retrieve a single Tutorial with id
    router.get("/:id", devices.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", devices.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", devices.delete);
  
    // Create a new Tutorial
    router.delete("/", devices.deleteAll);
  
    app.use('/api/devices', router);
  };