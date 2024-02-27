import { query } from "../config/db"

const getRoles = (request, response) => {
  query('SELECT * FROM roles ORDER BY role_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRole = (request, response) => {
  const { role_id, role, permissions } = request.body

  query('INSERT INTO roles (role_id, role, permissions ) VALUES ($1, $2, $3) RETURNING *', [role_id, role, permissions ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Role added with ID: ${results.rows[0].role_id}`)
  })
}

const updateRole = (request, response) => {
  const id = parseInt(request.params.role_id)
  const { role, permissions  } = request.body

  query(
    'UPDATE roles SET role = $1, permissions = $2 WHERE role_id = $3',
    [role, permissions, id ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Role modified with ID: ${id}`)
    }
  )
}

const deleteRole = (request, response) => {
  const id = parseInt(request.params.role_id)

  query('DELETE FROM roles WHERE role_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Role deleted with ID: ${id}`)
  })
}

export default {
  getRoles,
  createRole,
  updateRole,
  deleteRole
}

// CREATE TABLE roles(
//     role_id INT PRIMARY KEY,
//     role VARCHAR(50) NOT NULL,
//     permissions VARCHAR(50) NOT NULL
// )