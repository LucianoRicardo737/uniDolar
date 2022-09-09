import express from 'express';
import morgan from 'morgan'
import 'dotenv/config'
import dolarHoy from './routes/dolarhoy_routes';
import infobae from './routes/infobae_routes';
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('common'))

app.use(cors(
  {
    origin: "*",
    creadentials: false,
    optionsSuccessStatus: 200
  }
))

app.use('/uniCoin/dolarHoy', dolarHoy);
app.use('/uniCoin/infobae', infobae);



app.set('port', process.env.PORT || 7000)
app.listen(app.get('port'), () => {
  console.log(`Connection successful on port ${app.get('port')}`)
})


export default app