const Fee = require('../models').Fee

module.exports = {
  // add fee
  async addFee(req, res){
    try {
      const data = {
        name: req.body.name,
        amount: req.body.amount
      }
      const response = await Fee.create(data)
      res.status(201).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to add fee'
      })
    }
  },

  // // get feesS
  async getAllFee(req, res) {
    try {
      const response = await Fee.findAll()
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to get all fees'
      })
    }
  },

  // // get fee
  async getFee(req, res) {
    try {
      const response = await Fee.findOne({
        where: {
          id: req.params.id
        }
      })
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to get fee'
      })
    }
  },

  // // edit fee
  async editFee(req, res) {
    try {
      const data = {
        name: req.body.name,
        amount: req.body.amount
      }

      const response = await Fee.update(data, {
        where: {
          id: req.params.id
        }
      })
      res.status(201).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to update fee'
      })
    }
  },

  // // remove fee
  async deleteFee(req, res) {
    try {
      await Fee.destroy({
        where: {
          id: req.params.id
        }
      })

      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to delete fee'
      })
    }
  },
}