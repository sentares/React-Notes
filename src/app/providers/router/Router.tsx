import { Layout } from '@/app/layouts'
import { ErrorBoundary } from '@/shared/components/errorBoundary'
import { Loader } from '@mantine/core'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { internalPaths } from './RoutePaths'

const HomePage = lazy(() => import('@/pages/home'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))

const withSuspense = (element: React.ReactNode) => (
	<ErrorBoundary>
		<Suspense fallback={<Loader />}>{element}</Suspense>
	</ErrorBoundary>
)

export const Router = createBrowserRouter([
	{
		path: internalPaths.home,
		element: <Layout />,
		errorElement: withSuspense(<NotFoundPage />),
		children: [{ index: true, element: withSuspense(<HomePage />) }],
	},
])
