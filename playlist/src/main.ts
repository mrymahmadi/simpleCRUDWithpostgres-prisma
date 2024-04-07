import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newArtist = await prisma.user.create({
    data: {
      name: "Osinachi Kalu",
      email: "sinach@sinachmusic.com",
      password: "123esdfw",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

//!  put a dollar-sign between "." and "disconnect"
