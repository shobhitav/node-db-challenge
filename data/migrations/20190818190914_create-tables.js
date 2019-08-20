
exports.up = function(knex) {
  
    return (
        knex
        .schema
        .createTable('projects',tbl => {
            tbl.increments('id');
            tbl.text('name',128).notNullable();
            tbl.text('description',128);
            tbl.boolean('completed').notNullable().defaultTo(0);
        })
        .createTable('tasks',tbl => {
            tbl.increments('id');
            tbl.text('description',128).notNullable();
            tbl.text('notes',128);
            tbl.boolean('completed').notNullable().defaultTo(0);
            tbl.integer('project_id').unsigned().notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('resources',tbl => {
            tbl.increments('id');
            tbl.text('name',128).unique().notNullable();
            tbl.text('description',128);
        })
        .createTable('project_resources',tbl => {
            tbl.integer('project_id') 
                .unsigned()
                .notNullable()
                .references('id') 
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id') 
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.primary(['project_id','resource_id']) ;    
        })
    )
};

exports.down = function(knex) {
    return knex
            .schema
            .dropTableIfExists('project_resources') 
            .dropTableIfExists('resources') 
            .dropTableIfExists('tasks') 
            .dropTableIfExists('projects') ;
};
