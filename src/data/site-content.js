/**
 * site-content.js — 全站文案的唯一来源（改文字只改这个文件）
 *
 * 使用说明：
 * 1. 所有页面文字都在这个文件里，改完保存即可，不需要动组件代码。
 * 2. 每个字段后面标注了建议字数，超长会自动换行，不会撑破卡片。
 * 3. 需要跳转外链时，把 null 换成真实地址（例如 "https://github.com/你的用户名"）；
 *    保持 null 时，页面上不会出现一个点了没反应的按钮。
 * 4. 头像是没有的：整站不使用人像，标识符只用文字和圆点。
 */

export const site = {
  /** 左上角标识（建议 ≤8 个字母） */
  wordmark: 'JIANI',
  /** 网页标题（浏览器标签页） */
  documentTitle: '王佳妮的主页 · 个人介绍',
  /** 页面语言 */
  htmlLang: 'zh-CN',
};

/** 入场遮罩（进入网站按钮） */
export const entryGate = {
  brand: 'JIANI',
  zh: '进入网站',
  en: 'ENTER SITE',
};

/** 场景导航（顺序即页面滚动顺序） */
export const scenes = [
  { id: 'hero', label: 'SCENE 01 · 欢迎', short: '欢迎' },
  { id: 'projects', label: 'SCENE 02 · 作品', short: '作品' },
  { id: 'index', label: 'SCENE 03 · 目录', short: '目录' },
  { id: 'gallery', label: 'SCENE 04 · 爱好', short: '爱好' },
  { id: 'contact', label: 'SCENE 05 · 联系我', short: '联系我' },
];

/** 首屏：欢迎语 + 个人卡片 */
export const hero = {
  greeting: '欢迎来到，', // ≤6 字
  name: '王佳妮的主页', // ≤8 字
  supportLine: '在读大学生，平时喜欢做点网页，也喜欢带着相机到处走走。', // 一句话
  scrollCue: '向下滚动进入',
  scrollCueEn: 'SCROLL DOWN',
  profile: {
    eyebrow: 'PROFILE',
    name: '王佳妮', // ≤8 字
    tagline: '大学学生', // ≤16 字
    facts: [
      { label: 'LOCATION', value: '现居 · 山东' }, // ≤12 字
      { label: 'FOCUS', value: '网页 · 摄影' }, // ≤16 字
    ],
  },
};

/**
 * 目录（滑动展示列表）
 * 列表条目由数据自动组成：场景 5 条 + 作品 4 条 + 爱好 8 条，
 * 想增删条目，直接改上面的 scenes / projects.items / gallery.items 即可。
 */
export const indexList = {
  eyebrow: 'INDEX',
  heading: '目录',
  subtitle: '想先看哪一段，从这里点进去。', // 一句话
  help: '上下滚动查看，也可以用方向键上下移动、回车跳转。',
  kindLabels: {
    scene: '场景',
    project: '作品',
    gallery: '爱好',
  },
};

