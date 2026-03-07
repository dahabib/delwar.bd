import { prisma } from '$lib/server/prisma';

export interface SkillItem {
  icon: string;
  title: string;
  description: string;
}

export interface HomepageData {
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    showBadge: boolean;
  };
  skills: {
    title: string;
    subtitle: string;
    items: SkillItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export async function getHomepageContent(): Promise<HomepageData> {
  const content = await prisma.homepageContent.findUnique({
    where: { id: 'default' },
  });

  if (!content) {
    throw new Error('Homepage content not found');
  }

  return {
    hero: {
      tagline: content.heroTagline,
      title: content.heroTitle,
      subtitle: content.heroSubtitle,
      showBadge: content.heroShowBadge,
    },
    skills: {
      title: content.skillsTitle,
      subtitle: content.skillsSubtitle,
      items: JSON.parse(content.skillsItems) as SkillItem[],
    },
    cta: {
      title: content.ctaTitle,
      subtitle: content.ctaSubtitle,
      buttonText: content.ctaButtonText,
    },
  };
}

export async function updateHomepageContent(data: HomepageData): Promise<void> {
  await prisma.homepageContent.update({
    where: { id: 'default' },
    data: {
      heroTagline: data.hero.tagline,
      heroTitle: data.hero.title,
      heroSubtitle: data.hero.subtitle,
      heroShowBadge: data.hero.showBadge,
      skillsTitle: data.skills.title,
      skillsSubtitle: data.skills.subtitle,
      skillsItems: JSON.stringify(data.skills.items),
      ctaTitle: data.cta.title,
      ctaSubtitle: data.cta.subtitle,
      ctaButtonText: data.cta.buttonText,
    },
  });
}

export interface SiteSettingsData {
  profile: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    twitter: string;
    github: string;
  };
  site: {
    title: string;
    description: string;
    keywords: string;
    showGithubStats: boolean;
    showVisitorCount: boolean;
  };
  appearance: {
    theme: string;
    primaryColor: string;
    animationEnabled: boolean;
    reducedMotion: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    newVisitorAlert: boolean;
    contactFormAlert: boolean;
    weeklyReport: boolean;
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  if (!settings) {
    throw new Error('Site settings not found');
  }

  return {
    profile: {
      name: settings.profileName,
      title: settings.profileTitle,
      bio: settings.profileBio,
      email: settings.profileEmail,
      phone: settings.profilePhone,
      location: settings.profileLocation,
      linkedin: settings.profileLinkedin,
      twitter: settings.profileTwitter,
      github: settings.profileGithub,
    },
    site: {
      title: settings.siteTitle,
      description: settings.siteDescription,
      keywords: settings.siteKeywords,
      showGithubStats: settings.siteShowGithubStats,
      showVisitorCount: settings.siteShowVisitorCount,
    },
    appearance: {
      theme: settings.appearanceTheme,
      primaryColor: settings.appearancePrimaryColor,
      animationEnabled: settings.appearanceAnimationEnabled,
      reducedMotion: settings.appearanceReducedMotion,
    },
    notifications: {
      emailNotifications: settings.notificationsEmail,
      newVisitorAlert: settings.notificationsNewVisitor,
      contactFormAlert: settings.notificationsContactAlert,
      weeklyReport: settings.notificationsWeeklyReport,
    },
  };
}

export async function updateSiteSettings(data: SiteSettingsData): Promise<void> {
  await prisma.siteSettings.update({
    where: { id: 'default' },
    data: {
      profileName: data.profile.name,
      profileTitle: data.profile.title,
      profileBio: data.profile.bio,
      profileEmail: data.profile.email,
      profilePhone: data.profile.phone,
      profileLocation: data.profile.location,
      profileLinkedin: data.profile.linkedin,
      profileTwitter: data.profile.twitter,
      profileGithub: data.profile.github,
      siteTitle: data.site.title,
      siteDescription: data.site.description,
      siteKeywords: data.site.keywords,
      siteShowGithubStats: data.site.showGithubStats,
      siteShowVisitorCount: data.site.showVisitorCount,
      appearanceTheme: data.appearance.theme,
      appearancePrimaryColor: data.appearance.primaryColor,
      appearanceAnimationEnabled: data.appearance.animationEnabled,
      appearanceReducedMotion: data.appearance.reducedMotion,
      notificationsEmail: data.notifications.emailNotifications,
      notificationsNewVisitor: data.notifications.newVisitorAlert,
      notificationsContactAlert: data.notifications.contactFormAlert,
      notificationsWeeklyReport: data.notifications.weeklyReport,
    },
  });
}
