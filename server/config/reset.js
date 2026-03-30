import { pool } from './database.js'
import './dotenv.js'

const createTables = async () => {
  const createTablesQuery = `
    DROP TABLE IF EXISTS bikes;

    CREATE TABLE bikes (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(255) NOT NULL,
      frame     VARCHAR(255),
      handlebar VARCHAR(255),
      wheels    VARCHAR(255),
      saddle    VARCHAR(255),
      price     DECIMAL(10, 2)
    );
  `
  try {
    await pool.query(createTablesQuery)
    console.log('Tables created successfully')
  } catch (error) {
    console.error('Error creating tables:', error)
  }
}

const seedTable = async () => {
  const insertBikeQuery = `
    INSERT INTO bikes (name, frame, handlebar, wheels, saddle, price)
    VALUES ($1, $2, $3, $4, $5, $6)
  `
  const exampleBikes = [
    {
      name: 'My Trail Rig',
      frame: 'Gloss Oxblood Red',
      handlebar: 'Flat Bar with Flared Rise',
      wheels: 'Roval Traverse 29 Alloy',
      saddle: 'WTB Silverado Team Chromoly',
      price: 1190,
    },
    {
      name: 'Speed Demon',
      frame: 'Gloss Jet Black',
      handlebar: 'Carbon Aerobar',
      wheels: 'Zipp 404 Firecrest Carbon Clincher',
      saddle: 'Fizik Tempo Argo R5 Carbon Rails',
      price: 2380,
    },
  ]

  for (const bike of exampleBikes) {
    await pool.query(insertBikeQuery, [
      bike.name,
      bike.frame,
      bike.handlebar,
      bike.wheels,
      bike.saddle,
      bike.price,
    ])
  }
  console.log('Bikes seeded successfully')
}

const setup = async () => {
  await createTables()
  await seedTable()
  await pool.end()
}

setup()
