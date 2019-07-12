// libreria para trabajar con el tiempo (suma de fechas, saber tiempo de una 
// fecha a otra, etc). Se usa para obtener la fecha en un formato especifico
const moment = require('moment')
const entity = require('./entity.model') // modelo

// Hace la busqueda en mongo y usa aggregation para 
// modificar los documentos
function getEntities(req, res){
    const params = req.body
    // Se reciben las fechas en formato YYYY-MM-DD año-mes-dia
    // por ejemplo 2018-02-01 -> 01 de Febrero del 2018
    // incluso puede ser un new Date(). moment regresa un formato en especifico
    // que es como estan guardadas las fechas
    const startDate = moment(params.start).format("YYYY-MM-DDTmm:hh:ss")
    const endDate = moment(params.end).format("YYYY-MM-DDTmm:hh:ss")

    entity.aggregate([
        {
            $unwind: {
                path: "$entities",
                includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $match: {
                $and: [ // Obtiene todos los resultados que se encuentren
                    {   // entre las fechas proporcionadas
                        "start_time": { $gte: startDate }
                    },
                    {
                        "start_time": { $lte: endDate }
                    }
                ]
            }
        },
        {
            $group: {
                count: {
                    $sum: 1
                },
                _id: "$entities.value" // agrupa por value
            }
        },
        {
            $sort: {
                count: -1 // mayor a menor
            }
        },
        {
            $project: {
                topic: "$_id",
                count: "$count",
                _id: 0
            }
        }
    ])
    .then( result => {
        res.send(result)
    })
    .catch( error => {
        console.log(error)
    })
}

module.exports = {
    getEntities
}