import { GiHamburgerMenu } from 'react-icons/gi';
import { MdNotificationsActive, MdMessage } from 'react-icons/md';
import logo from '../../imgs/icon.png';

import './navbar.css';

const Navbar = () => {
	return (
		<>
			<section className='container-navbar'>
				<div className='menu-hamburguesa-navbar'>
					<GiHamburgerMenu />
				</div>
				<div className='icons-navbar'>
					<span>
						<MdNotificationsActive />
					</span>
					<span>
						<MdMessage />
					</span>
					<span>
						<img src={logo} alt='logo' width={30} height={30} />
					</span>
				</div>
			</section>
		</>
	);
};

export default Navbar;
