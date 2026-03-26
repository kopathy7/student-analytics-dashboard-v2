// ========================================
// MOCK DATA - Comprehensive Student Analytics
// ========================================

export const studentProfile = {
  id: 'STU-2024-001',
  name: 'Alex Rivera',
  avatar: '🧑‍🎓',
  grade: '11th Grade',
  school: 'Quantum Academy',
  section: 'A',
  age: 17,
  email: 'alex.rivera@student.edu',
  phone: '+1 (555) 123-4567',
  bio: 'Aspiring computer scientist with a passion for mathematics and physics. Active member of the robotics club and debate team.',
  joinDate: '2024-06-15',
  learningStyle: 'Visual',
  motto: 'Learn. Build. Innovate.',
  level: 27,
  xp: 4750,
  xpToNext: 5000,
  totalXP: 27500,
  streak: 14,
  rank: 3,
  totalStudents: 150,
  badges: [
    { id: 1, name: 'Consistency King', icon: '👑', desc: '14-day study streak', earned: true, date: '2026-03-20' },
    { id: 2, name: 'Math Wizard', icon: '🧙', desc: 'Score 95+ in Math', earned: true, date: '2026-03-15' },
    { id: 3, name: 'Night Owl', icon: '🦉', desc: 'Study after 10 PM 7 days', earned: true, date: '2026-03-10' },
    { id: 4, name: 'Science Star', icon: '⭐', desc: 'Top 5 in Science', earned: true, date: '2026-03-01' },
    { id: 5, name: 'Speed Reader', icon: '📚', desc: 'Complete 50 chapters', earned: true, date: '2026-02-20' },
    { id: 6, name: 'Perfect Week', icon: '💎', desc: '100% attendance for a week', earned: true, date: '2026-02-15' },
    { id: 7, name: 'Quiz Champion', icon: '🏆', desc: 'Win 10 peer challenges', earned: false, progress: 7 },
    { id: 8, name: 'Early Bird', icon: '🐦', desc: 'Study before 6 AM 5 days', earned: false, progress: 2 },
    { id: 9, name: 'Genius Level', icon: '🧠', desc: 'Reach Level 30', earned: false, progress: 27 },
    { id: 10, name: 'Social Butterfly', icon: '🦋', desc: 'Join 5 study groups', earned: false, progress: 3 },
    { id: 11, name: 'Marathon Runner', icon: '🏃', desc: '30-day streak', earned: false, progress: 14 },
    { id: 12, name: 'All Rounder', icon: '🎯', desc: '80+ in all subjects', earned: false, progress: 5 },
  ]
};

export const subjects = [
  { id: 1, name: 'Mathematics', icon: '📐', color: '#6366f1', shortName: 'Math' },
  { id: 2, name: 'Physics', icon: '⚡', color: '#a855f7', shortName: 'Phys' },
  { id: 3, name: 'Chemistry', icon: '🧪', color: '#06b6d4', shortName: 'Chem' },
  { id: 4, name: 'Biology', icon: '🧬', color: '#10b981', shortName: 'Bio' },
  { id: 5, name: 'English', icon: '📝', color: '#f59e0b', shortName: 'Eng' },
  { id: 6, name: 'Computer Science', icon: '💻', color: '#ec4899', shortName: 'CS' },
  { id: 7, name: 'History', icon: '📜', color: '#f97316', shortName: 'Hist' },
];