/** 作品展示 */
export const projects = {
  eyebrow: 'PROJECTS',
  heading: '项目作品',
  subtitle: '一些自己动手做的小工具和网页。', // 一句话
  items: [
    {
      id: 'journal-map',
      cover: '/assets/images/project-journal-cover-v2.jpg',
      coverAlt: '插画：桌上的笔记本电脑打开着一份手账地图界面，旁边有一盆多肉和纸胶带',
      title: '手账地图', // ≤14 字
      description: '把旅行照片和地点钉在一张地图上，随手写下当时的心情。', // ≤60 字
      tags: ['React', '地图', '手账'],
      subtitleLabel: 'TRAVEL JOURNAL',
      summary: '一张可以慢慢写的地图手账。',
      background:
        '每次旅行回来，照片散在相册里，过一阵就忘了当时在想什么。于是想做一张地图，把地点、照片和一句话放在同一个位置。',
      features: ['在地图上钉住地点并绑定照片', '按时间线回看某一年去过的地方', '本地保存，不需要账号'],
      role: ['整体设计与界面', '前端开发与交互动效', '地图数据整理'],
      techStack: ['React', 'Vite', 'CSS'],
      statusLabel: 'STATUS / 个人项目',
      demoUrl: null,
      repoUrl: null,
    },
    {
      id: 'mood-radio',
      cover: '/assets/images/project-player-cover-v2.jpg',
      coverAlt: '插画：手机立在木支架上显示音乐播放器，前面放着一副耳机',
      title: '心情电台', // ≤14 字
      description: '按心情选一张歌单，播放界面会跟着情绪换颜色。', // ≤60 字
      tags: ['动效', '音乐', '交互'],
      subtitleLabel: 'MOOD PLAYER',
      summary: '用颜色记录今天的心情。',
      background:
        '想做一个不催你切歌的播放器：先选心情，再选歌单。界面颜色随心情变化，安静的时候它也跟着安静。',
      features: ['五种心情对应五套配色', '播放页随节拍轻微呼吸', '支持键盘操作与音量记忆'],
      role: ['交互与视觉设计', '前端开发', '动效实现'],
      techStack: ['React', 'CSS Animation', 'Web Audio'],
      statusLabel: 'STATUS / 持续更新',
      demoUrl: null,
      repoUrl: null,
    },
    {
      id: 'plant-care',
      cover: '/assets/images/project-plant-cover-v2.jpg',
      coverAlt: '插画：窗台上三盆绿植，上方浮着一块植物养护提醒面板',
      title: '植物提醒', // ≤14 字
      description: '给家里的绿植排个浇水表，到点轻轻提醒一次。', // ≤60 字
      tags: ['仪表盘', '提醒', '插画'],
      subtitleLabel: 'PLANT CARE',
      summary: '让每一盆植物都被记得。',
      background:
        '养着养着就会忘记哪盆该浇水了。做成一块小面板，一眼看清每盆植物的状态，提醒只发一次，不打扰。',
      features: ['每盆植物独立设置浇水周期', '环形进度显示下一次浇水时间', '深色浅色都能看清的插画风界面'],
      role: ['信息结构与界面设计', '前端开发', '插画绘制'],
      techStack: ['React', 'CSS', 'Chart'],
      statusLabel: 'STATUS / 自用中',
      demoUrl: null,
      repoUrl: null,
    },
    {
      id: 'collage-album',
      cover: '/assets/images/project-scrapbook-cover-v2.jpg',
      coverAlt: '插画：平板电脑上是一面拼贴相册，周围放着纸胶带、剪刀和贴纸',
      title: '拼贴相册', // ≤14 字
      description: '像剪贴本一样排照片，随手贴纸胶带，排好就能导出。', // ≤60 字
      tags: ['相册', '排版', '拼贴'],
      subtitleLabel: 'COLLAGE ALBUM',
      summary: '把照片排成一页剪贴本。',
      background:
        '相册软件都很整齐，但少了手作的随意。想做一个可以随手挪动、贴纸胶带的相册页，排完导出成一张图。',
      features: ['拖拽排列照片与便签', '纸胶带、贴纸等装饰素材', '一键导出整页长图'],
      role: ['产品构想', '界面与素材设计', '前端开发'],
      techStack: ['React', 'Canvas', 'CSS'],
      statusLabel: 'STATUS / 原型',
      demoUrl: null,
      repoUrl: null,
    },
  ],
};

