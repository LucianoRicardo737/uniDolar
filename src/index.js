import express from 'express';
import morgan from 'morgan'
import 'dotenv/config'
import dolarHoy from './routes/dolarhoy_routes';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('common'))


// const whitelist = [`http://192.168.1.11:3002`, 'http://alinstante.ar',  'https://www.alinstante.ar', 'https://alinstante.ar']


// app.use(cors(
//   {
//     origin: whitelist,
//     creadentials: true,
//     optionsSuccessStatus: 200
//   }
// ))

// const stats_route = require('./routes/stats_route')
// app.use('/back/order/actions', order_route)




app.use('/dolarHoy', dolarHoy);


app.set('port', process.env.PORT || 7000)
const server = app.listen(app.get('port'), () => {
  console.log(`Connection successful on port ${app.get('port')}`)
})


export default app