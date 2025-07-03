import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { internalPaths } from './RoutePaths'
import { Layout } from '@/app/layouts'

const HomePage = lazy(() => import('@/pages/home'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))

const withSuspense = (element: React.ReactNode) => (
	<Suspense fallback={<h2>Loading...</h2>}>{element}</Suspense>
)

export const Router = createBrowserRouter([
	{
		path: internalPaths.home,
		element: <Layout />,
		errorElement: withSuspense(<NotFoundPage />),
		children: [
			{ index: true, element: withSuspense(<HomePage />) },
			// {
			// 	element: <PrivateRoute />,
			// 	children: [
			// 		{
			// 			path: internalPaths.characters.list,
			// 			children: [
			// 				{ index: true, element: withSuspense(<CharactersList />) },
			// 				{ path: ':id', element: withSuspense(<CharacterDetail />) },
			// 			],
			// 		},
			// 		{
			// 			path: internalPaths.locations.list,
			// 			children: [
			// 				{ index: true, element: withSuspense(<LocationsList />) },
			// 				{ path: ':id', element: withSuspense(<LocationDetail />) },
			// 			],
			// 		},
			// 		{
			// 			path: internalPaths.episodes.list,
			// 			children: [
			// 				{ index: true, element: withSuspense(<EpisodesList />) },
			// 				{ path: ':id', element: withSuspense(<EpisodeDetail />) },
			// 			],
			// 		},
			// 	],
			// },
		],
	},
	// {
	// 	path: internalPaths.login,
	// 	element: withSuspense(<Login />),
	// },
])
