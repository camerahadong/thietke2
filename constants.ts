import { User, Activity, Event, BlogPost, Badge, UserLevel, ActivityType, GalleryImage, Album, ClubRecord, Challenge } from './types';

// --- Helpers for generating random data ---
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(2));
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Badges Data
export const BADGES: Badge[] = [
  { id: 'b1', name: 'First Steps', category: 'Distance', icon: '👶', description: 'Hoàn thành run đầu tiên' },
  { id: 'b2', name: '100K Club', category: 'Distance', icon: '💯', description: 'Tích lũy 100km' },
  { id: 'b3', name: 'Speed Demon', category: 'Speed', icon: '⚡', description: 'Pace < 5:00/km' },
  { id: 'b4', name: 'Mountain Goat', category: 'Elevation', icon: '🐐', description: 'Tích lũy 10,000m elevation' },
  { id: 'b5', name: 'Early Bird', category: 'Consistency', icon: '🌅', description: '10 runs trước 6:00 AM' },
  { id: 'b6', name: 'Marathon Finisher', category: 'Distance', icon: '🎖️', description: 'Hoàn thành 42.2km' },
  { id: 'b7', name: 'Ultra Runner', category: 'Distance', icon: '🦁', description: 'Hoàn thành > 50km' },
  { id: 'b8', name: 'Social Butterfly', category: 'Social', icon: '🦋', description: 'Tham gia 10 sự kiện' },
];

// --- 1. USERS GENERATION ---
const firstNames = ['Minh', 'Hùng', 'Lan', 'Vy', 'Tuấn', 'Dũng', 'Giang', 'Hương', 'Linh', 'Quang', 'Đức', 'Thảo', 'Trang', 'Nam', 'Việt', 'Bảo', 'Ngọc', 'Tâm', 'Sơn', 'Hà'];
const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Nha Trang', 'Vũng Tàu', 'Đà Lạt', 'Sa Pa', 'Huế'];

const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  
  // Create some "Core" high performing users first to ensure good leaderboard data
  users.push(
    { id: 'u1', firstName: 'Minh', lastName: 'Nguyễn', avatar: 'https://i.pravatar.cc/150?u=u1', city: 'Hà Nội', level: UserLevel.Elite, xp: 8200, totalDistance: 1250.5, streak: 45, badges: [BADGES[0], BADGES[1], BADGES[2], BADGES[5], BADGES[6]] },
    { id: 'u2', firstName: 'Lan', lastName: 'Trần', avatar: 'https://i.pravatar.cc/150?u=u2', city: 'TP. Hồ Chí Minh', level: UserLevel.Serious, xp: 4800, totalDistance: 890.2, streak: 12, badges: [BADGES[0], BADGES[1], BADGES[4]] },
    { id: 'u3', firstName: 'Hùng', lastName: 'Phạm', avatar: 'https://i.pravatar.cc/150?u=u3', city: 'Đà Nẵng', level: UserLevel.Dedicated, xp: 3600, totalDistance: 620.0, streak: 5, badges: [BADGES[0], BADGES[2]] },
    { id: 'u4', firstName: 'Vy', lastName: 'Lê', avatar: 'https://i.pravatar.cc/150?u=u4', city: 'Hà Nội', level: UserLevel.Pro, xp: 9500, totalDistance: 2100.4, streak: 102, badges: [BADGES[0], BADGES[1], BADGES[3], BADGES[5], BADGES[6]] }
  );

  // Generate the rest
  for (let i = 5; i <= count; i++) {
    const level = randomInt(1, 6) as UserLevel;
    const distanceBase = level * 100; // higher level, more distance
    users.push({
      id: `u${i}`,
      firstName: randomItem(firstNames),
      lastName: randomItem(lastNames),
      avatar: `https://i.pravatar.cc/150?u=u${i}`,
      city: randomItem(cities),
      level: level,
      xp: level * 500 + randomInt(0, 400),
      totalDistance: randomFloat(distanceBase - 50, distanceBase + 200),
      streak: randomInt(0, 20),
      badges: [BADGES[0], ...((level > 3) ? [BADGES[1]] : [])],
    });
  }
  
  // Sort by distance to simulate a leaderboard state
  return users.sort((a, b) => b.totalDistance - a.totalDistance);
};

export const USERS: User[] = generateUsers(30);


