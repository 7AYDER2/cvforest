import { useForm } from '@mantine/form';
import {
  AvailabilityType,
  Currency,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import type { UserCvsCreateBody } from '../types';

export function useUploadCvForm() {
  const t = useTranslations();

  const optionalUrl = z
    .union([z.url({ message: t('uploadCv.urlInvalid') }), z.literal('')])
    .transform((s) => (s === '' ? undefined : s));

  const schema = z
    .object({
      jobTitle: z.string().min(1, { error: t('uploadCv.jobTitleRequired') }),
      experienceInYears: z
        .number()
        .min(0, { error: t('uploadCv.experienceMin') }),
      expectedSalaryMin: z
        .number()
        .min(0, { error: t('uploadCv.salaryMinRequired') })
        .optional(),
      expectedSalaryMax: z
        .number()
        .min(0, { error: t('uploadCv.salaryMaxRequired') })
        .optional(),
      expectedSalaryCurrency: z
        .enum(Currency, {
          error: t('uploadCv.currencyRequired'),
        })
        .optional(),
      availabilityType: z.enum(AvailabilityType, {
        error: t('uploadCv.availabilityRequired'),
      }),
      workLocationType: z.enum(WorkLocationType, {
        error: t('uploadCv.workLocationRequired'),
      }),
      bio: z.string().min(32, {
        error: t('uploadCv.bioMustBeAtLeast32Characters'),
      }),
      githubUrl: optionalUrl,
      linkedinUrl: optionalUrl,
      portfolioUrl: optionalUrl,
      availableForHire: z.boolean(),
      skillIds: z
        .array(z.uuid())
        .min(3, { error: t('uploadCv.selectAtLeast3Skills') })
        .max(12, { error: t('uploadCv.selectAtMost12Skills') }),
    })
    .refine(
      (data) => {
        const min = data.expectedSalaryMin;
        const max = data.expectedSalaryMax;
        if (min == null || max == null) {
          return true;
        }
        return min <= max;
      },
      {
        message: t('uploadCv.salaryMinMustBeLessThanMax'),
        path: ['expectedSalaryMax'],
      },
    );

  type FormValues = z.infer<typeof schema>;

  return useForm<FormValues, (values: FormValues) => UserCvsCreateBody>({
    mode: 'uncontrolled',
    validate: zod4Resolver(schema),
    initialValues: {
      jobTitle: '',
      experienceInYears: 0,
      expectedSalaryMin: undefined as number | undefined,
      expectedSalaryMax: undefined as number | undefined,
      expectedSalaryCurrency: undefined as Currency | undefined,
      availabilityType: AvailabilityType.FullTime,
      workLocationType: WorkLocationType.Remote,
      bio: '',
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
      availableForHire: true,
      skillIds: [],
    },
    transformValues: (values): UserCvsCreateBody => {
      const githubUrl = values.githubUrl?.trim();
      const linkedinUrl = values.linkedinUrl?.trim();
      const portfolioUrl = values.portfolioUrl?.trim();
      const hasSalary =
        values.expectedSalaryMin != null || values.expectedSalaryMax != null;
      return {
        ...values,
        expectedSalaryMin: values.expectedSalaryMin,
        expectedSalaryMax: values.expectedSalaryMax,
        expectedSalaryCurrency: hasSalary
          ? values.expectedSalaryCurrency
          : undefined,
        githubUrl: githubUrl === '' ? undefined : githubUrl,
        linkedinUrl: linkedinUrl === '' ? undefined : linkedinUrl,
        portfolioUrl: portfolioUrl === '' ? undefined : portfolioUrl,
      };
    },
  });
}