export const grades = {
  current: [
    { subject: 'Mathematics', score: 92, maxScore: 100, grade: 'A+', trend: 'up', change: +5, chapters: [
      { name: 'Calculus', score: 95, mastery: 92 },
      { name: 'Algebra', score: 88, mastery: 85 },
      { name: 'Trigonometry', score: 90, mastery: 88 },
      { name: 'Statistics', score: 94, mastery: 91 },
    ]},
    { subject: 'Physics', score: 78, maxScore: 100, grade: 'B+', trend: 'down', change: -3, chapters: [
      { name: 'Mechanics', score: 82, mastery: 78 },
      { name: 'Thermodynamics', score: 68, mastery: 60 },
      { name: 'Optics', score: 85, mastery: 80 },
      { name: 'Electromagnetism', score: 75, mastery: 70 },
    ]},
    { subject: 'Chemistry', score: 85, maxScore: 100, grade: 'A', trend: 'up', change: +2, chapters: [
      { name: 'Organic Chemistry', score: 82, mastery: 78 },
      { name: 'Inorganic Chemistry', score: 88, mastery: 85 },
      { name: 'Physical Chemistry', score: 85, mastery: 80 },
    ]},
    { subject: 'Biology', score: 88, maxScore: 100, grade: 'A', trend: 'up', change: +4, chapters: [
      { name: 'Genetics', score: 92, mastery: 90 },
      { name: 'Cell Biology', score: 85, mastery: 82 },
      { name: 'Ecology', score: 88, mastery: 85 },
    ]},
    { subject: 'English', score: 91, maxScore: 100, grade: 'A+', trend: 'same', change: 0, chapters: [
      { name: 'Literature', score: 93, mastery: 90 },
      { name: 'Grammar', score: 89, mastery: 87 },
      { name: 'Writing', score: 91, mastery: 88 },
    ]},
    { subject: 'Computer Science', score: 96, maxScore: 100, grade: 'A+', trend: 'up', change: +3, chapters: [
      { name: 'Data Structures', score: 98, mastery: 95 },
      { name: 'Algorithms', score: 95, mastery: 92 },
      { name: 'Databases', score: 94, mastery: 90 },
    ]},
    { subject: 'History', score: 82, maxScore: 100, grade: 'A-', trend: 'up', change: +6, chapters: [
      { name: 'World Wars', score: 85, mastery: 82 },
      { name: 'Ancient Civilizations', score: 80, mastery: 75 },
      { name: 'Modern History', score: 82, mastery: 78 },
    ]},
  ],
  history: [
    { month: 'Oct 2025', avg: 79 },
    { month: 'Nov 2025', avg: 81 },
    { month: 'Dec 2025', avg: 83 },
    { month: 'Jan 2026', avg: 82 },
    { month: 'Feb 2026', avg: 86 },
    { month: 'Mar 2026', avg: 89 },
  ]
};

// Generate 6 months of attendance data
const generateAttendance = () => {
  const data = [];
  const startDate = new Date('2025-10-01');
  const endDate = new Date('2026-03-25');
  const current = new Date(startDate);
  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const rand = Math.random();
      let status = 'present';
      if (rand > 0.92) status = 'absent';
      else if (rand > 0.87) status = 'late';
      data.push({
        date: current.toISOString().split('T')[0],
        status,
        dayOfWeek,
      });
    }
    current.setDate(current.getDate() + 1);
  }
  return data;
};

export const attendance = {
  records: generateAttendance(),
  get summary() {
    const present = this.records.filter(r => r.status === 'present').length;
    const late = this.records.filter(r => r.status === 'late').length;
    const absent = this.records.filter(r => r.status === 'absent').length;
    const total = this.records.length;
    return { present, late, absent, total, percentage: Math.round(((present + late) / total) * 100) };
  }
};

export const studyHeatmap = (() => {
  const data = [];
  const today = new Date('2026-03-25');
  for (let i = 0; i < 180; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    let hours = 0;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      hours = Math.floor(Math.random() * 5) + 2;
    } else {
      hours = Math.floor(Math.random() * 4) + 1;
    }
    if (Math.random() > 0.9) hours = 0;
    data.push({
      date: d.toISOString().split('T')[0],
      hours,
      dayOfWeek,
    });
  }
  return data.reverse();
})();

export const leaderboard = [
  { rank: 1, name: 'Sophia Chen', avatar: '👩‍🔬', score: 96.2, xp: 32000, level: 32, change: 0 },
  { rank: 2, name: 'Marcus Johnson', avatar: '👨‍💻', score: 94.5, xp: 30500, level: 30, change: 1 },
  { rank: 3, name: 'Alex Rivera', avatar: '🧑‍🎓', score: 89.1, xp: 27500, level: 27, change: -1, isCurrentUser: true },
  { rank: 4, name: 'Priya Patel', avatar: '👩‍🎓', score: 88.7, xp: 26800, level: 26, change: 2 },
  { rank: 5, name: 'James Williams', avatar: '👨‍🎓', score: 87.3, xp: 25500, level: 25, change: -1 },
  { rank: 6, name: 'Aisha Khan', avatar: '👩‍💼', score: 86.9, xp: 25200, level: 25, change: 0 },
  { rank: 7, name: 'David Lee', avatar: '🧑‍💼', score: 85.1, xp: 24000, level: 24, change: 3 },
  { rank: 8, name: 'Emma Wilson', avatar: '👩‍🔬', score: 84.6, xp: 23500, level: 23, change: -2 },
  { rank: 9, name: 'Ryan Garcia', avatar: '👨‍🎓', score: 83.4, xp: 22800, level: 22, change: 1 },
  { rank: 10, name: 'Mia Thompson', avatar: '👩‍🎓', score: 82.8, xp: 22200, level: 22, change: -1 },
];

