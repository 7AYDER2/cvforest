import { t } from 'elysia';

export const paginationSchema = {
  page: t.Number({ default: 1 }),
  pageSize: t.Number({ default: 10 }),
};

export const sortingSchema = {
  sortingColumn: t.String({ default: 'createdAt' }),
  sortingDirection: t.String({ default: 'desc' }),
};

export const IraqiPhoneNumberSchema = t.String({
  pattern: '^\\+9647\\d{9}$',
  description: 'يجب ادخال رقم هاتف عراقي صحيح مثال +9647701234567',
});

export const StrongPasswordSchema = t.String({
  minLength: 8,
  maxLength: 128,
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
  description:
    'Minimum 8 characters, at least one lowercase letter, one uppercase letter, and one number',
});
