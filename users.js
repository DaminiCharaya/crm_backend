const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.user_id)

  pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { user_id, first_name, last_name, email, phone_number, active_status, role_id } = request.body

  pool.query('INSERT INTO users (user_id, first_name, last_name, email, phone_number, active_status, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, first_name, last_name, email, phone_number, active_status, role_id], (error, results) => {
    if (error) {
      throw error
    }
    console.log('res', results.rows[0].user_id)
    response.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.user_id)
  const { first_name, last_name, email, phone_number, active_status } = request.body

  pool.query(
    'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4, active_status = $5 WHERE user_id = $6',
    [first_name, last_name, email, phone_number, active_status, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.user_id)

  pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}

// CREATE TABLE users(
// user_id INT PRIMARY KEY,
// first_name VARCHAR(50) NOT NULL, 
// last_name VARCHAR(50), 
// email VARCHAR(50) NOT NULL, 
// phone_number VARCHAR(50) NOT NULL, 
// role_id INT REFERENCES roles(role_id),
// );