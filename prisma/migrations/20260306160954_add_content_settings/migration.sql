-- CreateTable
CREATE TABLE "HomepageContent" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "heroTagline" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroShowBadge" BOOLEAN NOT NULL DEFAULT true,
    "skillsTitle" TEXT NOT NULL,
    "skillsSubtitle" TEXT NOT NULL,
    "skillsItems" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaSubtitle" TEXT NOT NULL,
    "ctaButtonText" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "profileName" TEXT NOT NULL,
    "profileTitle" TEXT NOT NULL,
    "profileBio" TEXT NOT NULL,
    "profileEmail" TEXT NOT NULL,
    "profilePhone" TEXT NOT NULL,
    "profileLocation" TEXT NOT NULL,
    "profileLinkedin" TEXT NOT NULL,
    "profileTwitter" TEXT NOT NULL,
    "profileGithub" TEXT NOT NULL,
    "siteTitle" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,
    "siteKeywords" TEXT NOT NULL,
    "siteShowGithubStats" BOOLEAN NOT NULL DEFAULT true,
    "siteShowVisitorCount" BOOLEAN NOT NULL DEFAULT true,
    "appearanceTheme" TEXT NOT NULL DEFAULT 'system',
    "appearancePrimaryColor" TEXT NOT NULL DEFAULT '#6366f1',
    "appearanceAnimationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "appearanceReducedMotion" BOOLEAN NOT NULL DEFAULT false,
    "notificationsEmail" BOOLEAN NOT NULL DEFAULT true,
    "notificationsNewVisitor" BOOLEAN NOT NULL DEFAULT false,
    "notificationsContactAlert" BOOLEAN NOT NULL DEFAULT true,
    "notificationsWeeklyReport" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL
);
