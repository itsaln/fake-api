import { Module } from '@nestjs/common'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { CompanyModule } from '@app/company/company.module'
import { PrismaService } from '@app/prisma.service'

@Module({
	imports: [CompanyModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
