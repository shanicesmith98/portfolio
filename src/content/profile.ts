import type { Profile } from './schema.ts';

export const profile: Profile = {
  name: 'Shanice Smith',
  headline: 'Software Engineer. I build tech that centers people.',
  intro:
    "Welcome! I'm Shanice (she/they) — a New York City-based Software Engineer who believes great tech starts with great empathy. I'm a queer, neurodiverse Black woman, and a self-proclaimed generalist. By day, I build interactive educational experiences at the ACLU. By night (and some weekends), I write narrative games in Unity with indie teams through Gameheads. Somewhere in between, I'm starting a Data Science master's program, volunteering in the tech community, and watching way too many musicals.",
  location: 'New York City, NY',
  avatar: '/avatar-placeholder.svg',

  resumeUrl: '/Smith_Shanice_resume.pdf',

  // The page, top to bottom, under the hero. Move an id and the section and its
  // nav link move together; delete one and that section goes away entirely.
  // ['links', 'timeline'] puts how-to-reach-you above the history.
  // See docs/adr/ADR-006-section-order.md.
  sections: ['timeline', 'education', 'skills', 'links'],

  links: [
    { label: 'GitHub', href: 'https://github.com/shanicesmith98' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shanicesmith-swe' },
    { label: 'Email', href: 'mailto:hello@shanice.dev' },
  ],

  education: [
    {
      id: 'cuny-sps-ms-data-science',
      institution: 'CUNY School of Professional Studies',
      degree: 'Master of Science',
      field: 'Data Science',
      startDate: '2026-08',
      endDate: null,
      highlights: [
        'Courses: Statistics and Probability for Data Analytics, Data Acquisition and Management'
      ],
    },
    {
      id: 'cuny-citytech-bachelor',
      institution: 'CUNY New York City College of Technology',
      degree: 'Bachelor of Technology',
      field: 'Emerging Media Technology: Game Design and Interactive Media',
      startDate: '2019-08',
      endDate: '2022-01',
      highlights: [
        'Affiliations: Gameheads, ColorStack, Rewriting the Code, Girls Who Code, Black Girls Code, Society of Women Engineers (SWE).',
      ],
    },
  ],

  skills: [
    {
      label: 'Professional experience',
      skills: [
        'C#',
        'Vue.js',
        'JavaScript (HTML/CSS)',
        'Python',
        'PHP',
        'Java',
        'SQL',
        'Perforce',
        'Git',
        'GitHub',
        'GitLab',
        'Tableau',
        'Jira',
      ],
    },
    {
      label: 'Familiar with',
      skills: [
        'Claude Code',
        'C++',
        'Unity Game Engine',
        'Adobe Photoshop',
        'Jupyter Notebook',
        'Figma',
        'Unreal Game Engine',
        'Godot',
        'Miro',
        'Twine',
        'R',
      ],
    },
  ],

  timeline: [
    // ---------------------------------------------------------------- work
    {
      id: 'aclu-software-engineer',
      kind: 'work',
      title: 'Software Engineer',
      organization: 'ACLU',
      startDate: '2023-02',
      endDate: null,
      location: 'Remote',
      summary:
        "Rebuilding ACLU.org's legacy page templates as reusable, mobile-first components and shipping weekly features across 50+ affiliate sites serving 1M+ monthly visitors.",
      highlights: [
        'Rebuilding legacy hard-coded page templates as reusable, mobile-first atomic components using PHP, Vue.js, and Tailwind CSS.',
        'Engineering content and WordPress CMS enhancements with the CMS team to improve SEO and AEO performance, increasing discoverability across traditional and AI-powered search.',
        'Developing and shipping weekly features for ACLU.org and 50+ affiliate sites while fixing critical production bugs and implementing WCAG 2.1 AA accessibility standards.',
        'Translating requirements from 10+ product, content, security, and design stakeholders into technical implementations, coordinating delivery across projects such as the National Brand Refresh and Know Your Rights redesigns.',
      ],
      tags: ['PHP', 'Vue.js', 'Tailwind CSS', 'WordPress', 'Accessibility'],
      links: [],
    },
    {
      id: 'twitter-software-engineer',
      kind: 'work',
      title: 'Software Engineer',
      organization: 'Twitter',
      startDate: '2022-02',
      endDate: '2023-01',
      location: 'Remote',
      summary:
        "Refactored DevOps tooling for Machine Learning Engineers and led automation infrastructure for the mobile release team's biweekly iOS/Android releases.",
      highlights: [
        'Optimized on-call experience for Machine Learning Engineers by refactoring DevOps dashboards in Python and developed a prototype API for Notifications feature testing in Scala, Google Cloud Platform, and Hadoop (Scalding, HDFS).',
        "Led 60% of the mobile release team's automation infrastructure expansion to calculate time duration, store metrics, and notify stakeholders of biweekly iOS/Android release updates using Python, SQL, Jira REST API, Postman, and Jenkins.",
        'Created onboarding documentation, successfully ramping up 4+ engineers to the team’s development projects and systems.',
      ],
      tags: ['Python', 'Scala', 'Google Cloud Platform', 'Hadoop', 'SQL', 'Jenkins'],
      links: [],
    },
    {
      id: 'twitter-swe-test-intern',
      kind: 'work',
      title: 'Software Test Engineer Intern',
      organization: 'Twitter',
      startDate: '2021-08',
      endDate: '2021-11',
      location: 'Remote',
      summary:
        "Led Quality Engineering's automated testing infrastructure migration from shell scripts to Bazel.",
      highlights: [
        'Led shell script to Bazel migration for Quality Engineering automated testing infrastructure, achieving 30+% reduction in required scripts through Starlark integration in the Jenkins CI/CD pipeline and IntelliJ configuration setup.',
      ],
      tags: ['Bazel', 'Starlark', 'Jenkins', 'CI/CD'],
      links: [],
    },
    {
      id: 'ea-sports-swe-intern',
      kind: 'work',
      title: 'Software Engineer Intern',
      organization: 'Electronic Arts (EA Sports)',
      startDate: '2021-05',
      endDate: '2021-08',
      location: 'Remote',
      summary:
        "Automated database workflows and extended Madden's asset management tooling with a C# plugin for real-time in-game data reflection.",
      highlights: [
        'Developed a C# script to automate CSV data entry into a MySQL database, reducing manual input time for the database team.',
        "Enhanced Madden's asset management tool with a C# plugin to reduce backend RESTful design latency, achieving real-time data reflection in-game and accelerating development cycles for engineers and designers.",
      ],
      tags: ['C#', 'MySQL', 'REST'],
      links: [],
    },
    {
      id: 'disney-qa-automation-intern',
      kind: 'work',
      title: 'QA Automation Intern',
      organization: 'The Walt Disney Company (Movies Anywhere)',
      startDate: '2021-01',
      endDate: '2021-05',
      location: 'Remote',
      summary:
        'Built an automated front-end accessibility testing framework and integrated it into the Jenkins CI/CD pipeline for Movies Anywhere.',
      highlights: [
        'Built an automated front-end accessibility testing framework with JavaScript, Node.js, Mocha, and Selenium WebDriver, including axe, an accessibility testing API, to improve WCAG compliance on the website.',
        'Integrated the axe-core CLI tool with Bash scripts into the Jenkins CI/CD pipeline, automating 34% of accessibility test cases.',
      ],
      tags: ['JavaScript', 'Node.js', 'Selenium', 'Accessibility'],
      links: [],
    },
    {
      id: 'trs-data-analyst-intern',
      kind: 'work',
      title: 'Data Analyst Intern',
      organization: "NYC Teachers' Retirement System (TRS)",
      startDate: '2020-06',
      endDate: '2020-08',
      location: 'Remote',
      summary:
        'Analyzed 27M+ records during a database modernization project, surfacing 200K+ migration errors and presenting insights to stakeholders.',
      highlights: [
        'Analyzed 27M+ records using Tableau Prep Builder, Tableau Desktop, and MS SQL Server to identify unique user patterns and 200K+ migration errors during database modernization, presenting insights to stakeholders through data visualization.',
      ],
      tags: ['Tableau', 'SQL', 'Data Analysis'],
      links: [],
    },
    {
      id: 'nyc-dot-data-analyst-intern',
      kind: 'work',
      title: 'Data Analyst Intern',
      organization: 'NYC Department of Transportation',
      startDate: '2019-10',
      endDate: '2020-01',
      location: 'Manhattan, NY',
      summary:
        'Analyzed a decade of traffic geospatial data and automated weekend advisory reporting with Python web scraping.',
      highlights: [
        "Analyzed 10+ years of traffic geospatial data with SQL and automated weekend advisory reporting with Python web scraping.",
      ],
      tags: ['SQL', 'Python', 'Data Analysis'],
      links: [],
    },

    // ------------------------------------------------------------ projects
    {
      id: 'the-lament',
      kind: 'project',
      title: 'The Lament',
      organization: 'Gameheads',
      startDate: '2025-06',
      endDate: '2025-12',
      summary:
        'A mythological click-and-point visual novel shipped on a 7-person remote team, with branching dialogue and choice-consequence tracking.',
      highlights: [
        'Shipped a mythological click-and-point visual novel game on a 7-person remote team.',
        'Developed the core gameplay system, implementing branching dialogue using Yarn Spinner, game design documentation, and choice-consequence tracking in C# and Unity.',
        'Mentored teammates in Git and GitHub, ensuring effective version control and collaboration.',
      ],
      tags: ['C#', 'Unity', 'Yarn Spinner'],
      links: [ { label: 'GitHub', href: 'https://github.com/NQ-bit/Nocturnal-Nightingale-Team' }, { label: 'itch.io', href: 'https://gameheads.itch.io/the-lament' } ],
    },
    {
      id: 'enjoy-your-stay-in-paradise',
      kind: 'project',
      title: 'Enjoy Your Stay In Paradise',
      organization: 'Gameheads',
      startDate: '2024-06',
      endDate: '2024-12',
      summary:
        'A narrative-driven food truck simulator shipped on a 7-person remote team, from game design docs through gameplay scripting.',
      highlights: [
        'Shipped a narrative-driven food truck simulator game on a 7-person remote team.',
        'Focused on gameplay scripting and project management, including task allocation and scope management using Trello.',
        "Authored the game design and technical documents covering the game's pitch, core mechanics, player backstory, and gameplay loop.",
        'Implemented assets, scenes, gameplay scripts, and the dialogue system with C#, Unity, and Yarn Spinner.',
      ],
      tags: ['C#', 'Unity', 'Yarn Spinner', 'Trello'],
      links: [ { label: 'GitHub', href: 'https://github.com/shanicesmith98/gameheads-sap-bb-24' }, { label: 'itch.io', href: 'https://gameheads.itch.io/enjoy-your-stay-in-paradise' } ],
    },
    {
      id: 'the-last-harvest',
      kind: 'project',
      title: 'The Last Harvest',
      startDate: '2021-05',
      endDate: '2021-05',
      summary:
        'A farming simulator built on a 3-person remote team, with sprite movement, animation, and collision handling.',
      highlights: [
        'Collaborated on narrative writing and game design elements for a farming simulator game on a 3-person remote team.',
        'Developed and implemented sprite movement mechanics using C# and Unity, including character animations, collision detection, and player input handling.',
      ],
      tags: ['C#', 'Unity'],
      links: [],
    },
  ],
};