// --- 2. ACTIVITIES GENERATION ---
const activityNames = [
  'Morning Run', 'Evening Run', 'Lunch Run', 'Sunday Long Run', 'Interval Training', 
  'Tempo Run', 'Recovery Jog', 'Hill Repeats', 'Track Session', 'Night Run'
];
const locations = ['West Lake', 'Thong Nhat Park', 'Sala Area', 'Nguyen Hue Walking Street', 'My Khe Beach', 'Hoan Kiem Lake', 'Phu My Hung', 'Han River'];

const generateActivities = (count: number): Activity[] => {
  const activities: Activity[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const user = randomItem(USERS);
    const date = new Date(now);
    date.setDate(date.getDate() - randomInt(0, 7)); // Within last 7 days
    
    const dist = randomFloat(3, 22);
    // Rough pace calculation: 4:00 to 7:00 min/km -> 240s to 420s per km
    const pace = randomInt(240, 420); 
    const time = Math.floor(dist * pace);

    activities.push({
      id: `a${i}`,
      userId: user.id,
      name: `${randomItem(activityNames)} @ ${randomItem(locations)}`,
      distance: dist,
      movingTime: time,
      elevationGain: randomInt(10, 200),
      averagePace: pace,
      date: date.toISOString(),
      type: Math.random() > 0.9 ? ActivityType.TrailRun : ActivityType.Run,
      kudos: randomInt(0, 50),
    });
  }
  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const ACTIVITIES: Activity[] = generateActivities(25);


// --- 3. EVENTS GENERATION ---
export const EVENTS: Event[] = [
  {
    id: 'e1',
    name: 'VnExpress Marathon Hanoi Midnight',
    date: '2023-11-26',
    location: 'Hà Nội',
    distance: '5K, 10K, 21K, 42K',
    type: 'Official',
    registeredCount: 125,
    imageUrl: 'https://images.unsplash.com/photo-1533561096965-75211516086f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e2',
    name: 'Techcombank Ho Chi Minh City Marathon',
    date: '2023-12-10',
    location: 'TP. Hồ Chí Minh',
    distance: '42K, 21K, 10K, 5K',
    type: 'Official',
    registeredCount: 340,
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e3',
    name: 'Club Sunday Long Run',
    date: '2023-10-29',
    location: 'Công viên Thống Nhất',
    distance: '15K, 25K',
    type: 'Training',
    registeredCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e4',
    name: 'Da Lat Ultra Trail 2024',
    date: '2024-03-15',
    location: 'Đà Lạt',
    distance: '10K, 21K, 42K, 70K',
    type: 'Official',
    registeredCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e5',
    name: 'Ecopark City Trail',
    date: '2023-11-15',
    location: 'Hưng Yên',
    distance: '5K, 10K, 21K',
    type: 'Official',
    registeredCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e6',
    name: 'Interval Wednesday',
    date: '2023-10-25',
    location: 'SVĐ Hàng Đẫy',
    distance: '800m Repeats',
    type: 'Training',
    registeredCount: 25,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e7',
    name: 'Virtual Run: Chạy Vì Trái Tim',
    date: '2023-11-01',
    location: 'Online',
    distance: 'Accumulate 50K',
    type: 'Virtual',
    registeredCount: 560,
    imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e8',
    name: 'Ironman 70.3 Vietnam',
    date: '2024-05-07',
    location: 'Đà Nẵng',
    distance: '1.9K Swim, 90K Bike, 21K Run',
    type: 'Official',
    registeredCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1519315901367-285ef332e5e8?auto=format&fit=crop&w=800&q=80',
  }
];


// --- 4. BLOG POSTS GENERATION ---
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'p1',
    title: '5 Mẹo để cải thiện pace 10K của bạn',
    excerpt: 'Làm thế nào để chạy nhanh hơn mà không bị kiệt sức? Hãy cùng tìm hiểu về các bài tập interval và tempo run.',
    author: 'Coach Hùng',
    date: '20 Oct 2023',
    category: 'Training',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f9a163152fa4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    title: 'Review giày Nike Pegasus 40',
    excerpt: 'Đánh giá chi tiết về đôi giày "quốc dân" sau 100km trải nghiệm thực tế trên đường nhựa.',
    author: 'Minh Nguyễn',
    date: '18 Oct 2023',
    category: 'Review',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    title: 'Dinh dưỡng cho ngày Race Day',
    excerpt: 'Những gì bạn ăn trước khi xuất phát có thể quyết định thành tích của bạn. Đây là thực đơn gợi ý.',
    author: 'Bs. Lan',
    date: '15 Oct 2023',
    category: 'Dinh dưỡng',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p4',
    title: 'Tổng kết giải Techcombank HCMC 2022',
    excerpt: 'Một ngày hội thực sự của runner Việt Nam với hơn 10.000 VĐV tham dự. CLB chúng ta đã gặt hái nhiều PR.',
    author: 'Ban Quản Trị',
    date: '12 Dec 2022',
    category: 'Recap',
    imageUrl: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p5',
    title: 'Chạy bộ và sức khỏe tinh thần',
    excerpt: 'Tại sao chạy bộ lại được coi là liều thuốc tự nhiên tốt nhất cho stress và lo âu?',
    author: 'Bs. Tâm',
    date: '10 Oct 2023',
    category: 'Kiến thức',
    imageUrl: 'https://images.unsplash.com/photo-1440186347098-386b7459ad6b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p6',
    title: 'Lịch trình tập luyện cho Half Marathon đầu tiên',
    excerpt: 'Giáo án 12 tuần chi tiết dành cho người mới bắt đầu muốn chinh phục cự ly 21km.',
    author: 'Coach Hùng',
    date: '05 Oct 2023',
    category: 'Training',
    imageUrl: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p7',
    title: 'Top 5 phụ kiện không thể thiếu của Runner',
    excerpt: 'Từ đồng hồ GPS, đai chạy bộ đến tai nghe dẫn truyền xương. Đâu là thứ đáng đầu tư nhất?',
    author: 'Vy Lê',
    date: '01 Oct 2023',
    category: 'Review',
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p8',
    title: 'Phục hồi sau chấn thương IT Band',
    excerpt: 'Hội chứng dải chậu chày là nỗi ám ảnh của nhiều runner. Cùng tìm hiểu cách phòng tránh và điều trị.',
    author: 'Bs. Lan',
    date: '28 Sep 2023',
    category: 'Kiến thức',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&w=800&q=80',
  }
];


