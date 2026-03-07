import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skillsItems = [
  {
    icon: 'code',
    title: 'Frontend Development',
    description:
      'Crafting responsive, accessible, and high-performance user interfaces using SvelteKit, React, and Tailwind CSS.',
  },
  {
    icon: 'database',
    title: 'Backend & Databases',
    description:
      'Building scalable APIs and managing data with Node.js, PostgreSQL, and Prisma ORM.',
  },
  {
    icon: 'cloud',
    title: 'DevOps & Cloud',
    description:
      'Streamlining deployment pipelines and ensuring high availability on modern cloud platforms.',
  },
];

async function main() {
  await prisma.homepageContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heroTagline: 'Available for freelance work',
      heroTitle: 'Building Digital Excellence',
      heroSubtitle:
        "I'm Delwar Ahmed, a Full-stack Developer specializing in modern web technologies. Transforming complex ideas into elegant, high-performance digital solutions.",
      heroShowBadge: true,
      skillsTitle: 'Everything you need to ship products',
      skillsSubtitle:
        'From frontend finesse to backend robustness, I cover the full spectrum of modern application development.',
      skillsItems: JSON.stringify(skillsItems),
      ctaTitle: 'Ready to start a project?',
      ctaSubtitle:
        "Let's discuss how I can help bring your ideas to life. I'm always excited to work on new challenges.",
      ctaButtonText: "Let's Talk",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      profileName: 'Delwar Ahmed',
      profileTitle: 'Full-stack Developer',
      profileBio:
        "I'm Delwar Ahmed, a Full-stack Developer specializing in modern web technologies.",
      profileEmail: 'hello@delwar.bd',
      profilePhone: '+880 1XXX-XXXXXX',
      profileLocation: 'Dhaka, Bangladesh',
      profileLinkedin: 'https://linkedin.com/in/delwar',
      profileTwitter: 'https://twitter.com/delwar',
      profileGithub: 'https://github.com/delwar',
      siteTitle: 'Delwar Ahmed',
      siteDescription:
        'A personal portfolio website for Delwar Ahmed, showcasing projects and skills.',
      siteKeywords: 'portfolio, developer, web developer, svelte, react, nodejs',
      siteShowGithubStats: true,
      siteShowVisitorCount: true,
      appearanceTheme: 'system',
      appearancePrimaryColor: '#6366f1',
      appearanceAnimationEnabled: true,
      appearanceReducedMotion: false,
      notificationsEmail: true,
      notificationsNewVisitor: false,
      notificationsContactAlert: true,
      notificationsWeeklyReport: false,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
