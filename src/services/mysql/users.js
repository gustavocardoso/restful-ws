const sha1 = require('sha1')

const users = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT id, email FROM users', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar os usuários', reject)
            return false
          }
          resolve({ users: results })
        })
      })
    },

    getOne: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT name FROM users WHERE id = ?', [id], (error, result) => {
          if (error) {
            errorHandler(error, `Falha ao bucar usuário com o ID ${id}`, reject)
            return false
          }

          if (result.length === 0) {
            errorHandler(error, 'Falha ao buscar a usuário', reject)
            return false
          }

          const name = result[0].name
          resolve({ name, id })
        })
      })
    },

    save: (email, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, sha1(password)], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar nova usuário ${email}`, reject)
            return false
          }
          resolve({ user: { email, password, id: results.insertId } })
        })
      })
    },

    update: (id, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('UPDATE users SET password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a usuário ${id}`, reject)
            return false
          }
          resolve({ user: { id, password }, affectedRows: results.affectedRows })
        })
      })
    },

    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao deletar a usuário com ID ${id}`, reject)
            return false
          }
          resolve({ message: 'usuário removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = users
