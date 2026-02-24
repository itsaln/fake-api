import {
	Controller,
	DefaultValuePipe,
	Get,
	ParseIntPipe,
	Query
} from '@nestjs/common'
import { CompanyService } from '@app/company/company.service'

@Controller('companies')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Get()
	getAll(@Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number) {
		return this.companyService.getAll(limit)
	}
}
