import { query } from "../config/db"

const getUsers = (request, response) => {
  query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.user_id)

  query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { user_id, first_name, last_name, email, phone_number, active_status, role_id } = request.body

  query('INSERT INTO users (user_id, first_name, last_name, email, phone_number, active_status, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, first_name, last_name, email, phone_number, active_status, role_id], (error, results) => {
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

  query(
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

  query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}

// CREATE TABLE users(
//   user_id INT PRIMARY KEY,
//   first_name VARCHAR(50) NOT NULL,
//   last_name VARCHAR(50),
//   email VARCHAR(50) NOT NULL,
//   phone_number VARCHAR(50) NOT NULL,
//   active_status BOOLEAN NOT NULL,
//   role_id INT REFERENCES roles(role_id)
// )