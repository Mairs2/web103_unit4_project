import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import '../css/editBike.css'
import { getBike, updateBike } from '../services/bikesAPI'
import { getBikeOptions } from '../services/bikeOptionsAPI'
import { calcTotalPrice } from '../utilities/calcPrice'
import { validateBike } from '../utilities/validation'
import handlebarImages from '../utilities/handlebarImages'
import wheelImages from '../utilities/wheelImages'
import saddleImages from '../utilities/saddleImages'

const EditBike = ({ title }) => {
  const { id } = useParams()
  const [bikeOptions, setBikeOptions] = useState(null)
  const [selections, setSelections] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = title
    Promise.all([getBike(id), getBikeOptions()]).then(([bike, options]) => {
      setSelections({
        name: bike.name,
        frame: bike.frame,
        handlebar: bike.handlebar,
        wheels: bike.wheels,
        saddle: bike.saddle,
      })
      setBikeOptions(options)
    })
  }, [id, title])

  const totalPrice = bikeOptions && selections ? calcTotalPrice(selections, bikeOptions) : 0

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
    await updateBike(id, { ...selections, price: totalPrice })
    navigate(`/custombikes/${id}`)
  }

  if (!selections || !bikeOptions) return <p style={{ padding: '2rem', color: 'white' }}>Loading...</p>

  const selectedFrame = bikeOptions.frame.find((f) => f.name === selections.frame)

  return (
    <main className='edit-bike'>
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
          <header><h2>Edit Your Bike</h2></header>

          <form onSubmit={handleSubmit}>
            <label>
              Bike Name
              <input
                type='text'
                name='name'
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
              <button type='button' onClick={() => navigate(`/custombikes/${id}`)}>Cancel</button>
              <button type='submit'>Save Changes</button>
            </footer>
          </form>
        </article>
      </section>
    </main>
  )
}

export default EditBike
