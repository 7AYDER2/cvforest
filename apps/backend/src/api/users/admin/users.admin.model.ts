import { FilePlain } from '@db/gen/prismabox/File';
import { GovernoratePlain } from '@db/gen/prismabox/Governorate';
import { UserPlain } from '@db/gen/prismabox/User';
import { t } from 'elysia';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

// User response with relations
const UserWithRelations = t.Composite([
  UserPlain,
  t.Object({
    avatar: t.Union([FilePlain, t.Null()]),
    governorate: t.Union([GovernoratePlain, t.Null()]),
  }),
]);

export const AdminUsersModel = {
  // List
  AdminUsersListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    search: t.Optional(t.String()),
  }),
  AdminUsersListResponse: t.Object({
    total: t.Number(),
    data: t.Array(UserWithRelations),
  }),

  // Get
  AdminUsersGetResponse: UserWithRelations,

  // Approve Response
  AdminUsersApproveResponse: t.Object({
    message: t.String(),
  }),

  // Reject Response
  AdminUsersRejectResponse: t.Object({
    message: t.String(),
  }),
};
