const Room = require('../models').Room

module.exports = {

  // add room
  async addRoom(req, res) {
    try {
      let data = {
        name: req.body.name,
        code: req.body.code,
        limit: req.body.limit
      }
      let response = await Room.create(data)
      res.status(201).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to add room'
      })
    }
  },

  // get all rooms
  async getRooms(req, res) {
    try {
      let response = await Room.findAll()
      
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to get all rooms'
      })
    }
  },

  // get room
  async getRoom(req, res){
    try {
      let response = await Room.findOne({
        where: {
          id: req.params.id
        }
      })
  
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to get single room'
      })
    }
  },

  // update room
  async editRoom(req, res) {
    try {
      let response = await Room.update(
        {
          name: req.body.name,
          code: req.body.code,
          limit: req.body.limit
        },
        {
          where: {
            id: req.params.id
          }
        }
      )

      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to edit room'
      })
    }
  },

  // delete room
  async deleteRoom(req, res){
    try {
      await Room.destroy({
        where: {
          id: req.params.id
        }
      })

      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({
        error: 'Unable to delete room'
      })
    }
  }
}

