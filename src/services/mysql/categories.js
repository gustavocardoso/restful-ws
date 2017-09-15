const categories = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM categories', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar as categorias', reject)
            return false
          }
          resolve({ categories: results })
        })
      })
    },

    getOne: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT name FROM categories WHERE id = ?', [id], (error, result) => {
          if (error) {
            errorHandler(error, `Falha ao bucar categoria com o ID ${id}`, reject)
            return false
          }

          if (result.length === 0) {
            errorHandler(error, 'Falha ao buscar a categoria', reject)
            return false
          }

          const name = result[0].name
          resolve({ name, id })
        })
      })
    },

    save: (name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar nova categoria ${name}`, reject)
            return false
          }
          resolve({ category: { name, id: results.insertId } })
        })
      })
    },

    update: (id, name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
            return false
          }
          resolve({ category: { name, id }, affectedRows: results.affectedRows })
        })
      })
    },

    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao deletar a categoria com ID ${id}`, reject)
            return false
          }
          resolve({ message: 'Categoria removida com sucesso!', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = categories
