import { Router } from 'express';
import { apiInfobae } from '../context/env';

const router = Router();

router.get('/', async (req, res) => {

    async function fetchData() {
        try {
            const response = await fetch(apiInfobae, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0',
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'es-AR,es;q=0.8,en-US;q=0.5,en;q=0.3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Origin': 'https://www.infobae.com',
                    'Referer': 'https://www.infobae.com/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data
            } else {
                console.log('La solicitud no fue exitosa. Código de estado:', response.status);
            }
        } catch (error) {
            console.log('Error al realizar la solicitud:', error.message);
        }
    }

    const dolarValues = await fetchData();

    const filters = {
        nacion: {
            ric: 'ARS=BNAR',
            name: 'Dólar Banco Nación'
        },
        tarjeta: {
            ric: 'ARST=',
            name: 'Dólar Turista'
        },
        libre: {
            ric: 'ARSB=',
            name: 'Dólar Libre'
        },
        mep: {
            ric: 'ARSCONT0=',
            name: 'Contado con Liqui'
        },
        liqui: {
            ric: 'ARSMEP0=',
            name: 'Dólar MEP'
        }
    }

    const filteredData = Object.values(filters).map(filter => {
        return dolarValues.find(item => item.ric === filter.ric);
    });

    let dolarReturn = {
        nacion: {
            venta: 0,
            compra: 0,
            name: filters.nacion.name
        },
        tarjeta: {
            venta: 0,
            compra: 0,
            name: filters.tarjeta.name
        },
        libre: {
            venta: 0,
            compra: 0,
            name: filters.libre.name
        },
        mep: {
            venta: 0,
            compra: 0,
            name: filters.mep.name
        },
        liqui: {
            venta: 0,
            compra: 0,
            name: filters.liqui.name
        }
    }

    filteredData.forEach(item => {
        switch (item.ric) {
            case 'ARS=BNAR':
                dolarReturn.nacion.venta = item.sellValue;
                dolarReturn.nacion.compra = item.buyValue;
                break;
            case 'ARST=':
                dolarReturn.tarjeta.venta = item.sellValue; 
                dolarReturn.tarjeta.compra = item.buyValue;
                break;
            case 'ARSB=':
                dolarReturn.libre.venta = item.sellValue;
                dolarReturn.libre.compra = item.buyValue;
                break;
            case 'ARSCONT0=':
                dolarReturn.mep.venta = item.sellValue;
                dolarReturn.mep.compra = item.buyValue;
                break;
            case 'ARSMEP0=':
                dolarReturn.liqui.venta = item.sellValue;
                dolarReturn.liqui.compra = item.buyValue;
                break;
            default:
                break;
        }
    });

    res.status(200).json(dolarReturn)

})


export default router