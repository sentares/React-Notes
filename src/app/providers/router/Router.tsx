import { Layout } from '@/app/layouts'
import { ErrorBoundary } from '@/shared/components/errorBoundary'
import { Center, Loader } from '@mantine/core'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { internalPaths } from './RoutePaths'

const HomePage = lazy(() => import('@/pages/home'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))
const NotePage = lazy(() => import('@/pages/note'))

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

					{
						path: internalPaths.note.base,
						children: [{ path: ':id', element: withSuspense(<NotePage />) }],
					},
				],
			},
		],
	},
	{
		path: internalPaths.auth,
		element: withSuspense(<Auth />),
	},
])
