import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { Outlet } from 'react-router-dom'
import classes from './Layout.module.css'

export function Layout() {
	return (
		<div className={classes.layout}>
			<Header />
			<main>
				<div className={classes.inner}>
					<Sidebar />
					<Outlet />
				</div>
			</main>
		</div>
	)
}

export default Layout
