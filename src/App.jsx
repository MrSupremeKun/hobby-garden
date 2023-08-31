import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Series from './pages/Series'
import Search from './pages/Search'
import NotFound from './pages/NotFound'
import Details from './components/details'
import Thrillers from './components/thrillers'

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/search' element={<Search />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/thrillers/:id' element={<Thrillers />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App