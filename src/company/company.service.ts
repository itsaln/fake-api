import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'

@Injectable()
export class CompanyService {
	constructor(private prisma: PrismaService) {}

	async getAll(limit?: number) {
		return this.prisma.company.findMany({
			orderBy: { id: 'asc' },
			...(limit && { take: limit })
		})
	}
}
