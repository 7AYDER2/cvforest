import { useForm } from '@mantine/form';
import { Gender } from '@repo/backend/prisma/enums';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { phoneNumberZodValidator } from '@/utils/schemas';
import type { SignUpRequestBody } from '../types';

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export function useSignUpForm() {
  const t = useTranslations();

  const schema = z
    .object({
      name: z.string().min(1, { error: t('signup.nameRequired') }),
      email: z.email({ error: t('signup.emailInvalid') }),
      password: z
        .string()
        .min(8, { error: t('signup.passwordInvalid') })
        .max(128, { error: t('signup.passwordInvalid') })
        .regex(strongPasswordRegex, { error: t('signup.passwordInvalid') }),
      confirmPassword: z
        .string()
        .min(1, { error: t('signup.confirmPasswordMismatch') }),
      phoneNumber: z
        .union([z.literal(''), phoneNumberZodValidator])
        .optional()
        .default(''),
      gender: z.enum(Gender).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t('signup.confirmPasswordMismatch'),
      path: ['confirmPassword'],
    });

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => SignUpRequestBody;

  return useForm<FormValues, FormValuesToBody>({
    mode: 'uncontrolled',
    validate: zod4Resolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      gender: 'Male',
    },
    transformValues: (values): SignUpRequestBody => {
      const phone = values.phoneNumber?.replaceAll(' ', '')?.trim();
      return {
        name: values.name,
        email: values.email,
        password: values.password,
        ...(phone ? { phoneNumber: phone } : {}),
        ...(values.gender ? { gender: values.gender } : {}),
      };
    },
  });
}
