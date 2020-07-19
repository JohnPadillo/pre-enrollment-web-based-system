const Subject = require('../models').Subject

module.exports = {
    async getSubjects(req, res){
        try {
            let data = await Subject.findAll({
                include: ['courses']
            })
            res.send(data)
        } catch (error) {
            res.status(400).send({
                Error: `Unable to get all subjects`
            })
        }
    },

    async getSubject(req, res){
        try {
            let data = await Subject.findOne({
                where: {
                    id: req.params.id
                }
            })

            res.send(data)
        } catch (error) {
            res.status(400).send({
                Error: `Unable to get this subject`
            })
        }
    },

    async addSubject(req, res){
        try {
            let data = {
                code: req.body.code,
                name: req.body.name,
                units: req.body.units,
                prerequisites: req.body.prerequisites
            }

            let response = await Subject.create(data)

            res.send(response)
        } catch (error) {
            res.status(400).send({
                Error: `Unable to add this subject`
            })
        }
    },

    async editSubject(req, res){
        try {
            Subject.update(
                {
                    name: req.body.name,
                    code: req.body.code,
                    units: req.body.units,
                    prerequisites: req.body.prerequisites
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            
            let response = await Subject.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.send(response)
        } catch (error) {
            res.status(400).send({
                Error: `Unable to edit this subject`
            })
        }},

        async deleteSubject(req, res){
            try {
                let data = Subject.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.send(data)
            } catch (error) {
                res.status(400).send({
                    Error: `Unable to delete`
                })
            }
        }
    
}