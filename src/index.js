import express from 'express';
import morgan from 'morgan'
import 'dotenv/config'
import dolarHoy from './routes/dolarhoy_routes';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('common'))


const whitelist = [`http://192.168.1.11`, 'http://192.168.1.4' , 'https://maxtecno.com.ar/', 'https://www.maxtecno.com.ar/']


app.use(cors(
  {
    origin: "*",
    creadentials: false,
    optionsSuccessStatus: 200
  }
))

app.use('/dolarHoy', dolarHoy);


app.set('port', process.env.PORT || 7000)
const server = app.listen(app.get('port'), () => {
  console.log(`Connection successful on port ${app.get('port')}`)
})


export default app