const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
const getActivities = (request, response) => {
  pool.query('SELECT * FROM activities ORDER BY activity_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getActivityById = (request, response) => {
  const id = parseInt(request.params.activity_id)

  pool.query('SELECT * FROM activities WHERE activity_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createActivity = (request, response) => {
  const { activity_id, activity_type, activity_status, last_modified, start_date, end_date, start_time, end_time } = request.body

  pool.query('INSERT INTO activities (activity_id, activity_type, activity_status, start_date, end_date, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [activity_id, activity_type, activity_status, start_date, end_date, start_time, end_time], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Activity added with ID: ${results.rows[0].activity_id}`)
  })
}

const updateActivity = (request, response) => {
  const id = parseInt(request.params.activity_id)
  const { activity_type, activity_status, last_modified, start_date, end_date, start_time, end_time } = request.body

  pool.query(
    'UPDATE activities SET activity_type = $1, activity_status = $2, last_modified = $3, start_date =$4, end_date = $5, start_time = $6, end_time = $7 WHERE activity_id = $8',
    [activity_type, activity_status, last_modified, start_date, end_date, start_time, end_time, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Activity modified with ID: ${id}`)
    }
  )
}

const deleteActivity = (request, response) => {
  const id = parseInt(request.params.activity_id)

  pool.query('DELETE FROM activities WHERE activity_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Activity deleted with ID: ${id}`)
  })
}

module.exports = {
 getActivities,
 getActivityById,
 createActivity,
 updateActivity,
 deleteActivity
}


// CREATE TABLE activities(
//     activity_id INT PRIMARY KEY,
//     activity_type VARCHAR(50) NOT NULL,
//     activity_status VARCHAR(50) NOT NULL,
//     last_modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     start_date DATE,
//     end_date DATE,
//     start_time TIME,
//     end_time TIME
// );