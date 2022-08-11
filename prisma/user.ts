import { prisma } from '../prisma';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  return user;
};

export const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password
    }
  });
  return user;
};

export const updateUser = async (id: string, updateData: any) => {
  const user = await prisma.user.update({
    where: {
      id
    },
    data: {
      ...updateData
    }
  });
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id
    }
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return user;
};

export const verifyEmail = async (email: string) => {
  prisma.user.findUniqueOrThrow({ where: { email } });
};
