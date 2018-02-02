const contatos = [
    { idcontatos: 1, nome: "Alexandre", telefone: "913413183", datanascimento:"1997-10-12" },
    { idcontatos: 2, nome: "Bianca", telefone: "913413183", datanascimento:"1995-02-13" },
    { idcontatos: 3, nome: "Carlos", telefone: "913413183", datanascimento:"1987-10-12" },
    { idcontatos: 4, nome: "Daniela", telefone: "913413183", datanascimento:"1985-01-21" },
    { idcontatos: 5, nome: "Elane", telefone: "913413183", datanascimento:"1999-07-03" }
]
exports.up = knex => knex("contato").insert(contatos)

exports.down = knex => knex("contato").del()
    .whereIn("idcontatos", contatos.map(e => e.idcontatos))