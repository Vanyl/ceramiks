import Banner from '../components/Banner.jsx';
import NewCollection from '../components/NewCollection.jsx';
import '../sass/home.scss'


function Home() {
    
    return (
        <div className='home-container'>
            <Banner />
            <NewCollection />
        </div>
    )
}

export default Home;