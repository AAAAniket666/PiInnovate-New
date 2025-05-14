const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// MongoDB URI
const MONGO_URI = 'mongodb+srv://j4903710:Bc7QLa8VD9MRmgFD@cluster0.slgwmdl.mongodb.net/pi_innovate?retryWrites=true&w=majority&appName=Cluster0';

const Service = require('../models/Service');

// Services data
const services = [
  {
    title: 'Website Development',
    description: 'We build websites that don\'t just look good – they work hard for your business.',
    icon: 'fas fa-laptop-code',
    slug: 'website-development',
    details: `Whether you're a startup looking for your first digital footprint or an enterprise in need of a complete revamp, we craft websites that are fast, functional, and focused on your business goals. Every click, animation, and layout is carefully thought out to turn your visitors into loyal customers.`,
    image: '/images/services/web-development.png',
    featured: true,
    order: 1
  },
  {
    title: 'Android App Development',
    description: 'Your app idea deserves more than just code – it deserves precision, performance, and a purpose.',
    icon: 'fas fa-mobile-alt',
    slug: 'android-app-development',
    details: 'From wireframes to the final APK, we create Android apps that are clean, efficient, and user-first. Whether it\'s an MVP or a full-fledged product, we make sure it runs smoothly on every device, for every user.',
    image: '/images/services/mobile-app.png',
    featured: true,
    order: 2
  },
  {
    title: 'SAP Implementation',
    description: 'Implementing SAP doesn\'t have to be painful. We make it structured, smooth, and smart.',
    icon: 'fas fa-cogs',
    slug: 'sap-implementation',
    details: 'From blueprinting to go-live, we help businesses implement SAP in a way that actually works for them – no fluff, no wasted time. Our team is hands-on, communicative, and focused on making your ERP investment count.',
    image: '/images/services/cloud-network.gif',
    order: 3
  },
  {
    title: 'SAP Consultancy',
    description: 'We don\'t just give advice – we solve real business problems.',
    icon: 'fas fa-brain',
    slug: 'sap-consultancy',
    details: 'Our SAP consultants dive deep into your processes, understand your bottlenecks, and bring you solutions that are scalable, efficient, and built for your business goals. We don\'t overcomplicate – we simplify with impact.',
    image: '/images/services/it-consulting.png.png',
    order: 4
  },
  {
    title: 'Talent Recruitment & Staffing',
    description: 'You don\'t just need candidates. You need the right people.',
    icon: 'fas fa-users',
    slug: 'talent-recruitment',
    details: 'We help companies – from startups to MNCs – find tech talent that fits their culture and growth roadmap. With a vast network and a strong screening process, we don\'t waste your time. We deliver people who can make a difference from day one.',
    image: '/images/services/recruitment.gif',
    order: 5
  },
  {
    title: 'Digital Marketing',
    description: 'We don\'t just run ads. We build brands.',
    icon: 'fas fa-chart-line',
    slug: 'digital-marketing',
    details: 'In a world full of noise, your brand needs a voice that stands out. Our digital marketing services are built to get real results, not just vanity metrics. Whether it\'s running high-converting ads, growing your social media, ranking you on Google, or crafting viral campaigns – we do it with a deep understanding of your audience and your goals.',
    image: '/images/services/digital-marketing.png',
    order: 6
  }
];

// Database connection
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...'.yellow);
    
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);
    return conn;
  } catch (error) {
    console.error('Connection Error:', error.message.red);
    console.error('Stack Trace:', error.stack.grey);
    process.exit(1);
  }
};

// Event listeners
mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error.message.red);
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection established'.green);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected'.yellow);
});

// Global error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error.message.red);
  console.error('Stack:', error.stack.grey);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error.message.red);
  console.error('Stack:', error.stack.grey);
  process.exit(1);
});

// Data operations
const importData = async () => {
  try {
    await connectDB();
    
    console.log('Deleting existing services...'.yellow);
    await Service.deleteMany();
    console.log('Existing services deleted'.green);
    
    console.log('Inserting new services...'.yellow);
    await Service.insertMany(services);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error('Error:', error.message.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    
    console.log('Deleting services...'.yellow);
    await Service.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error('Error:', error.message.red);
    process.exit(1);
  }
};

// Execute based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
