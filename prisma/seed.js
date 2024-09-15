const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const users = [
  {
    name: "adi2",
    email: "adi2@gmail.com",
    password: "@Adiwid98",
  },
  {
    name: "adi3",
    email: "adi3@gmail.com",
    password: "@Adiwid98",
  },
  {
    name: "adi4",
    email: "adi4@gmail.com",
    password: "@Adiwid98",
  },
  {
    name: "adi5",
    email: "adi5@gmail.com",
    password: "@Adiwid98",
  },
  {
    name: "adi6",
    email: "adi6@gmail.com",
    password: "@Adiwid98",
  },
];

async function main() {
  await Promise.all(
    users.map(async (item) => {
      const password = await bcrypt.hash(item.password, 10);
      const user = await prisma.user.create({
        data: {
          name: item.name,
          email: item.email,
          password: password,
        },
      });
      await prisma.shop.create({
        data: {
          name: "coffe shop",
          userId: user.id,
        },
      });
    })
  );

  await prisma.category.createMany({
    data: [
      {
        name: "food",
      },
      {
        name: "drink",
      },
    ],
  });

  const food = await prisma.category.findUnique({
    where: {
      name: "food",
    },
  });

  const drink = await prisma.category.findUnique({
    where: {
      name: "drink",
    },
  });

  const shop = await prisma.shop.findMany();
  await Promise.all(
    shop.map(async (item) => {
      await prisma.item.createMany({
        data: [
          {
            name: "Kentang Goreng",
            price: 24000,
            shopId: item.id,
            categoryId: food.id,
          },
          {
            name: "Mie Goreng",
            price: 15000,
            shopId: item.id,
            categoryId: food.id,
          },
          {
            name: "Caffe Latte",
            price: 22000,
            shopId: item.id,
            categoryId: drink.id,
          },
          {
            name: "Lemon Tea",
            price: 10000,
            shopId: item.id,
            categoryId: drink.id,
          },
        ],
      });
    })
  );
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
