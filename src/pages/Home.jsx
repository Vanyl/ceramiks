import Banner from '../components/Banner.jsx';
import Bestsellers from '../components/Bestsellers.jsx';
import '../sass/home.scss'


function Home() {
    
    return (
        <div className='home-container'>
            <Banner />
            <Bestsellers/>
        </div>
    )
}

export default Home;