export const teacherRemarks = [
  { id: 1, teacher: 'Dr. Sarah Mitchell', subject: 'Mathematics', date: '2026-03-22', remark: 'Excellent improvement in calculus! Keep up the great work. Your problem-solving approach is becoming much more systematic.', sentiment: 'positive', avatar: '👩‍🏫' },
  { id: 2, teacher: 'Mr. Robert Zhang', subject: 'Physics', date: '2026-03-20', remark: 'Needs to focus more on Thermodynamics. The concepts are getting complex and regular practice is essential. Consider joining the study group.', sentiment: 'warning', avatar: '👨‍🏫' },
  { id: 3, teacher: 'Ms. Emily Parker', subject: 'English', date: '2026-03-18', remark: 'Outstanding essay writing skills. The literary analysis was particularly impressive. A strong candidate for the creative writing competition.', sentiment: 'positive', avatar: '👩‍🏫' },
  { id: 4, teacher: 'Dr. Alan Cooper', subject: 'Computer Science', date: '2026-03-15', remark: 'Top performer in the class. The data structures project was exceptionally well-designed. I recommend exploring advanced algorithms.', sentiment: 'positive', avatar: '👨‍🏫' },
  { id: 5, teacher: 'Ms. Jennifer Liu', subject: 'Chemistry', date: '2026-03-12', remark: 'Good overall performance. Organic chemistry needs more attention. The lab work is excellent though.', sentiment: 'neutral', avatar: '👩‍🏫' },
];

export const alerts = [
  { id: 1, type: 'warning', title: 'Physics Performance Declining', message: 'Your Physics score dropped by 3% this month. Focus on Thermodynamics.', time: '2 hours ago', icon: '⚠️', read: false },
  { id: 2, type: 'success', title: 'New Badge Earned!', message: 'You earned the "Consistency King" badge for maintaining a 14-day streak!', time: '1 day ago', icon: '🏆', read: false },
  { id: 3, type: 'info', title: 'Exam Approaching', message: 'Mathematics mid-term exam in 12 days. Start revision now!', time: '1 day ago', icon: '📝', read: true },
  { id: 4, type: 'danger', title: 'Streak at Risk!', message: "You haven't logged any study time today. Don't break your 14-day streak!", time: '3 hours ago', icon: '🔥', read: false },
  { id: 5, type: 'info', title: 'Study Group Invitation', message: 'Priya Patel invited you to join "Physics Masters" study group.', time: '2 days ago', icon: '👥', read: true },
  { id: 6, type: 'success', title: 'Weekly Goal Achieved', message: 'You completed your weekly study goal of 20 hours. Great discipline!', time: '3 days ago', icon: '✅', read: true },
];

export const exams = [
  { id: 1, subject: 'Mathematics', date: '2026-04-06', type: 'Mid-Term', topics: ['Calculus', 'Statistics'], difficulty: 'Hard' },
  { id: 2, subject: 'Physics', date: '2026-04-10', type: 'Mid-Term', topics: ['Thermodynamics', 'Electromagnetism'], difficulty: 'Hard' },
  { id: 3, subject: 'Chemistry', date: '2026-04-14', type: 'Mid-Term', topics: ['Organic Chemistry'], difficulty: 'Medium' },
  { id: 4, subject: 'English', date: '2026-04-18', type: 'Essay', topics: ['Literature Analysis'], difficulty: 'Medium' },
  { id: 5, subject: 'Computer Science', date: '2026-04-22', type: 'Practical', topics: ['Data Structures', 'Algorithms'], difficulty: 'Hard' },
];

