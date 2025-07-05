import { Layout } from '@/app/layouts'
import { ErrorBoundary } from '@/shared/components/errorBoundary'
import { Center, Loader } from '@mantine/core'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { internalPaths } from './RoutePaths'

const HomePage = lazy(() => import('@/pages/home'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))

const Auth = lazy(() => import('@/pages/auth'))

const withSuspense = (element: React.ReactNode) => (
	<ErrorBoundary>
		<Suspense
			fallback={
				<Center h='100vh'>
					<Loader size='xl' />
				</Center>
			}
		>
			{element}
		</Suspense>
	</ErrorBoundary>
)

export const Router = createBrowserRouter([
	{
		path: internalPaths.home,
		element: <Layout />,
		errorElement: withSuspense(<NotFoundPage />),
		children: [
			{
				element: <PrivateRoute />,
				children: [
					{ index: true, element: withSuspense(<HomePage />) },

					// {
					// 	path: internalPaths.characters.list,
					// 	children: [
					// 		{ index: true, element: withSuspense(<CharactersList />) },
					// 		{ path: ':id', element: withSuspense(<CharacterDetail />) },
					// 	],
					// },
					// {
					// 	path: internalPaths.locations.list,
					// 	children: [
					// 		{ index: true, element: withSuspense(<LocationsList />) },
					// 		{ path: ':id', element: withSuspense(<LocationDetail />) },
					// 	],
					// },
					// {
					// 	path: internalPaths.episodes.list,
					// 	children: [
					// 		{ index: true, element: withSuspense(<EpisodesList />) },
					// 		{ path: ':id', element: withSuspense(<EpisodeDetail />) },
					// 	],
					// },
				],
			},
		],
	},
	{
		path: internalPaths.auth,
		element: withSuspense(<Auth />),
	},
])
