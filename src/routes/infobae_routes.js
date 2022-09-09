import { Router } from 'express';
import cheerio from 'cheerio';
import { webInfobae } from '../context/env';
import fetchData from '../context/fetchData';

const router = Router();

router.get('/', async (req, res) => {
  try {

        const body = await fetchData(webInfobae)

        const $ = cheerio.load(body);
        const dolarMore = $('div.excbar')


        let nacion, 
        tarjeta,
        libre, 
        mep, 
        liqui,
        rp


        const filters = {
            nacion:{
                text:'Dólar Banco Nación',
                href: "https://www.infobae.com/tag/dolar-hoy"
            },
            tarjeta:{
                text:'Dólar tarjeta',
                href: "https://www.infobae.com/tag/dolar-tarjeta"
            },
            libre:{
                text:'Dólar Libre',
                href: "https://www.infobae.com/tag/dolar-libre"
            },
            mep:{
                text:'Dólar MEP',
                href: "https://www.infobae.com/tag/dolar-mep"
            },
            liqui:{
                text:'Contado con liqui',
                href: "https://www.infobae.com/tag/contado-con-liqui"
            },
            rp:{
                text:'Riesgo País',
                href: "https://www.infobae.com/tag/riesgo-pais"
            },
        }
        
        
       dolarMore.find('a').map((i, link)=>{

            const key = link.attribs.href.toLowerCase()
            let data = $(link).text()
            

            switch (key) {
                case filters.nacion.href:
                    data = data.split(filters.nacion.text)[1]
                    nacion = data
                    break;
                case filters.tarjeta.href:
                    data = data.split(filters.tarjeta.text)[1]
                    tarjeta = data
                    break;
                case filters.libre.href:
                    data = data.split(filters.libre.text)[1]
                    libre = data
                    break;
                case filters.mep.href:
                    data = data.split(filters.mep.text)[1]
                    mep = data
                    break;
                case filters.liqui.href:
                    data = data.split(filters.liqui.text)[1]
                    liqui = data
                    break;
                case filters.rp.href:
                    data = data.split(filters.rp.text)[1]
                    rp = data
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
            nacion: parse(nacion),
            tarjeta: parse(tarjeta),
            libre: parse(libre),
            mep: parse(mep),
            liqui: parse(liqui), 
            rp: parse(rp)
        }


  res.status(200).json(data)
  } catch (error) {
    res.status(400).json({msg:"error feching dolar from infobae"})
  }
})


export default router