export const dailyChallenges = [
  { id: 1, title: 'Solve 5 Calculus Problems', xp: 50, subject: 'Mathematics', completed: true, icon: '📐' },
  { id: 2, title: 'Read Physics Chapter 8', xp: 30, subject: 'Physics', completed: false, icon: '⚡' },
  { id: 3, title: 'Practice 10 Chemistry Equations', xp: 40, subject: 'Chemistry', completed: false, icon: '🧪' },
  { id: 4, title: 'Write a 500-word Essay', xp: 60, subject: 'English', completed: false, icon: '📝' },
];

export const studyMissions = [
  { id: 1, title: 'Physics Recovery Mission', desc: 'Improve Physics score by 10% in 2 weeks', xp: 500, progress: 35, deadline: '2026-04-08', status: 'active' },
  { id: 2, title: 'Math Mastery', desc: 'Score 95+ in next 3 Math tests', xp: 750, progress: 66, deadline: '2026-04-20', status: 'active' },
  { id: 3, title: 'Study Marathon', desc: 'Study 30 hours in one week', xp: 300, progress: 80, deadline: '2026-03-30', status: 'active' },
];

export const weeklySchedule = [
  { day: 'Monday', slots: [
    { time: '8:00', subject: 'Mathematics', type: 'class' },
    { time: '10:00', subject: 'Physics', type: 'class' },
    { time: '14:00', subject: 'Chemistry', type: 'lab' },
    { time: '16:00', subject: 'Self Study', type: 'study' },
  ]},
  { day: 'Tuesday', slots: [
    { time: '8:00', subject: 'English', type: 'class' },
    { time: '10:00', subject: 'Computer Science', type: 'lab' },
    { time: '14:00', subject: 'Biology', type: 'class' },
    { time: '16:00', subject: 'Self Study', type: 'study' },
  ]},
  { day: 'Wednesday', slots: [
    { time: '8:00', subject: 'Mathematics', type: 'class' },
    { time: '10:00', subject: 'History', type: 'class' },
    { time: '14:00', subject: 'Physics', type: 'lab' },
    { time: '16:00', subject: 'Self Study', type: 'study' },
  ]},
  { day: 'Thursday', slots: [
    { time: '8:00', subject: 'Chemistry', type: 'class' },
    { time: '10:00', subject: 'English', type: 'class' },
    { time: '14:00', subject: 'Computer Science', type: 'class' },
    { time: '16:00', subject: 'Self Study', type: 'study' },
  ]},
  { day: 'Friday', slots: [
    { time: '8:00', subject: 'Biology', type: 'class' },
    { time: '10:00', subject: 'Mathematics', type: 'class' },
    { time: '14:00', subject: 'History', type: 'class' },
    { time: '16:00', subject: 'Review Session', type: 'study' },
  ]},
];

