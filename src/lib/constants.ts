export const BRAND = {
  name: "VidhiDiya's Child Genius Academy",
  location: 'Vijaypur',
  fullName: "VidhiDiya's Child Genius Academy Vijaypur",
  phones: ['9035217929', '9243217929'],
  whatsapp: '9035217929',
} as const;

export const COLORS = {
  gold: '#FFD54F',
  creative: '#FF5252',
  sky: '#29B6F6',
  fresh: '#66BB6A',
  purple: '#AB47BC',
  bannerRed: '#B22222',
  bannerBlue: '#002366',
  portalWood: '#3D2314',
  portalBrass: '#C9A227',
  portalGlow: '#FFE082',
} as const;

const IMG = '/images';

export const IMAGES = {
  heroPortal: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_fbbf17a4-d96e-4c6f-91bc-8ab449bf601c-1df44ec6-eafb-4996-ba6c-77ee660e06ce.png`,
  classroomAbacus: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_b11f87ae-567d-4797-bfba-0355adb9d823-153aa472-4201-4fc8-a83d-a5bb6f84f75e.png`,
  parentTeacher: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_599c138a-4fe8-470d-a8b4-1cbc697854ca-d4a06d76-4af3-46a8-817a-b7991f54f0db.png`,
  groupClassroom: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_15050713-e989-4170-aeba-e6403c4971fc-90284646-9a17-47d4-a6d4-1bac742715c2.png`,
  certificates1: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_b4a49aba-784a-423b-bb39-ce17979c61f4-cc676a83-c1bb-4395-9569-118e62f4d1cc.png`,
  certificates2: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_5e689da7-d8c2-4794-a7b3-3d91290f60b9-e2ee60f0-1d42-40b3-aadf-ae347fe4a052.png`,
  medalsAwards: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_d86c5996-506f-487b-a376-da584ba986b4-6fdecc51-18ed-4ac5-9f26-c12737eb3923.png`,
  studentsFun: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_a2043b36-4579-4cc3-8679-1756bed8f1ce-ef9b7a2b-4624-45be-b0b6-5f4b95a675c8.png`,
  awardsCeremony: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_3dd5e5b0-d7af-4172-a71a-e8651fc75651-8febb784-7fab-49c1-9dda-faa4ac13ce56.png`,
  academyBanner: `${IMG}/academy-banner.png`,
} as const;

export const GALLERY_IMAGES = [
  { src: IMAGES.heroPortal, title: 'Welcome to Genius', caption: 'Where every journey begins' },
  { src: IMAGES.classroomAbacus, title: 'Abacus Learning', caption: 'Mental arithmetic mastery' },
  { src: IMAGES.parentTeacher, title: 'Parent Partnership', caption: 'Growing together' },
  { src: IMAGES.groupClassroom, title: 'Our Community', caption: 'Happy learners' },
  { src: IMAGES.certificates1, title: 'Achievements', caption: 'Term completion pride' },
  { src: IMAGES.certificates2, title: 'Certificates', caption: 'Celebrating success' },
  { src: IMAGES.medalsAwards, title: 'Awards Day', caption: 'Medals & milestones' },
  { src: IMAGES.studentsFun, title: 'Creative Fun', caption: 'Joy in learning' },
  { src: IMAGES.awardsCeremony, title: 'Grand Celebrations', caption: 'Trophies & triumphs' },
] as const;

/** Photos revealed from main character's hands in hero */
export const HAND_REVEAL_PHOTOS = [
  {
    src: IMAGES.classroomAbacus,
    title: 'Abacus Mastery',
    side: 'left' as const,
  },
  {
    src: IMAGES.certificates1,
    title: 'Proud Achievements',
    side: 'right' as const,
  },
] as const;

/** All courses from academy banner — mapped to real photos */
export const COURSES = [
  {
    id: 'abacus',
    name: 'Abacus Mental Arithmetic',
    emoji: '🧮',
    color: COLORS.gold,
    image: IMAGES.classroomAbacus,
    tagline: 'Train the brain. Lightning-fast mental math.',
  },
  {
    id: 'handwriting',
    name: 'Handwriting & Speed Writing',
    emoji: '✍️',
    color: COLORS.sky,
    image: IMAGES.certificates2,
    tagline: 'Beautiful letters. Faster writing skills.',
  },
  {
    id: 'sensory',
    name: 'Super Sensory Development',
    emoji: '🧠',
    color: COLORS.purple,
    image: IMAGES.parentTeacher,
    tagline: 'Awaken all senses. Unlock hidden potential.',
  },
  {
    id: 'art',
    name: 'Drawing, Painting & Craft',
    emoji: '🎨',
    color: COLORS.creative,
    image: IMAGES.studentsFun,
    tagline: 'Colors explode. Masterpieces emerge.',
  },
  {
    id: 'fitness',
    name: 'Aerobics & Fitness',
    emoji: '💪',
    color: COLORS.fresh,
    image: IMAGES.groupClassroom,
    tagline: 'Strong body. Active mind. Happy kids.',
  },
  {
    id: 'calligraphy',
    name: 'Calligraphy',
    emoji: '🖋️',
    color: COLORS.purple,
    image: IMAGES.certificates1,
    tagline: 'Elegant strokes. Artistic expression.',
  },
  {
    id: 'yoga',
    name: 'Yoga & Meditation',
    emoji: '🧘',
    color: COLORS.fresh,
    image: IMAGES.parentTeacher,
    tagline: 'Peace blooms. Focus deepens.',
  },
  {
    id: 'music',
    name: 'Music & Instrumental Class',
    emoji: '🎵',
    color: COLORS.sky,
    image: IMAGES.studentsFun,
    tagline: 'Notes dance. Instruments sing.',
  },
  {
    id: 'summer',
    name: 'Summer Camp',
    emoji: '☀️',
    color: COLORS.gold,
    image: IMAGES.awardsCeremony,
    tagline: 'Fun-filled learning adventures.',
  },
  {
    id: 'talent',
    name: 'Talent Development Programs',
    emoji: '🌟',
    color: COLORS.creative,
    image: IMAGES.medalsAwards,
    tagline: 'Discover gifts. Shine bright.',
  },
  {
    id: 'reflexology',
    name: 'Jain Reflexology & Healing',
    emoji: '🌿',
    color: COLORS.fresh,
    image: IMAGES.parentTeacher,
    tagline: 'Holistic wellness techniques.',
  },
  {
    id: 'dmit',
    name: 'DMIT Fingerprint Test',
    emoji: '🔬',
    color: COLORS.creative,
    image: IMAGES.academyBanner,
    tagline: 'Scientific counselling. Know your child\'s genius.',
    featured: true,
  },
] as const;

export const DEVELOPMENT_BENEFITS = [
  { icon: '🧠', title: 'Better Memory', desc: 'Enhanced recall through structured mental exercises' },
  { icon: '🎯', title: 'Better Focus', desc: 'Deep concentration skills for academic excellence' },
  { icon: '🎨', title: 'Creativity', desc: 'Unleashed imagination through art and craft' },
  { icon: '💪', title: 'Confidence', desc: 'Self-assurance built through achievement' },
  { icon: '🌟', title: 'Personality Development', desc: 'Well-rounded character growth' },
] as const;

export const TIMELINE_STAGES = [
  { stage: 'Discover', desc: 'Curiosity sparks the journey', color: COLORS.sky },
  { stage: 'Learn', desc: 'Skills take root and grow', color: COLORS.gold },
  { stage: 'Create', desc: 'Imagination becomes reality', color: COLORS.creative },
  { stage: 'Achieve', desc: 'Genius shines for all to see', color: COLORS.purple },
] as const;

export const TESTIMONIALS = [
  {
    quote: "My daughter's mental math speed improved dramatically. The abacus program is truly transformative.",
    author: 'Priya S.',
    role: 'Parent',
  },
  {
    quote: 'The handwriting and art classes gave my son confidence he never had before. Highly recommended!',
    author: 'Rajesh K.',
    role: 'Parent',
  },
  {
    quote: 'Award-winning academy with caring teachers. My children love coming here every day.',
    author: 'Anita M.',
    role: 'Parent',
  },
  {
    quote: "The DMIT fingerprint test gave us clear scientific insights into our son's natural strengths and learning style.",
    author: 'Suresh P.',
    role: 'Parent',
  },
  {
    quote: "Super Sensory Development & Yoga have remarkably enhanced my daughter's focus and memory retention.",
    author: 'Deepa R.',
    role: 'Parent',
  },
] as const;
