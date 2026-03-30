import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import '../css/bikeDetails.css'
import { getBike, deleteBike } from '../services/bikesAPI'

const FEATURES = ['frame', 'handlebar', 'wheels', 'saddle']

const BikeDetails = ({ title }) => {
  const { id } = useParams()
  const [bike, setBike] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = title
    getBike(id).then(setBike)
  }, [id, title])

  const handleDelete = async () => {
    await deleteBike(id)
    navigate('/custombikes')
  }

  if (!bike) return <p style={{ padding: '2rem', color: 'white' }}>Loading...</p>

  return (
    <main className='bike-details'>
      <article>
        <header>
          <h2>🚲 {bike.name}</h2>
        </header>

        <div className='details-grid'>
          {FEATURES.map((feature) => (
            <div key={feature} className='detail-item'>
              <span className='detail-label'>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
              <span className='detail-value'>{bike[feature]}</span>
            </div>
          ))}
        </div>

        <p className='price'>💰 Total: ${Number(bike.price).toLocaleString()}</p>

        <footer>
          <button onClick={() => navigate('/custombikes')}>← Back</button>
          <button onClick={() => navigate(`/edit/${bike.id}`)}>Edit</button>
          <button className='delete-btn' onClick={handleDelete}>Delete</button>
        </footer>
      </article>
    </main>
  )
}

export default BikeDetails
