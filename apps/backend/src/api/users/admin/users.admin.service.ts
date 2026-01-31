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
        userSkills: {
          include: {
            skill: true,
          },
        },
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
        userSkills: { include: { skill: true } },
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

    if (user.status !== 'Pending') {
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

  async approve(id: string, t: TranslationFn) {
    const user = await prisma.user.findUnique({
      where: { id },
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

    if (user.status === 'Approved') {
      throw new HttpError({
        statusCode: 400,
        message: t({
          en: 'User already approved',
          ar: 'تم الموافقة على المستخدم بالفعل',
        }),
      });
    }

    await prisma.user.update({
      where: { id },
      data: { status: 'Approved' },
    });

    return {
      message: t({
        en: 'User approved successfully',
        ar: 'تمت الموافقة على المستخدم بنجاح',
      }),
    };
  },

  async reject(id: string, t: TranslationFn) {
    const user = await prisma.user.findUnique({
      where: { id },
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

    if (user.status === 'Rejected') {
      throw new HttpError({
        statusCode: 400,
        message: t({
          en: 'User already rejected',
          ar: 'تم رفض المستخدم بالفعل',
        }),
      });
    }

    await prisma.user.update({
      where: { id },
      data: { status: 'Rejected' },
    });

    return {
      message: t({
        en: 'User rejected successfully',
        ar: 'تم رفض المستخدم بنجاح',
      }),
    };
  },
};
