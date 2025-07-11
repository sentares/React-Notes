import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context'
import { internalPaths } from './RoutePaths'

export const PrivateRoute = () => {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	if (!isAuthenticated) {
		return (
			<Navigate to={internalPaths.auth} replace state={{ from: location }} />
		)
	}

	return <Outlet />
}
