const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// **************************************************** //
// Seed d'un user normal & Admin pour tester les routes //
// **************************************************** //


async function main() {
  // Créer un admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@apibay.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@apibay.com",
      password: "admin", // pense à hasher avec bcrypt
      role: "ADMIN",
    },
  });

  // Créer un user normal
  const user = await prisma.user.upsert({
    where: { email: "user@apibay.com" },
    update: {},
    create: {
      username: "user1",
      email: "user@apibay.com",
      password: "$2b$10$hashedPasswordIci",
      role: "USER",
    },
  });

  console.log({ admin, user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
