import { pool } from '../config/database.js'
import bikeOptions from '../data/bikes.js'

const getOptions = (_, res) => {
  res.status(200).json(bikeOptions)
}

const getBikes = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM bikes')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getBikeById = async (req, res) => {
  const { id } = req.params
  try {
    const results = await pool.query('SELECT * FROM bikes WHERE id = $1', [id])
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Bike not found' })
    }
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createBike = async (req, res) => {
  const { name, frame, handlebar, wheels, saddle, price } = req.body
  try {
    const results = await pool.query(
      `INSERT INTO bikes (name, frame, handlebar, wheels, saddle, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, frame, handlebar, wheels, saddle, price]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateBike = async (req, res) => {
  const { id } = req.params
  const { name, frame, handlebar, wheels, saddle, price } = req.body
  try {
    const results = await pool.query(
      `UPDATE bikes
       SET name = $1, frame = $2, handlebar = $3, wheels = $4, saddle = $5, price = $6
       WHERE id = $7
       RETURNING *`,
      [name, frame, handlebar, wheels, saddle, price, id]
    )
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Bike not found' })
    }
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteBike = async (req, res) => {
  const { id } = req.params
  try {
    const results = await pool.query(
      'DELETE FROM bikes WHERE id = $1 RETURNING *',
      [id]
    )
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Bike not found' })
    }
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
    getBikes, getBikeById, createBike, updateBike, deleteBike, getOptions
}
