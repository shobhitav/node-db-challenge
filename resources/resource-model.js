const db=require('../data/db-config.js');
 
module.exports={
   findResources,
   findResourceById,
    addResource,
  
}
// GET
function findResources(){
   return db('resources');
}

//GET BY ID
function findResourceById(id){
   return db('resources').
   where({id})
}

// POST
async function  addResource(resource){
    const [id] = await db('resources').insert(resource);
    return findResourceById(id);
}