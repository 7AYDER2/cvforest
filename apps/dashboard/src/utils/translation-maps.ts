import type {
  AvailabilityType,
  Currency,
  Gender,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import type { TranslationFn } from '@/types';

export function translateGender(t: TranslationFn, gender: Gender) {
  const map: Record<Gender, string> = {
    Male: t('profiles.male'),
    Female: t('profiles.female'),
  };

  return map[gender];
}

export function translateAvailabilityType(
  t: TranslationFn,
  availabilityType: AvailabilityType,
) {
  const map: Record<AvailabilityType, string> = {
    FullTime: t('joinRequests.availabilityTypeFullTime'),
    PartTime: t('joinRequests.availabilityTypePartTime'),
    Freelance: t('joinRequests.availabilityTypeFreelance'),
  };

  return map[availabilityType];
}

export function translateWorkLocationType(
  t: TranslationFn,
  workLocationType: WorkLocationType,
) {
  const map: Record<WorkLocationType, string> = {
    OnSite: t('joinRequests.workLocationTypeOnSite'),
    Remote: t('joinRequests.workLocationTypeRemote'),
    Hybrid: t('joinRequests.workLocationTypeHybrid'),
  };

  return map[workLocationType];
}

export function translateCurrency(t: TranslationFn, currency: Currency) {
  const map: Record<Currency, string> = {
    Iqd: t('joinRequests.currencyIqd'),
    Usd: t('joinRequests.currencyUsd'),
  };

  return map[currency];
}
