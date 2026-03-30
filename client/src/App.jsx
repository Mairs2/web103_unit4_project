import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewBikes from './pages/ViewBikes'
import EditBike from './pages/EditBike'
import CreateBike from './pages/CreateBike'
import BikeDetails from './pages/BikeDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateBike title='To The Metal | Customize' />
    },
    {
      path:'/custombikes',
      element: <ViewBikes title='To The Metal | Custom Bikes' />
    },
    {
      path: '/custombikes/:id',
      element: <BikeDetails title='To The Metal | View' />
    },
    {
      path: '/edit/:id',
      element: <EditBike title='To The Metal | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App