import { Loader } from '@mantine/core'
import {
	lazy,
	Suspense,
	type ComponentType,
	type LazyExoticComponent,
	type ReactNode,
} from 'react'

interface ComponentsMap {
	Sidebar: {
		component: LazyExoticComponent<ComponentType>
		props: Record<string, unknown>
	}
	Header: {
		component: LazyExoticComponent<ComponentType>
		props: Record<string, unknown>
	}
	ThemeToggle: {
		component: LazyExoticComponent<ComponentType>
		props: Record<string, unknown>
	}
	Loader: {
		component: LazyExoticComponent<ComponentType>
		props: Record<string, unknown>
	}
}

const components: {
	[K in keyof ComponentsMap]: ComponentsMap[K]['component']
} = {
	Sidebar: lazy(() =>
		import('@/widgets/sidebar').then(module => ({
			default: module.Sidebar,
		}))
	),
	Header: lazy(() =>
		import('@/widgets/header').then(module => ({
			default: module.Header,
		}))
	),
	ThemeToggle: lazy(() =>
		import('@/shared/lib/theme').then(module => ({
			default: module.ThemeToggle,
		}))
	),
	Loader: lazy(() =>
		import('@/shared/components/loader').then(module => ({
			default: module.Loader,
		}))
	),
}

export function DynamicComponent(props: {
	nameComponent: keyof ComponentsMap
	[key: string]: ReactNode | unknown
}) {
	const { nameComponent, ...rest } = props
	const Component = components[nameComponent]

	if (!Component) {
		return null
	}

	return (
		<Suspense fallback={<Loader />}>
			<Component {...rest} />
		</Suspense>
	)
}

export function getDynamicComponent<K extends keyof ComponentsMap>(
	nameComponent: K
) {
	return (props: ComponentsMap[K]['props']) => (
		<DynamicComponent nameComponent={nameComponent} {...props} />
	)
}
