import { faker } from '@faker-js/faker'
import { CompanyStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const COMPANY_TYPES = [
	'LLC',
	'Corporation',
	'Partnership',
	'Sole Proprietorship',
	'Non-Profit',
	'S-Corp',
	'B-Corp'
]

const BUSINESS_TYPES = [
	'Technology',
	'Healthcare',
	'Finance',
	'Retail',
	'Manufacturing',
	'Education',
	'Real Estate',
	'Logistics',
	'Consulting',
	'Media',
	'Energy',
	'Agriculture',
	'Hospitality',
	'Automotive',
	'Telecommunications'
]

const STATUSES = Object.values(CompanyStatus)

function generateCompany() {
	return {
		name: faker.company.name(),
		type: faker.helpers.arrayElement(COMPANY_TYPES),
		status: faker.helpers.arrayElement(STATUSES),
		relations: faker.number.int({ min: 0, max: 500 }),
		accountManager: faker.person.fullName(),
		zip: faker.location.zipCode(),
		phone: faker.phone.number({ style: 'international' }),
		email: faker.internet.email().replace('@', `+${faker.string.nanoid(6)}@`),
		tax: faker.string.numeric({ length: { min: 9, max: 11 } }),
		city: faker.location.city(),
		country: faker.location.country(),
		business: faker.helpers.arrayElement(BUSINESS_TYPES)
	}
}

async function seed(): Promise<void> {
	console.log('🌱 Seeding database...')

	// Clear existing data
	await prisma.company.deleteMany()
	console.log('🗑️  Cleared existing companies')

	const TOTAL = 10000
	const BATCH = 1000 // insert in batches to avoid overwhelming the DB

	let inserted = 0

	for (let i = 0; i < TOTAL; i += BATCH) {
		const companies = Array.from(
			{ length: Math.min(BATCH, TOTAL - i) },
			generateCompany
		)

		await prisma.company.createMany({ data: companies })

		inserted += companies.length
		console.log(`   ✓ Inserted ${inserted} / ${TOTAL}`)
	}

	console.log(`\n✅ Done — ${TOTAL} companies seeded.`)
}

seed()
	.catch(err => {
		console.error('❌ Seed failed:', err)
		process.exit(1)
	})
	.finally(() => prisma.$disconnect())
