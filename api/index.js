import express from 'express'
import cors from 'cors'
import { renderFile } from 'ejs'
import * as path from 'path'
import { object, string, date, number } from 'yup'

const HOST = '127.0.0.1'
const PORT = 3000

const app = express()

app.use(
  cors({
    origin: '*'
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', function (req, res) {
  res.json({ message: 'Go to page /registration' })
})

const pathOfViews = path.resolve('./dist')
app.use(express.static(pathOfViews))
app.set('views', pathOfViews)
app.set('view engine', 'html')
app.engine('html', renderFile)

app.get('/registration', function (req, res) {
  res.render('./index.html')
})

app.post('/registration', async function (req, res) {
  try {
    let schema = object({
      email: string().email().required(),
      person: string().required(),
      password: string().required()
    })

    let schemaPF = object({
      name: string().required(),
      document: number().required().min(11).max(11),
      birthDate: date().required(),
      phoneNumber: number().required().min(10).max(11)
    })

    let schemaPJ = object({
      corporateName: string().required(),
      document: number().required().min(14).max(14),
      openingDate: date().required(),
      phoneNumber: number().required().min(10).max(11)
    })

    await schema.validate(req.body)

    if (req.body.person === 'PF') {
      await schemaPF.validate(req.body)
    } else {
      await schemaPJ.validate(req.body)
    }

    res.json({
      message: 'Cadastro efetuado com sucesso!',
      data: req.body
    })
  } catch (e) {
    res.status(400).json({
      message: 'Erro ao efetuado cadastro!',
      data: req.body,
      errors: e.errors
    })
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server started on: ${HOST}:${PORT}`)
})
