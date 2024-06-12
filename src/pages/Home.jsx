
import Navbar from '../components/Navbar.jsx'
import Banner from '../components/Banner.jsx';
import '../sass/home.scss'


function Home() {
    
    return (
        <div className='home-container'>
            <Navbar />
            <Banner />
        </div>
    )
}

export default Home;