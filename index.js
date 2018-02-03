const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cfg = require("./knexfile")
const knex = require("knex")(cfg.development)

app.use(express.static("public"))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded())

app.get("/listpessoas", (req,res) =>{
    knex("contato").select().then(ret => {
        res.send(ret)
    }).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

app.get("/selectpessoas/:id", (req,res) =>{
    const selectContato = req.params.id
    console.log(selectContato)
    knex("contato").select().where("idcontato", selectContato).then(ret => {
        res.send(ret)
    }).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

app.post("/addcontato", (req, res) => {
    const contato = req.body
    knex("contato").insert(contato, "idcontato").then(ret => {
        res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
})

app.put("/updatecontato", (req, res) => {
    const updateContato = req.body
    const idcontato = updateContato.idcontato
    knex("contato").where(idcontato).update(updateContato)
        .catch(err=>{
            res.status(500)
            console.log(err)
        })
})

app.delete("/deletecontato/", (req, res) =>{
    const selectContato = req.params.id
    knex("contato").del().where("idcontato", id).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

knex.migrate.latest().then(_ =>
    app.listen(3000, _ =>
      console.log("server online!")))




