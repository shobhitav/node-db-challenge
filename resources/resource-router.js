const express = require('express');
const db= require('../data/db-config.js');
const Resources = require('./resource-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resources = await Resources.findResources();
    res.json(resources); 
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve resources' });
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  try {
     const resource = await Resources. findResourceById(id);
        if (resource) {
            res.json(resource);
        } else {
            res.status(404).json({ message: 'Could not find resource with given id.' })
        }
       } catch (err) {
            res.status(500).json({ message: 'Failed to get resources' });
    }
   
});

router.post('/', async (req, res) => {
    const resourceData = req.body;
    try {
        const resource = await Resources. addResource(resourceData);
        res.status(201).json(resource);
      } catch (err) {
        res.status(500).json({ message: 'Failed to create new resource' });
      }
});

module.exports = router;