import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { Outlet } from 'react-router-dom'
import classes from './MainLayout.module.css'

export function MainLayout() {
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

export default MainLayout
