import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import type { TranslationFn } from '@/types';
import { HttpError } from '@/utils/error';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { AdminUsersModel } from './users.admin.model';

export const adminUsersService = {
  async list(query: typeof AdminUsersModel.AdminUsersListQuery.static) {
    const where: Prisma.UserWhereInput = {
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { email: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
    };

    const total = await prisma.user.count({ where });

    const data = await prisma.user.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),
      where,
      include: {
        avatar: true,
        governorate: true,
      },
    });

    return { total, data };
  },

  async getById(
    id: string,
    t: TranslationFn,
  ): Promise<typeof AdminUsersModel.AdminUsersGetResponse.static> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        avatar: true,
        governorate: true,
      },
    });

    if (!user) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'User not found',
          ar: 'المستخدم غير موجود',
        }),
      });
    }

    return user;
  },
};
