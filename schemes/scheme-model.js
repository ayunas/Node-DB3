const db = require('../data/db');

module.exports = {
    find,
    findById,
    findSteps,
    add
}

function find() {
    return db.select('*').from('schemes')
}

function findById(id) {
    return db.select('*').from('schemes').where({id})
}

function findSteps(id) {
    return db.raw(`SELECT * FROM schemes JOIN steps ON steps.scheme_id = schemes.id where schemes.id = ${id}`)
    // return db.select('*')
    // .from('schemes')
    // .join('steps','steps.scheme_id','=','schemes.id')
    // .where({scheme_id : Number(id)})
}

function add(scheme) {
    return db('schemes').insert(scheme)
}

function update(changes, id) {
    
}