/** 爱好展示（画廊轮播） */
export const gallery = {
  eyebrow: 'GALLERY',
  heading: '爱好展示',
  subtitle: '把路过的风景，收进一格一格的时间里。', // 一句话
  prevLabel: 'PREV',
  nextLabel: 'NEXT',
  items: [
    {
      id: 'green-path',
      image: '/assets/images/gallery-green-path-v2.jpg',
      alt: '插画：两侧都是绿叶的小路向前延伸，一位戴草帽的女孩背对着镜头走远，右侧有一张木长椅',
      title: '林间小路', // ≤12 字
      caption: '风穿过树叶，把光斑洒在石阶上。', // 一句话
      date: '2026.04',
    },
    {
      id: 'seaside-sunset',
      image: '/assets/images/gallery-seaside-sunset-v2.jpg',
      alt: '插画：黄昏的海边，木栈道伸向海面，太阳贴近地平线',
      title: '海边日落',
      caption: '浪声慢慢靠岸，把一天交给黄昏。',
      date: '2026.03',
    },
    {
      id: 'cafe-corner',
      image: '/assets/images/gallery-cafe-corner-v2.jpg',
      alt: '插画：窗边木桌上一杯拉花咖啡和一本打开的笔记本，窗台有一盆垂落的绿植',
      title: '窗边咖啡',
      caption: '一杯热拿铁，一本还没写完的笔记。',
      date: '2026.02',
    },
    {
      id: 'starry-lake',
      image: '/assets/images/gallery-starry-lake-v2.jpg',
      alt: '插画：夜晚的湖边，天空是渐变的紫色，远处山影安静地立着',
      title: '星空湖边',
      caption: '星星落在水面上，风也跟着安静了。',
      date: '2026.01',
    },
    {
      id: 'slow-walk',
      image: '/assets/images/gallery-green-path-v2.jpg',
      alt: '插画：林间小路的另一段，石板路与草地，阳光从树叶间洒下来',
      title: '慢慢走',
      caption: '沿着小路往前走，夏天就在前面。',
      date: '2025.12',
    },
    {
      id: 'go-to-sea',
      image: '/assets/images/gallery-seaside-sunset-v2.jpg',
      alt: '插画：海边木栈道与渐变的天空，两只海鸟飞过',
      title: '去看海',
      caption: '木栈道伸进海里，风从很远的地方来。',
      date: '2025.11',
    },
    {
      id: 'quiet-afternoon',
      image: '/assets/images/gallery-cafe-corner-v2.jpg',
      alt: '插画：午后的窗边角落，咖啡、笔记本与垂落的绿植',
      title: '安静的下午',
      caption: '窗外有花，桌上有光，时间慢下来。',
      date: '2025.10',
    },
    {
      id: 'night-breeze',
      image: '/assets/images/gallery-starry-lake-v2.jpg',
      alt: '插画：紫色夜空下的湖岸与山影，湖面有细碎的星光倒影',
      title: '夜里散步',
      caption: '山影安静地站着，像在等我拍完这张。',
      date: '2025.09',
    },
  ],
};

/** 联系方式（值为示例占位，请改成自己的；href 为 null 时不渲染成链接） */
export const contact = {
  eyebrow: 'SCENE 05 / CONTACT',
  headingZh: '联系我',
  headingEn: 'Contact',
  invitation: '如果对我的作品或合作感兴趣，可以从下面任意一种方式找到我。',
  rows: [
    {
      id: 'email',
      channelLabel: 'EMAIL',
      channelName: '邮箱',
      value: 'hello@example.com', // 示例地址，请替换
      roleDescriptor: '合作 · 项目咨询',
      href: null,
      accent: 'mint',
    },
    {
      id: 'github',
      channelLabel: 'GITHUB',
      channelName: 'GitHub',
      value: 'your-github', // 示例用户名，请替换
      roleDescriptor: '代码 · 作品集',
      href: null,
      accent: 'sky',
    },
    {
      id: 'douyin',
      channelLabel: 'DOUYIN',
      channelName: '抖音',
      value: 'your-douyin', // 示例用户名，请替换
      roleDescriptor: '日常 · 短视频',
      href: null,
      accent: 'lilac',
    },
  ],
};

/** 留言表单（纯前端，不会发送到任何服务器） */
export const feedback = {
  eyebrow: 'FEEDBACK',
  title: '用户反馈',
  help: '写点什么都可以，这条留言只会在本页显示，不会发送到服务器。',
  fields: {
    name: { labelEn: 'NAME', labelZh: '姓名', placeholder: '怎么称呼你' },
    email: { labelEn: 'EMAIL', labelZh: '邮箱', placeholder: '方便回复的邮箱' },
    message: { labelEn: 'MESSAGE', labelZh: '留言内容', placeholder: '想说的话' },
  },
  submitLabel: '提交 / Submit',
  submittingLabel: '提交中…',
  successTitle: '谢谢你的留言！',
  successBody: (name) => `${name}，你的话我收到啦，会尽快回复你。`,
  againLabel: '再写一条',
  errors: {
    name: '请填写姓名',
    emailRequired: '请填写邮箱',
    emailInvalid: '邮箱格式看起来不太对',
    message: '请写下留言内容',
  },
};

/** 404 页面 */
export const notFound = {
  eyebrow: '404 / NOT FOUND',
  heading: '这一页飘走了',
  body: '你要找的页面不在这里，回到首页看看吧。',
  action: '回到首页',
  homePath: '/',
};
