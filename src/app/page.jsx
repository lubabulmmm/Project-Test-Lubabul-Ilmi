import Header from '../components/Header';
import Banner from '../components/Banner';
import IdeasList from '../components/IdeasList';


export default function Home() {
    return (
        <div className='bg-white'>
            <Header />
            <Banner />
            <IdeasList />            
        </div>
    );
}
