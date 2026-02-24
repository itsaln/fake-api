import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors()
	await app.listen(process.env.PORT ?? 5200)

	console.log(`Server running on port ${await app.getUrl()}`)
}

bootstrap()
