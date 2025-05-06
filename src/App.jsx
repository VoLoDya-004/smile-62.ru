import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Basic from './components/Basic/Basic'
import Favourites from './components/Favourites/Favourites'
import Profile from './components/Profile/Profile'
import Basket from './components/Basket/Basket'
import ProgressBar from './components/sub-components/ProgressBar'
import ScrollButton from './components/sub-components/ScrollButton'
import './stylesheets_css/styles.css'

export default function App() {
  

  return (
    <>
    <Router>
      <Header />

      <main id='content'>
        
      <ProgressBar />   
        <Routes>
          <Route path='/' element={<Basic />} />                
          <Route path='/favourites' element={<Favourites />} />                   
          <Route path='/profile' element={<Profile />} />                   
          <Route path='/basket' element={<Basket />} />                   
          </Routes>
      <ScrollButton />
      </main>
      
      <Footer />
    </Router>
    </>
  )
}



