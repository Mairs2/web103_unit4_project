import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import '../css/viewBikes.css'
import { getAllBikes, deleteBike } from '../services/bikesAPI'

const FEATURES = ['frame', 'handlebar', 'wheels', 'saddle']

const ViewBikes = ({ title }) => {
  const [bikes, setBikes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    document.title = title
    getAllBikes().then(setBikes)
  }, [title])

  const handleDelete = async (id) => {
    await deleteBike(id)
    setBikes(bikes.filter((bike) => bike.id !== id))
  }

  if (!bikes.length) return <p style={{ padding: '2rem', color: 'white' }}>No bikes yet. Go customize one!</p>

  return (
    <main className='view-bikes'>
      <h2>Custom Bikes</h2>

      {bikes.map((bike) => (
        <article key={bike.id}>
          <header>
            <h3>🚲 {bike.name}</h3>
          </header>

          <div className='bike-features'>
            {FEATURES.map((feature) => (
              <p key={feature}>
                <strong>{feature.charAt(0).toUpperCase() + feature.slice(1)}:</strong> {bike[feature]}
              </p>
            ))}
            <p className='price'>💰 ${Number(bike.price).toLocaleString()}</p>
          </div>

          <footer>
            <button onClick={() => navigate(`/custombikes/${bike.id}`)}>Details</button>
            <button onClick={() => navigate(`/edit/${bike.id}`)}>Edit</button>
            <button className='delete-btn' onClick={() => handleDelete(bike.id)}>Delete</button>
          </footer>
        </article>
      ))}
    </main>
  )
}

export default ViewBikes
