
import requests from './api/requsts'
import './App.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Row from './components/Row'

function App() {
  return (
    <>
      <div className='app'>
        <Nav />
        <Banner />
        <Row
          title="NETFLIX ORIGINALS"
          id="NO"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row
          title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      </div>
      <Footer/>
    </>
  )
}

export default App
