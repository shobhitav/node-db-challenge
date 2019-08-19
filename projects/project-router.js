const express = require('express');
//  const knex = require('knex');
const db= require('../data/db-config.js');
const Projects = require('./project-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects); 
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve projects' });
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  try {
     const project = await Projects.findById(id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Could not find project with given id.' })
        }
       } catch (err) {
            res.status(500).json({ message: 'Failed to get projects' });
    }
   
});

router.post('/', async (req, res) => {
    const projectData = req.body;
    try {
        const project = await Projects.add(projectData);
        res.status(201).json(project);
      } catch (err) {
        res.status(500).json({ message: 'Failed to create new project' });
      }
});

router.get('/:id/tasks', async (req, res) => {
    const { id } = req.params;
  
    try {
      const tasks = await Projects.findTasks(id);
  
      if (tasks.length) {
        res.json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given project' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get tasks' });
    }
  });

  router.post('/:id/tasks', async (req, res) => {
    const taskData = req.body;
    try {
        const task = await Projects.addTask(taskData);
        res.status(201).json(task);
      } catch (err) {
        res.status(500).json({ message: 'Failed to create new task' });
      }
});


module.exports = router;