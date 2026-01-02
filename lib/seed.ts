import { PrismaClient, Prisma, Role } from "@/generated/prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
    {
        name: "admin",
        email: "admin@example.com",
        password: "password",
        role: Role.ADMIN
    },
    {
        name: "member",
        email: "member@example.com",
        password: "password",
        role: Role.MEMBER
    }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();