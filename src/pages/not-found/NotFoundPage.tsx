import { Button, Container, Group, Text, Title } from '@mantine/core'
import { Illustration } from '@/shared/components/404'
import classes from './NotFoundPage.module.css'
import { useNavigate } from 'react-router-dom'
import { internalPaths } from '@/app/providers/router'

const NotFoundPage = () => {
	const navigate = useNavigate()

	const handleClickGoHome = () => {
		navigate(internalPaths.home)
	}

	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>Здесь ничего нет</Title>
					<Text
						c='dimmed'
						size='lg'
						ta='center'
						className={classes.description}
					>
						Страница, которую вы пытаетесь открыть, не существует. Возможно, вы
						допустили ошибку в адресе, или страница была перемещена по другому
						адресу.
					</Text>
					<Group justify='center'>
						<Button size='md' onClick={handleClickGoHome}>
							Вернуться на главную
						</Button>
					</Group>
				</div>
			</div>
		</Container>
	)
}

export default NotFoundPage