// --- 5. GALLERY ALBUMS GENERATION ---
// Grouped into Albums
export const GALLERY_ALBUMS: Album[] = [
  {
    id: 'a1',
    title: 'VnExpress Marathon Hanoi Midnight 2023',
    date: '26 Nov 2023',
    tag: 'Race',
    description: 'Khoảnh khắc rực rỡ của CLB tại giải chạy đêm Hà Nội.',
    coverUrl: 'https://images.unsplash.com/photo-1533561096965-75211516086f?auto=format&fit=crop&w=800&q=80',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1533561096965-75211516086f?auto=format&fit=crop&w=1200&q=80', caption: 'Xuất phát', date: '2023-11-26', description: '' },
      { id: '2', url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80', caption: 'Về đích', date: '2023-11-26', description: '' },
      { id: '3', url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80', caption: 'Đồng đội', date: '2023-11-26', description: '' },
      { id: '4', url: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=1200&q=80', caption: 'Huy chương', date: '2023-11-26', description: '' },
    ]
  },
  {
    id: 'a2',
    title: 'Sunday Long Run - Hồ Tây',
    date: '29 Oct 2023',
    tag: 'Training',
    description: 'Buổi chạy dài cuối tuần quanh Hồ Tây trong tiết trời thu.',
    coverUrl: 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&w=800&q=80',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&w=1200&q=80', caption: 'Khởi động', date: '2023-10-29', description: '' },
      { id: '2', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80', caption: 'Trên đường chạy', date: '2023-10-29', description: '' },
      { id: '3', url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80', caption: 'Coffee Time', date: '2023-10-29', description: '' },
    ]
  },
  {
    id: 'a3',
    title: 'Year End Party 2022',
    date: '15 Jan 2023',
    tag: 'Social',
    description: 'Tiệc tất niên tổng kết năm 2022 đầy cảm xúc.',
    coverUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80', caption: 'Khai mạc', date: '2023-01-15', description: '' },
      { id: '2', url: 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&w=1200&q=80', caption: 'Trao giải', date: '2023-01-15', description: '' },
    ]
  },
  {
    id: 'a4',
    title: 'Da Lat Ultra Trail Trip',
    date: '15 Mar 2023',
    tag: 'Race',
    description: 'Chuyến du đấu tại Đà Lạt mộng mơ và thử thách.',
    coverUrl: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=800&q=80',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=80', caption: 'Rừng thông', date: '2023-03-15', description: '' },
      { id: '2', url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80', caption: 'Đỉnh núi', date: '2023-03-15', description: '' },
      { id: '3', url: 'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=1200&q=80', caption: 'Team Checkin', date: '2023-03-15', description: '' },
    ]
  },
  {
    id: 'a5',
    title: 'Track Session Hàng Đẫy',
    date: '10 Oct 2023',
    tag: 'Training',
    description: 'Bài tập Interval 800m đầy tốc độ.',
    coverUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', caption: 'Sân vận động', date: '2023-10-10', description: '' },
      { id: '2', url: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1200&q=80', caption: 'Chạy biến tốc', date: '2023-10-10', description: '' },
    ]
  }
];

export const CLUB_RECORDS: ClubRecord[] = [
  { id: 'r1', category: '5K', value: '18:45', holder: 'Minh Nguyễn', year: '2024', type: 'Male' },
  { id: 'r2', category: '5K', value: '21:30', holder: 'Lan Trần', year: '2024', type: 'Female' },
  { id: 'r3', category: '10K', value: '38:20', holder: 'Hùng Phạm', year: '2023', type: 'Male' },
  { id: 'r4', category: '10K', value: '44:15', holder: 'Vy Lê', year: '2024', type: 'Female' },
  { id: 'r5', category: 'Half Marathon', value: '1:25:30', holder: 'Minh Nguyễn', year: '2024', type: 'Male' },
  { id: 'r6', category: 'Half Marathon', value: '1:38:45', holder: 'Vy Lê', year: '2023', type: 'Female' },
  { id: 'r7', category: 'Full Marathon', value: '2:58:00', holder: 'Nam Cao', year: '2024', type: 'Male' },
  { id: 'r8', category: 'Full Marathon', value: '3:25:30', holder: 'Mai Anh', year: '2024', type: 'Female' },
];

// --- 6. CHALLENGES DATA ---
export const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Thử thách tháng 11: Chinh phục 100K',
    description: 'Tháng 11 này, hãy cùng nhau hoàn thành mục tiêu 100km. Chạy bộ, đi bộ, leo núi đều được tính.',
    type: 'Monthly',
    status: 'Active',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    targetDistance: 100,
    currentDistance: 45.5,
    participants: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=800&q=80',
    reward: 'Huy hiệu 100K Warrior',
    rules: [
        'Tính tất cả các hoạt động chạy bộ, đi bộ ngoài trời (Outdoor) và trong nhà (Indoor).',
        'Tốc độ trung bình (Avg Pace) hợp lệ: 4:00 - 15:00 /km.',
        'Hoạt động phải được đồng bộ từ Strava trong thời gian diễn ra thử thách.',
        'Không chấp nhận các hoạt động nhập thủ công (Manual entry) quá 20% tổng cự ly.'
    ]
  },
  {
    id: 'c2',
    title: 'Weekly Sprint: 20K Tốc độ',
    description: 'Hoàn thành 20km trong tuần này với pace trung bình dưới 6:00/km.',
    type: 'Weekly',
    status: 'Active',
    startDate: '2023-11-13',
    endDate: '2023-11-19',
    targetDistance: 20,
    currentDistance: 12.0,
    participants: 450,
    imageUrl: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=800&q=80',
    reward: 'Huy hiệu Flash',
    rules: [
        'Chỉ tính hoạt động Chạy bộ (Run) ngoài trời.',
        'Pace trung bình của mỗi activity phải < 6:00/km.',
        'Hoàn thành tối thiểu 20km tích lũy trong tuần.',
    ]
  },
  {
    id: 'c3',
    title: 'Thử thách tháng 10: Happy Feet',
    description: 'Chạy vui vẻ, không áp lực. Mục tiêu 50km để duy trì thói quen.',
    type: 'Monthly',
    status: 'Completed',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    targetDistance: 50,
    currentDistance: 62.5,
    participants: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    reward: 'Huy hiệu Happy Runner',
    rules: [
        'Không giới hạn pace.',
        'Chấp nhận mọi loại hoạt động đi bộ/chạy bộ.',
        'Vui là chính!'
    ]
  },
  {
    id: 'c4',
    title: 'Tuần lễ Halloween Run',
    description: 'Chạy hóa trang hoặc vẽ hình bí ngô trên Strava.',
    type: 'Weekly',
    status: 'Completed',
    startDate: '2023-10-23',
    endDate: '2023-10-29',
    targetDistance: 15,
    currentDistance: 15.0,
    participants: 300,
    imageUrl: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=800&q=80',
    reward: 'Huy hiệu Spooky',
    rules: [
        'Vẽ tracklog hình bí ngô hoặc ma.',
        'Chụp ảnh check-in hóa trang khi chạy.'
    ]
  }
];