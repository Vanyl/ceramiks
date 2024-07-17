import Banner from '../components/Banner.jsx';
import NewCollection from '../components/NewCollection.jsx';
import Bestsellers from '../components/Bestsellers.jsx';
import Items from '../components/Items.jsx';
import '../sass/home.scss'
import { useAuth } from '../context/authContext.jsx';

function Home() {
    const { messageSession, authState } = useAuth();

    return (
        <div className='home-container'>
            <Banner />
{/*             {messageSession ? <p className='message-session'>{messageSession}</p> : ''}
 */}            <NewCollection />
            <Bestsellers/>
            <Items />
        </div>
    )
}

export default Home;