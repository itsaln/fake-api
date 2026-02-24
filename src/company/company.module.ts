import { Module } from '@nestjs/common'
import { CompanyController } from '@app/company/company.controller'
import { CompanyService } from '@app/company/company.service'
import { PrismaService } from '@app/prisma.service'

@Module({
	controllers: [CompanyController],
	providers: [CompanyService, PrismaService],
	imports: []
})
export class CompanyModule {}
