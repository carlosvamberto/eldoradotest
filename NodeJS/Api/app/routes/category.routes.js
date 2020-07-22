module.exports = app => {
    const category = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", category.create);
  
    // Retrieve all Tutorials
    router.get("/", category.findAll);
    
    // Retrieve a single Tutorial with id
    router.get("/:id", category.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", category.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", category.delete);
  
    // Create a new Tutorial
    router.delete("/", category.deleteAll);
  
    app.use('/api/categories', router);
  };