import Banner from '../components/Banner.jsx';
import NewCollection from '../components/NewCollection.jsx';
import Bestsellers from '../components/Bestsellers.jsx';
import Items from '../components/Items.jsx';
import '../sass/home.scss'


function Home() {
    
    return (
        <div className='home-container'>
            <Banner />
            <NewCollection />
            <Bestsellers/>
            <Items />
        </div>
    )
}

export default Home;