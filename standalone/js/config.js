const IMG = '../public/images';
const IMAGES = {
  heroPortal: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_fbbf17a4-d96e-4c6f-91bc-8ab449bf601c-1df44ec6-eafb-4996-ba6c-77ee660e06ce.png`,
  classroomAbacus: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_b11f87ae-567d-4797-bfba-0355adb9d823-153aa472-4201-4fc8-a83d-a5bb6f84f75e.png`,
  parentTeacher: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_599c138a-4fe8-470d-a8b4-1cbc697854ca-d4a06d76-4af3-46a8-817a-b7991f54f0db.png`,
  groupClassroom: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_15050713-e989-4170-aeba-e6403c4971fc-90284646-9a17-47d4-a6d4-1bac742715c2.png`,
  certificates1: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_b4a49aba-784a-423b-bb39-ce17979c61f4-cc676a83-c1bb-4395-9569-118e62f4d1cc.png`,
  certificates2: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_5e689da7-d8c2-4794-a7b3-3d91290f60b9-e2ee60f0-1d42-40b3-aadf-ae347fe4a052.png`,
  medalsAwards: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_d86c5996-506f-487b-a376-da584ba986b4-6fdecc51-18ed-4ac5-9f26-c12737eb3923.png`,
  studentsFun: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_a2043b36-4579-4cc3-8679-1756bed8f1ce-ef9b7a2b-4624-45be-b0b6-5f4b95a675c8.png`,
  awardsCeremony: `${IMG}/c__Users_yashs_AppData_Roaming_Cursor_User_workspaceStorage_2f0da3b1617062bdd2bf7fc6a997a23f_images_3dd5e5b0-d7af-4172-a71a-e8651fc75651-8febb784-7fab-49c1-9dda-faa4ac13ce56.png`,
};

const GALLERY = [
  { src: IMAGES.heroPortal, title: 'Welcome to Genius', caption: 'Where every journey begins' },
  { src: IMAGES.classroomAbacus, title: 'Abacus Learning', caption: 'Mental arithmetic mastery' },
  { src: IMAGES.parentTeacher, title: 'Parent Partnership', caption: 'Growing together' },
  { src: IMAGES.groupClassroom, title: 'Our Community', caption: 'Happy learners' },
  { src: IMAGES.certificates1, title: 'Achievements', caption: 'Term completion pride' },
  { src: IMAGES.certificates2, title: 'Certificates', caption: 'Celebrating success' },
  { src: IMAGES.medalsAwards, title: 'Awards Day', caption: 'Medals & milestones' },
  { src: IMAGES.studentsFun, title: 'Creative Fun', caption: 'Joy in learning' },
  { src: IMAGES.awardsCeremony, title: 'Grand Celebrations', caption: 'Trophies & triumphs' },
];

const COURSES = [
  { emoji: '🧮', name: 'Abacus World', color: '#FFD54F', tagline: 'Train the brain. Improve speed. Build concentration.', programs: ['Abacus Mental Arithmetic'] },
  { emoji: '🎨', name: 'Art World', color: '#FF5252', tagline: 'Colors explode. Creativity flows.', programs: ['Drawing', 'Painting', 'Calligraphy'] },
  { emoji: '✂️', name: 'Craft World', color: '#AB47BC', tagline: 'Paper transforms. Imagination soars.', programs: ['Arts & Craft', 'Handwriting', 'Speed Writing'] },
  { emoji: '🎵', name: 'Music World', color: '#29B6F6', tagline: 'Notes dance. Instruments sing.', programs: ['Music & Instrument Classes'] },
  { emoji: '🧘', name: 'Yoga World', color: '#66BB6A', tagline: 'Peace blooms. Focus deepens.', programs: ['Yoga & Meditation', 'Super Sensory Development'] },
  { emoji: '🌟', name: 'Talent World', color: '#AB47BC', tagline: 'Discover gifts. Shine bright.', programs: ['Summer Camps', 'Talent Development'] },
];

const PHONES = ['9035217929', '9243217929'];
