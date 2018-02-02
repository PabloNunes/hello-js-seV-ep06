
exports.up = knex => knex.schema.createTable("contato", tb =>{
    tb.increments("idcontato")
    tb.string("nome")
    tb.string("telefone")
    tb.date("datanascimento")
})

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("contato")
};
