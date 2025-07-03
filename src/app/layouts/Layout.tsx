// import { getDynamicComponent } from '@/components/common/dynamic'
import { Outlet } from 'react-router-dom'

// const Navbar = getDynamicComponent('Navbar')

export function Layout() {
	return (
		<div className='app'>
			{/* <Navbar /> */}
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
