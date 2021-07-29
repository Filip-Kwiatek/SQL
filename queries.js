const rake = require('node-rake')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '3C',
  password: '123',
  port: 5432,
})

const getPosts = (_, response) => {
  pool.query('SELECT * FROM posts', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request) => {
  const { name, dayofweek, timestart, timeend } = request.body
  console.log({name, dayofweek, timestart, timeend});
  pool.query('INSERT INTO posts (name, day_of_week, time_start, time_end) VALUES ($1, $2, $3, $4) RETURNING *', [name, dayofweek, timestart, timeend], (error, results) => {
    if (error) {
      throw error
    }

    // response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    return results.rows[0];
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { nazwa, email } = request.body

  pool.query(
    'UPDATE users SET nazwa = $1, email = $2 WHERE id = $3',
    [nazwa, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getPosts,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}