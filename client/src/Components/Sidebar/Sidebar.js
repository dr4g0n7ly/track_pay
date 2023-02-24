import './Sidebar.css'
import rflogo from '../../public/rflogo.png'
import icon1 from '../../public/icon1.png'
import icon2 from '../../public/icon2.png'
import icon3 from '../../public/icon3.png'
import iconp from '../../public/iconp.png'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    return (
        <div className='Sidebar'>

            <Link className='logo-container'>
                <img src={rflogo} alt='logo' className='logo' />
            </Link>

            <div className='side-links'>
                <Link className='icon-container'>
                    <img src={icon1} alt='icon1' className='icon'/>
                </Link>

                <Link className='icon-container'>
                    <img src={icon2} alt='icon2' className='icon'/>
                </Link>

                <Link className='icon-container'>
                    <img src={icon3} alt='icon3' className='icon' />
                </Link>
            </div>

            <Link className='icon-container'>
                    <img src={iconp} alt='profile-icon' className='iconp' />
            </Link>

        </div>
        
    )
}

export default Sidebar