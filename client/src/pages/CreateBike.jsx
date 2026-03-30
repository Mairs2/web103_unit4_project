import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import '../css/createBike.css'
import { createBike } from '../services/bikesAPI'
import { getBikeOptions } from '../services/bikeOptionsAPI'
import { calcTotalPrice } from '../utilities/calcPrice'
import { validateBike } from '../utilities/validation'
import handlebarImages from '../utilities/handlebarImages'
import wheelImages from '../utilities/wheelImages'
import saddleImages from '../utilities/saddleImages'


const defaultSelections = {
  name: '',
  frame: '',
  handlebar: '',
  wheels: '',
  saddle: '',
}

const CreateBike = ({ title }) => {
  const [bikeOptions, setBikeOptions] = useState(null)
  const [selections, setSelections] = useState(defaultSelections)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = title
    getBikeOptions().then(setBikeOptions)
  }, [title])

  const totalPrice = bikeOptions ? calcTotalPrice(selections, bikeOptions) : 0

  const handleChange = (e) => {
    setSelections({ ...selections, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleSelect = (feature, name) => {
    setSelections((prev) => ({ ...prev, [feature]: name }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validateBike(selections)
    if (validationError) {
      setError(validationError)
      return
    }
    const result = await createBike({ ...selections, price: totalPrice })
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/custombikes')
  }

  if (!bikeOptions) return <p>Loading options...</p>

  const selectedFrame = bikeOptions.frame.find((f) => f.name === selections.frame)

  return (
    <main className='create-bike'>
      <section className='preview-panel'>
        <article>
          <header>
            <h2>🚲 {selections.name || 'Your Custom Bike'}</h2>
          </header>

          <div className='preview-feature'>
            <strong>Frame:</strong>{' '}
            {selectedFrame ? (
              <span className='preview-color-row'>
                <span className='preview-swatch' style={{ backgroundColor: selectedFrame.hex }} />
                {selectedFrame.name}
              </span>
            ) : <em>Not selected</em>}
          </div>

          <div className='preview-feature'>
            <strong>Handlebar:</strong>{' '}
            {selections.handlebar ? (
              <span className='preview-color-row'>
                <img src={handlebarImages[selections.handlebar]} alt={selections.handlebar} className='preview-thumb' />
                {selections.handlebar}
              </span>
            ) : <em>Not selected</em>}
          </div>

          <div className='preview-feature'>
            <strong>Wheels:</strong>{' '}
            {selections.wheels ? (
              <span className='preview-color-row'>
                <img src={wheelImages[selections.wheels]} alt={selections.wheels} className='preview-thumb' />
                {selections.wheels}
              </span>
            ) : <em>Not selected</em>}
          </div>

          <div className='preview-feature'>
            <strong>Saddle:</strong>{' '}
            {selections.saddle ? (
              <span className='preview-color-row'>
                <img src={saddleImages[selections.saddle]} alt={selections.saddle} className='preview-thumb' />
                {selections.saddle}
              </span>
            ) : <em>Not selected</em>}
          </div>

          <footer>
            <h3>💰 Total: ${totalPrice.toLocaleString()}</h3>
          </footer>
        </article>
      </section>

      <section className='form-panel'>
        <article>
          <header><h2>Customize Your Bike</h2></header>

          <form onSubmit={handleSubmit}>
            <label>
              Bike Name
              <input
                type='text'
                name='name'
                placeholder='e.g. My Trail Rig'
                value={selections.name}
                onChange={handleChange}
              />
            </label>

            {/* Frame — color swatches */}
            <div className='feature-section'>
              <label className='feature-label'>Frame Color</label>
              <div className='color-cards'>
                {bikeOptions.frame.map((opt) => (
                  <div
                    key={opt.name}
                    className={`color-card ${selections.frame === opt.name ? 'selected' : ''}`}
                    onClick={() => handleSelect('frame', opt.name)}
                    title={opt.name}
                  >
                    <div className='color-swatch' style={{ backgroundColor: opt.hex }} />
                    <span className='color-name'>{opt.name}</span>
                    <span className='color-price'>+${opt.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Handlebar — image cards */}
            <div className='feature-section'>
              <label className='feature-label'>Handlebar</label>
              <div className='image-cards'>
                {bikeOptions.handlebar.map((opt) => (
                  <div
                    key={opt.name}
                    className={`image-card ${selections.handlebar === opt.name ? 'selected' : ''}`}
                    onClick={() => handleSelect('handlebar', opt.name)}
                  >
                    <img src={handlebarImages[opt.name]} alt={opt.name} />
                    <span className='color-name'>{opt.name}</span>
                    <span className='color-price'>+${opt.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wheels — image cards */}
            <div className='feature-section'>
              <label className='feature-label'>Wheels</label>
              <div className='image-cards'>
                {bikeOptions.wheels.map((opt) => (
                  <div
                    key={opt.name}
                    className={`image-card ${selections.wheels === opt.name ? 'selected' : ''}`}
                    onClick={() => handleSelect('wheels', opt.name)}
                  >
                    <img src={wheelImages[opt.name]} alt={opt.name} />
                    <span className='color-name'>{opt.name}</span>
                    <span className='color-price'>+${opt.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Saddle — image cards */}
            <div className='feature-section'>
              <label className='feature-label'>Saddle</label>
              <div className='image-cards'>
                {bikeOptions.saddle.map((opt) => (
                  <div
                    key={opt.name}
                    className={`image-card ${selections.saddle === opt.name ? 'selected' : ''}`}
                    onClick={() => handleSelect('saddle', opt.name)}
                  >
                    <img src={saddleImages[opt.name]} alt={opt.name} />
                    <span className='color-name'>{opt.name}</span>
                    <span className='color-price'>+${opt.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {error && <p className='error'>{error}</p>}

            <footer>
              <button type='submit'>Save Bike</button>
            </footer>
          </form>
        </article>
      </section>
    </main>
  )
}

export default CreateBike
