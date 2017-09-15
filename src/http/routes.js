const db = require('../services/mysql')

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...')
    next()
  })

  server.get('category', async (req, res, next) => {
    try {
      res.send(await db.categories().all())
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.get('category/:id', async (req, res, next) => {
    const { id } = req.params

    try {
      res.send(await db.categories().getOne(id))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.post('category', async (req, res, next) => {
    const { name } = req.params

    try {
      res.send(await db.categories().save(name))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.put('category', async (req, res, next) => {
    const { id, name } = req.params

    try {
      res.send(await db.categories().update(id, name))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.del('category', async (req, res, next) => {
    const { id } = req.query

    try {
      res.send(await db.categories().del(id))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })
}

module.exports = routes
