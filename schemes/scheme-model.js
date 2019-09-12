const db = require('../data/db');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db.select('*').from('schemes')
}

function findById(id) {
    return db.select('*').from('schemes').where({id})
}

function findSteps(id) {
    return db.raw(`SELECT * FROM schemes JOIN steps 
    ON steps.scheme_id = schemes.id 
    WHERE schemes.id = ${id} ORDER BY steps.step_number`)
    // return db.select('*')
    // .from('schemes')
    // .join('steps','steps.scheme_id','=','schemes.id')
    // .where({scheme_id : Number(id)})
}

function add(scheme) {
    return db('schemes').insert(scheme)
    .then(([id]) => {
        return findById(id)
    })
}

function update(changes, id) {
    console.log('changes and id in update: ', changes.scheme_name, id);
    // return db('schemes').update(changes).where({id})
    return db.raw(`UPDATE schemes SET scheme_name = '${changes.scheme_name}' WHERE id = ${Number(id)};`)
    .then( () => findById(id))
    // return db('schemes').where({id}).update(changes);
}

function remove(id) {
    return db.raw(`DELETE FROM schemes WHERE id = ?`, id)
    // .then(arr => findById(id).then(resp => resp).catch(err => err))
    // return db('schemes').where({id}).del()
}

