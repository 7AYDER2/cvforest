import {
  Badge,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconAB,
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconBuilding,
  IconCircleCheck,
  IconClock,
  IconCurrencyDollar,
  IconFileText,
  IconMapPin,
  IconPhone,
  IconTrophy,
  IconWorld,
  type TablerIcon,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { BooleanBadge } from '@/components/boolean-badge';
import { PhoneNumber } from '@/components/phone-number';
import type { JoinRequest } from '@/features/join-requests/types';
import {
  translateAvailabilityType,
  translateCurrency,
  translateGender,
  translateWorkLocationType,
} from '@/utils/translation-maps';

interface JoinRequestsRowExpansionInfoItemProps {
  joinRequest: JoinRequest;
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: TablerIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Group>
      <ThemeIcon variant="light">
        <Icon size={18} />
      </ThemeIcon>

      <div>
        <Text fz={14} c="gray">
          {label}
        </Text>

        {value}
      </div>
    </Group>
  );
}

export function JoinRequestsRowExpansion({
  joinRequest,
}: JoinRequestsRowExpansionInfoItemProps) {
  const t = useTranslations();

  return (
    <SimpleGrid cols={{ md: 2 }}>
      <Stack gap="md">
        {/* Professional Information Section */}
        {(joinRequest.jobTitle ||
          joinRequest.experienceInYears ||
          joinRequest.expectedSalaryMin ||
          joinRequest.expectedSalaryMax ||
          joinRequest.availabilityType ||
          joinRequest.workLocationType ||
          joinRequest.availableForHire !== null) && (
          <Paper withBorder p="md" component={Stack}>
            <Title order={3}>{t('joinRequests.professionalInformation')}</Title>

            {joinRequest.jobTitle && (
              <InfoItem
                icon={IconBriefcase}
                label={t('joinRequests.jobTitle')}
                value={<Text>{joinRequest.jobTitle}</Text>}
              />
            )}

            {joinRequest.experienceInYears !== null && (
              <InfoItem
                icon={IconTrophy}
                label={t('joinRequests.experience')}
                value={
                  <Text>
                    {t('joinRequests.years', {
                      number: joinRequest.experienceInYears,
                    })}
                  </Text>
                }
              />
            )}

            {(joinRequest.expectedSalaryMin ||
              joinRequest.expectedSalaryMax) && (
              <InfoItem
                icon={IconCurrencyDollar}
                label={t('joinRequests.expectedSalary')}
                value={
                  <Text>
                    {joinRequest.expectedSalaryMin?.toLocaleString()}{' '}
                    {joinRequest.expectedSalaryMin &&
                      joinRequest.expectedSalaryMax &&
                      '-'}{' '}
                    {joinRequest.expectedSalaryMax?.toLocaleString()}{' '}
                    {joinRequest.expectedSalaryCurrency &&
                      translateCurrency(t, joinRequest.expectedSalaryCurrency)}
                  </Text>
                }
              />
            )}

            {joinRequest.availabilityType && (
              <InfoItem
                icon={IconClock}
                label={t('joinRequests.availabilityType')}
                value={
                  <Text>
                    {translateAvailabilityType(t, joinRequest.availabilityType)}
                  </Text>
                }
              />
            )}

            {joinRequest.workLocationType && (
              <InfoItem
                icon={IconBuilding}
                label={t('joinRequests.workLocationType')}
                value={
                  <Text>
                    {translateWorkLocationType(t, joinRequest.workLocationType)}
                  </Text>
                }
              />
            )}

            {joinRequest.availableForHire !== null && (
              <InfoItem
                icon={IconCircleCheck}
                label={t('joinRequests.availableForHire')}
                value={<BooleanBadge value={joinRequest.availableForHire} />}
              />
            )}
          </Paper>
        )}

        {/* Bio Section */}
        {joinRequest.bio && (
          <Paper withBorder p="md" component={Stack}>
            <Group>
              <ThemeIcon variant="light">
                <IconFileText size={18} />
              </ThemeIcon>
              <Title order={3}>{t('joinRequests.bio')}</Title>
            </Group>
            <Text fz={14}>{joinRequest.bio}</Text>
          </Paper>
        )}
      </Stack>

      <Stack gap="md">
        {/* Contact Information Section */}
        <Paper withBorder p="md" component={Stack}>
          <Title order={3}>{t('joinRequests.contactInformation')}</Title>

          {joinRequest.email && (
            <InfoItem
              icon={IconAt}
              label={t('joinRequests.email')}
              value={
                <Group gap="xs">
                  <Text>{joinRequest.email}</Text>
                  <BooleanBadge
                    value={joinRequest.emailVerified ?? false}
                    label={{
                      true: t('joinRequests.emailVerified'),
                      false: t('_.no'),
                    }}
                  />
                </Group>
              }
            />
          )}

          <InfoItem
            icon={IconPhone}
            label={t('joinRequests.phone')}
            value={
              <Group gap="xs">
                <PhoneNumber phone={joinRequest.phoneNumber ?? ''} />

                {joinRequest.phoneNumberVerified !== null && (
                  <BooleanBadge
                    value={joinRequest.phoneNumberVerified ?? false}
                    label={{
                      true: t('joinRequests.phoneVerified'),
                      false: t('_.no'),
                    }}
                  />
                )}
              </Group>
            }
          />

          {joinRequest.gender && (
            <InfoItem
              icon={IconAB}
              label={t('joinRequests.gender')}
              value={<Text>{translateGender(t, joinRequest.gender)}</Text>}
            />
          )}

          {joinRequest.governorate && (
            <InfoItem
              icon={IconMapPin}
              label={t('joinRequests.location')}
              value={<Text>{joinRequest.governorate.name}</Text>}
            />
          )}
        </Paper>

        {/* Skills Section */}
        {joinRequest.userSkills && joinRequest.userSkills.length > 0 && (
          <Paper withBorder p="md" component={Stack}>
            <Title order={3}>{t('joinRequests.skills')}</Title>
            <Group gap={4}>
              {joinRequest.userSkills.map((userSkill) => (
                <Badge key={userSkill.id} variant="light" size="sm">
                  {userSkill.skill.name}
                </Badge>
              ))}
            </Group>
          </Paper>
        )}

        {/* Social Links Section */}
        {(joinRequest.githubUrl ||
          joinRequest.linkedinUrl ||
          joinRequest.portfolioUrl) && (
          <Paper withBorder p="md" component={Stack}>
            <Title order={3}>{t('joinRequests.socialLinks')}</Title>
            <Group gap="sm">
              {joinRequest.githubUrl && (
                <Button
                  component="a"
                  href={joinRequest.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconBrandGithub size={18} />}
                >
                  {t('joinRequests.github')}
                </Button>
              )}

              {joinRequest.linkedinUrl && (
                <Button
                  component="a"
                  href={joinRequest.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconBrandLinkedin size={18} />}
                >
                  {t('joinRequests.linkedin')}
                </Button>
              )}

              {joinRequest.portfolioUrl && (
                <Button
                  component="a"
                  href={joinRequest.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconWorld size={18} />}
                >
                  {t('joinRequests.portfolio')}
                </Button>
              )}
            </Group>
          </Paper>
        )}
      </Stack>
    </SimpleGrid>
  );
}
