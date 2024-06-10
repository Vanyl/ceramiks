//import './sass/style.scss'
import Navbar from '../components/Navbar.jsx'
import '../sass/home.scss'


function Home() {
    return (
        <div className='home-container'>
            <Navbar />
            <div>
                <p>Helloooooo !</p>
                <button>Click me</button>
            </div>
        </div>
    )
}

export default Home;