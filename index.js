const app = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")

app.use(express.static("public"))
app.use(morgan("dev"))
app.user(bodyParser.urlencoded())

app.get("/listpessoas", (req,res) =>{
    knex("contato").select().then(ret => {
        res.send(ret)
    }).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

app.get("/selectpessoas", (req,res) =>{
    const selectContato = req.query
    knex("contato").select().where(selectContato).then(ret => {
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

app.delete("/deletecontato/:id", (req, res) =>{
    const selectContato = req.params.idcontato
    knex("contato").del().where(selectContato).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })
})

knex.migrate.latest().then(_ =>
    app.listen(3000, _ =>
      console.log("server online!")))




