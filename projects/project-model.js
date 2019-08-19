const db=require('../data/db-config.js');
 
module.exports={
   find,
   findById,
   findTasks,
    add,
    addTask,
  
}
// GET
function find(){
   return db('projects');
}

//GET BY ID
function findById(id){
   return db('projects').
   where({id})
}

// POST
async function add(project){
   const [id] = await db('projects').insert(project);
   return findById(id);
}

// GET TASKS BY PROJECT_ID
function findTasks(project_id){
   return db('projects')
   .join('tasks','projects.id','tasks.project_id')
   .select('projects.name','tasks.id','tasks.description','tasks.notes','tasks.completed')
   .where({project_id})
   .orderBy('tasks.id')
  }

  // ADD TASKS 
async function addTask(task){
   
   const [id] = await db('tasks').insert(task);
   return findById(id); 
}

