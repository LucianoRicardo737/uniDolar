import { Router } from 'express';
import cheerio from 'cheerio';
import { webDolarHoy } from '../context/env';
import fetchData from '../context/fetchData';

const router = Router();

router.get('/', async (req, res) => {
  try {

        const body = await fetchData(webDolarHoy)

        const $ = cheerio.load(body);
        const dolarMore = $('div.cotizaciones_more')

        let dolarBancoNacionCompora, 
        dolarBancoNacionVenta, 
        libreCompora,
        libreVenta, 
        mayoristaCompora, 
        mayoristaVenta, 
        bolsaCompora, 
        bolsaVenta, 
        liquiCompora, 
        liquiVenta


        const filters = {
            nacion:{
                text:'Banco Nación',
                href: "/cotizaciondolaroficial"
            },
            libre:{
                text:'Dólar Libre',
                href: "/cotizaciondolarblue"
            },
            mayorista:{
                text:'Dólar Mayorista',
                href: "/cotizaciondolarmayorista"
            },
            bolsa:{
                text:'Dólar Bolsa',
                href: "/cotizaciondolarbolsa"
            },
            liqui:{
                text:'Contado con liqui',
                href: "/cotizaciondolarcontadoconliqui"
            },
        }
        

       dolarMore.find('a').map((i, link)=>{

            const key = link.attribs.href.toLowerCase()
            let data = $(link).text()

            switch (key) {
                case filters.nacion.href:
                    data = data.split(filters.nacion.text)[1]
                    dolarBancoNacionCompora = data.slice(0,6)
                    dolarBancoNacionVenta = data.slice(6.1)
                    break;
                case filters.libre.href:
                    data = data.split(filters.libre.text)[1]
                    libreCompora = data.slice(0,6)
                    libreVenta = data.slice(6.1)
                    break;
                case filters.mayorista.href:
                    data = data.split(filters.mayorista.text)[1]
                    mayoristaCompora = data.slice(0,6)
                    mayoristaVenta = data.slice(6.1)
                    break;
                case filters.bolsa.href:
                    data = data.split(filters.bolsa.text)[1]
                    bolsaCompora = data.slice(0,6)
                    bolsaVenta = data.slice(6.1)
                    break;
                case filters.liqui.href:
                    data = data.split(filters.liqui.text)[1]
                    liquiCompora = data.slice(0,6)
                    liquiVenta = data.slice(6.1)
                    break;
                default: data 
                    break; 
            }

            return data
        })

        function parse(data){
            return parseFloat(parseFloat(data).toFixed(2))
        }

        const data = {
            dolarBancoNacionCompora: parse(dolarBancoNacionCompora),
            dolarBancoNacionVenta: parse(dolarBancoNacionVenta),
            libreCompora: parse(libreCompora),
            libreVenta: parse(libreVenta),
            mayoristaCompora: parse(mayoristaCompora), 
            mayoristaVenta: parse(mayoristaVenta), 
            bolsaCompora: parse(bolsaCompora), 
            bolsaVenta: parse(bolsaVenta), 
            liquiCompora: parse(liquiCompora), 
            liquiVenta: parse(liquiVenta)
        }


  res.status(200).json(data)
  } catch (error) {
    res.status(400).json({msg:"error feching dolar from dolar hoy"})
  }
})


export default router