export const motivationalQuotes = [
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "Education is the passport to the future.", author: "Malcolm X" },
  { quote: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King" },
  { quote: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
];

export const studyGroups = [
  { id: 1, name: 'Physics Masters', members: 8, subject: 'Physics', avatar: '⚡', active: true },
  { id: 2, name: 'Code Warriors', members: 12, subject: 'Computer Science', avatar: '💻', active: true },
  { id: 3, name: 'Math Geeks', members: 6, subject: 'Mathematics', avatar: '📐', active: true },
  { id: 4, name: 'Bio Explorers', members: 5, subject: 'Biology', avatar: '🧬', active: false },
];

export const productivityByHour = [
  { hour: '6 AM', productivity: 65 },
  { hour: '7 AM', productivity: 72 },
  { hour: '8 AM', productivity: 85 },
  { hour: '9 AM', productivity: 92 },
  { hour: '10 AM', productivity: 95 },
  { hour: '11 AM', productivity: 88 },
  { hour: '12 PM', productivity: 60 },
  { hour: '1 PM', productivity: 55 },
  { hour: '2 PM', productivity: 70 },
  { hour: '3 PM', productivity: 78 },
  { hour: '4 PM', productivity: 82 },
  { hour: '5 PM', productivity: 75 },
  { hour: '6 PM', productivity: 68 },
  { hour: '7 PM', productivity: 80 },
  { hour: '8 PM', productivity: 88 },
  { hour: '9 PM', productivity: 90 },
  { hour: '10 PM', productivity: 85 },
  { hour: '11 PM', productivity: 70 },
];

export const behavioralData = {
  focusScore: 78,
  procrastinationIndex: 22,
  burnoutRisk: 35,
  consistencyScore: 82,
  learningStyle: {
    visual: 65,
    auditory: 20,
    kinesthetic: 15,
  },
  studyPatterns: {
    avgDailyHours: 3.5,
    peakHour: '9 AM - 11 AM',
    preferredSubjectOrder: ['CS', 'Math', 'Physics', 'Chemistry'],
    breakFrequency: 'Every 45 min',
  },
  moodHistory: [
    { date: '2026-03-25', mood: 'focused', score: 85 },
    { date: '2026-03-24', mood: 'motivated', score: 90 },
    { date: '2026-03-23', mood: 'tired', score: 55 },
    { date: '2026-03-22', mood: 'stressed', score: 40 },
    { date: '2026-03-21', mood: 'calm', score: 75 },
    { date: '2026-03-20', mood: 'energetic', score: 88 },
    { date: '2026-03-19', mood: 'focused', score: 82 },
  ],
};

export const predictions = {
  futureScores: {
    optimistic: { Math: 96, Physics: 85, Chemistry: 90, Biology: 92, English: 93, CS: 98, History: 88 },
    current: { Math: 92, Physics: 78, Chemistry: 85, Biology: 88, English: 91, CS: 96, History: 82 },
    pessimistic: { Math: 88, Physics: 72, Chemistry: 80, Biology: 84, English: 88, CS: 93, History: 78 },
  },
  dropoutRisk: 5,
  examSuccessProbability: 87,
  optimalStudyHours: 4.2,
  efficiencyScore: 72,
  hiddenTalents: [
    { talent: 'Logical Reasoning', confidence: 94, desc: 'Unusually strong pattern recognition in math and CS' },
    { talent: 'Creative Writing', confidence: 88, desc: 'Essay scores consistently exceed expectations' },
    { talent: 'Data Analysis', confidence: 85, desc: 'Strong correlation between CS and Math performance' },
  ],
};

export const aiChatResponses = [
  { trigger: 'study', response: "Based on your data, I recommend focusing on Physics - Thermodynamics today. You have an exam in 16 days and your mastery is only 60% in that chapter. Try 45-minute focused sessions with 10-minute breaks." },
  { trigger: 'weak', response: "Your weakest areas are: 1) Physics - Thermodynamics (60% mastery), 2) Physics - Electromagnetism (70% mastery), 3) History - Ancient Civilizations (75% mastery). I suggest dedicating 40% of your study time to these topics." },
  { trigger: 'predict', response: "Based on your current trajectory: Math → 94% (↑), Physics → 80% (↑ if you focus), Chemistry → 87% (↑), CS → 98% (↑). Overall predicted improvement: +3.5% by next exam." },
  { trigger: 'improve', response: "To improve your overall score by 5%, focus on: 1) Physics Thermodynamics (+15% possible), 2) History Ancient Civilizations (+8% possible), 3) Chemistry Organic (+5% possible). This translates to ~4.2 hours of targeted study daily." },
  { trigger: 'motivate', response: "You're on a 14-day streak! 🔥 Your overall performance has improved 10% in 6 months. At this rate, you'll be in the top 2 by next semester. Keep pushing — you're closer than you think!" },
  { trigger: 'plan', response: "Here's your optimized study plan for today:\n• 9:00 AM - Physics: Thermodynamics (45 min)\n• 10:00 AM - Math: Statistics revision (45 min)\n• 11:00 AM - Break & snack 🍎\n• 11:30 AM - Chemistry: Organic Chemistry (45 min)\n• 1:00 PM - Lunch break\n• 2:00 PM - CS: Algorithm practice (60 min)\n• 3:30 PM - English: Essay writing (45 min)" },
  { trigger: 'default', response: "I'm your AI Study Assistant! Ask me about:\n• What to study today\n• Your weak areas\n• Score predictions\n• Study plans\n• How to improve\n• Motivational boost\n\nJust type naturally and I'll help you optimize your learning!" },
];
