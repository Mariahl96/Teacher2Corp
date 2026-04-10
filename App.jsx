import React, { useState } from ‘react’;
import { LogOut, Menu, X, Plus, Search, Heart, Share2, MessageSquare, Zap, CheckCircle, Settings, BarChart3, Trash2, Star, Users, Briefcase, TrendingUp } from ‘lucide-react’;

export default function Teacher2Corp() {
// Auth State
const [user, setUser] = useState(null);
const [userType, setUserType] = useState(null); // ‘teacher’, ‘company’, ‘admin’
const [loginEmail, setLoginEmail] = useState(’’);
const [loginPassword, setLoginPassword] = useState(’’);
const [signupMode, setSignupMode] = useState(false);
const [signupData, setSignupData] = useState({
email: ‘’,
password: ‘’,
name: ‘’,
userType: ‘teacher’
});

const [currentPage, setCurrentPage] = useState(‘feed’);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [copiedMessage, setCopiedMessage] = useState(’’);

// Email Verification State
const [emailVerificationStep, setEmailVerificationStep] = useState(null);
const [verificationCode, setVerificationCode] = useState(’’);
const [enteredCode, setEnteredCode] = useState(’’);
const [codeError, setCodeError] = useState(’’);

// Teacher Data
const [teacherProfile, setTeacherProfile] = useState({
name: ‘’,
yearsTeaching: ‘’,
currentRole: ‘Teacher’,
targetRoles: [],
bio: ‘’,
skills: [],
resumeText: ‘’,
location: ‘’
});

const [statusPost, setStatusPost] = useState(’’);
const [teacherPosts, setTeacherPosts] = useState([
{
id: 1,
author: ‘Sarah Johnson’,
role: ‘High School Teacher → CSM’,
avatar: ‘👩‍🎓’,
content: ‘Just completed my first month at TechCorp as a Customer Success Manager! Teachers have SO many transferable skills. If you're thinking about transitioning, DM me!’,
likes: 247,
comments: 23,
shares: 15,
timestamp: ‘2 days ago’
},
{
id: 2,
author: ‘Michael Chen’,
role: ‘Elementary Teacher → Training Specialist’,
avatar: ‘👨‍🏫’,
content: ‘My resume got flagged by ATS until I changed “classroom management” to “stakeholder coordination.” Small tweaks, big impact!’,
likes: 512,
comments: 67,
shares: 89,
timestamp: ‘4 days ago’
}
]);

const [jobPostings, setJobPostings] = useState([
{
id: 1,
company: ‘TechCorp Solutions’,
title: ‘Customer Success Manager’,
location: ‘Remote’,
salary: ‘$60k-$75k’,
description: ‘Looking for someone with strong communication and customer focus. Teaching experience is a plus!’,
posted: ‘3 days ago’,
applicants: 12,
featured: false,
approved: true,
postedBy: ‘company1’
},
{
id: 2,
company: ‘EdTech Innovations’,
title: ‘Training & Onboarding Specialist’,
location: ‘Hybrid - Austin, TX’,
salary: ‘$55k-$70k’,
description: ‘Perfect role for former educators! Create training materials, conduct onboarding sessions.’,
posted: ‘1 day ago’,
applicants: 8,
featured: true,
approved: true,
postedBy: ‘company2’
},
{
id: 3,
company: ‘NextGen Learning’,
title: ‘Knowledge Manager’,
location: ‘Remote’,
salary: ‘$65k-$82k’,
description: ‘Organize and improve documentation. We value clear communicators.’,
posted: ‘5 days ago’,
applicants: 15,
featured: false,
approved: true,
postedBy: ‘company3’
}
]);

const [newJobPosting, setNewJobPosting] = useState({
title: ‘’,
location: ‘’,
salary: ‘’,
description: ‘’
});

const [teacherDatabase, setTeacherDatabase] = useState([
{
id: ‘t1’,
name: ‘Sarah Johnson’,
yearsTeaching: 8,
currentRole: ‘High School English Teacher’,
targetRoles: [‘CSM’, ‘Training Specialist’],
bio: ‘Passionate educator transitioning to corporate.’,
location: ‘Houston, TX’,
skills: [‘Communication’, ‘Project Management’, ‘Training’],
premium: false,
suspended: false
}
]);

const [savedJobs, setSavedJobs] = useState([]);
const [savedTeachers, setSavedTeachers] = useState([]);
const [showPremiumModal, setShowPremiumModal] = useState(false);
const [resumeOptimized, setResumeOptimized] = useState(null);

// ADMIN STATE
const [adminStats, setAdminStats] = useState({
totalTeachers: 1,
totalCompanies: 3,
totalJobs: 3,
totalRevenue: 2500,
premiumTeachers: 0,
premiumCompanies: 2
});

const [pendingJobs, setPendingJobs] = useState([]);

// Generate verification code
const generateVerificationCode = () => {
const code = Math.random().toString().slice(2, 8);
setVerificationCode(code);
return code;
};

// Send verification email
const sendVerificationEmail = (email) => {
const code = generateVerificationCode();
console.log(`📧 Verification code for ${email}: ${code}`);
alert(`📧 Verification code sent! Code: ${code}`);
setEmailVerificationStep(‘pending’);
setEnteredCode(’’);
setCodeError(’’);
};

// Verify email code
const handleVerifyEmail = () => {
if (enteredCode === verificationCode) {
setEmailVerificationStep(‘verified’);
setCodeError(’’);
} else {
setCodeError(‘❌ Incorrect code. Try again.’);
}
};

// Confirm Email and Complete Signup
const handleConfirmEmail = () => {
if (emailVerificationStep === ‘verified’) {
// Admin login shortcut for demo
if (signupData.email === ‘mariahmleonce@gmail.com’ && signupData.password === ‘mariahleonce1’) {
setUser({
id: ‘admin1’,
email: signupData.email,
name: ‘Admin’
});
setUserType(‘admin’);
} else {
setUser({
id: ‘user’ + Date.now(),
email: signupData.email,
name: signupData.name
});
setUserType(signupData.userType);
}
setSignupMode(false);
setEmailVerificationStep(null);
setSignupData({
email: ‘’,
password: ‘’,
name: ‘’,
userType: ‘teacher’
});
setVerificationCode(’’);
setEnteredCode(’’);
}
};

// Copy to Clipboard
const copyToClipboard = (text) => {
navigator.clipboard.writeText(text).then(() => {
setCopiedMessage(‘✓ Copied!’);
setTimeout(() => setCopiedMessage(’’), 2000);
}).catch(() => {
const textarea = document.createElement(‘textarea’);
textarea.value = text;
document.body.appendChild(textarea);
textarea.select();
document.execCommand(‘copy’);
document.body.removeChild(textarea);
setCopiedMessage(‘✓ Copied!’);
setTimeout(() => setCopiedMessage(’’), 2000);
});
};

// Handle Login
const handleLogin = (e) => {
e.preventDefault();
// Admin shortcut for demo
if (loginEmail === ‘mariahmleonce@gmail.com’ && loginPassword === ‘mariahleonce1’) {
setUser({
id: ‘admin1’,
email: loginEmail,
name: ‘Admin’
});
setUserType(‘admin’);
} else if (loginEmail && loginPassword) {
setUser({
id: ‘user1’,
email: loginEmail,
name: loginEmail.split(’@’)[0]
});
setUserType(‘teacher’);
}
setLoginEmail(’’);
setLoginPassword(’’);
};

// Handle Signup
const handleSignup = (e) => {
e.preventDefault();
if (signupData.email && signupData.password && signupData.name) {
sendVerificationEmail(signupData.email);
}
};

// Handle Logout
const handleLogout = () => {
setUser(null);
setUserType(null);
setCurrentPage(‘feed’);
};

// ADMIN FUNCTIONS
const approveJob = (jobId) => {
setJobPostings(jobPostings.map(job =>
job.id === jobId ? {…job, approved: true} : job
));
};

const rejectJob = (jobId) => {
setJobPostings(jobPostings.filter(job => job.id !== jobId));
};

const featureJob = (jobId) => {
setJobPostings(jobPostings.map(job =>
job.id === jobId ? {…job, featured: !job.featured} : job
));
};

const deleteJob = (jobId) => {
setJobPostings(jobPostings.filter(job => job.id !== jobId));
};

const suspendTeacher = (teacherId) => {
setTeacherDatabase(teacherDatabase.map(teacher =>
teacher.id === teacherId ? {…teacher, suspended: !teacher.suspended} : teacher
));
};

// Create Post
const handleCreatePost = () => {
if (statusPost.trim()) {
const newPost = {
id: teacherPosts.length + 1,
author: user.name,
role: ‘Teacher Transitioning’,
avatar: ‘👤’,
content: statusPost,
likes: 0,
comments: 0,
shares: 0,
timestamp: ‘just now’
};
setTeacherPosts([newPost, …teacherPosts]);
setStatusPost(’’);
}
};

// Post Job
const handlePostJob = () => {
if (newJobPosting.title && newJobPosting.location && newJobPosting.description) {
const job = {
id: jobPostings.length + 1,
company: ‘Your Company’,
title: newJobPosting.title,
location: newJobPosting.location,
salary: newJobPosting.salary,
description: newJobPosting.description,
posted: ‘just now’,
applicants: 0,
featured: false,
approved: false,
postedBy: user.id
};
setJobPostings([job, …jobPostings]);
setNewJobPosting({
title: ‘’,
location: ‘’,
salary: ‘’,
description: ‘’
});
}
};

// AI Resume Optimizer
const optimizeResume = (resumeText) => {
const educationTerms = {
‘classroom management’: ‘stakeholder coordination’,
‘students’: ‘users/clients’,
‘lesson planning’: ‘strategic planning’,
‘grading’: ‘performance evaluation’,
‘curriculum development’: ‘product development’,
‘taught’: ‘implemented training programs for’,
‘class’: ‘team’
};

```
let optimized = resumeText;
Object.entries(educationTerms).forEach(([old, newTerm]) => {
  optimized = optimized.replace(new RegExp(old, 'gi'), newTerm);
});

setResumeOptimized({
  original: resumeText,
  optimized: optimized
});
```

};

// === AUTH SCREEN ===
if (!user) {
return (
<div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 flex items-center justify-center p-4">
<div className="max-w-md w-full">
<div className="text-center mb-8">
<div className="inline-block bg-amber-50 rounded-lg p-3 mb-4">
<div className="text-3xl font-bold text-emerald-600">T2C</div>
</div>
<h1 className="text-4xl font-bold text-white mb-2">Teacher2Corp</h1>
<p className="text-emerald-50">LinkedIn for Teachers Transitioning to Corporate</p>
</div>

```
      <div className="bg-amber-50 rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          {signupMode && !emailVerificationStep ? 'Create Your Account' : signupMode && emailVerificationStep === 'pending' ? 'Verify Your Email' : 'Welcome Back'}
        </h2>

        {/* Email Verification Screen */}
        {signupMode && emailVerificationStep === 'pending' && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-center">
              <p className="text-emerald-900 font-medium mb-2">📧 Verification Code Sent!</p>
              <p className="text-sm text-emerald-800">Check console or the alert for code</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Verification Code</label>
              <input
                type="text"
                placeholder="000000"
                value={enteredCode}
                onChange={(e) => {
                  setEnteredCode(e.target.value);
                  setCodeError('');
                }}
                maxLength="6"
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center text-2xl tracking-widest font-mono"
              />
              {codeError && <p className="text-red-600 text-sm mt-1">{codeError}</p>}
            </div>

            <button
              type="button"
              onClick={handleVerifyEmail}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition"
            >
              Verify Email
            </button>

            <button
              type="button"
              onClick={() => {
                setEmailVerificationStep(null);
                setEnteredCode('');
                setCodeError('');
              }}
              className="w-full text-emerald-600 font-medium py-2 hover:underline"
            >
              Back to Sign Up
            </button>
          </div>
        )}

        {/* Email Verified */}
        {signupMode && emailVerificationStep === 'verified' && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-center">
              <p className="text-3xl mb-2">✅</p>
              <p className="text-emerald-900 font-bold">Email Verified!</p>
              <p className="text-sm text-emerald-800 mt-2">Welcome {signupData.name}!</p>
            </div>

            <button
              type="button"
              onClick={handleConfirmEmail}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition"
            >
              Continue to Teacher2Corp
            </button>
          </div>
        )}

        {/* Signup Form */}
        {signupMode && !emailVerificationStep && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={signupData.name}
                onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">I am a...</label>
              <select
                value={signupData.userType}
                onChange={(e) => setSignupData({...signupData, userType: e.target.value})}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="teacher">Teacher (Looking to transition)</option>
                <option value="company">Company (Hiring teachers)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Login Form */}
        {!signupMode && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition"
            >
              Sign In
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-emerald-800 text-sm">
            {signupMode && !emailVerificationStep ? 'Already have an account?' : !signupMode ? "Don't have an account?" : ''}
            {!(signupMode && emailVerificationStep) && (
              <button
                onClick={() => {
                  setSignupMode(!signupMode);
                  setEmailVerificationStep(null);
                  setEnteredCode('');
                  setCodeError('');
                }}
                className="text-emerald-600 font-bold ml-2 hover:underline"
              >
                {signupMode ? 'Sign In' : 'Sign Up'}
              </button>
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white/10 backdrop-blur rounded-xl p-4 text-white text-center">
        <p className="text-sm">Demo Admin: mariahmleonce@gmail.com / mariahleonce1</p>
      </div>
    </div>
  </div>
);
```

}

// === ADMIN DASHBOARD ===
if (userType === ‘admin’) {
return (
<div className="min-h-screen bg-amber-50">
{/* Admin Nav */}
<nav className="bg-white border-b border-emerald-200 sticky top-0 z-50 shadow-sm">
<div className="max-w-7xl mx-auto px-4">
<div className="flex justify-between items-center h-16">
<div className="flex items-center gap-2">
<div className="bg-emerald-600 text-white rounded px-2 py-1 font-bold text-sm">T2C</div>
<span className="font-bold text-lg text-emerald-900">Admin Dashboard</span>
</div>

```
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => setCurrentPage('stats')}
              className={`font-medium transition pb-4 text-sm ${currentPage === 'stats' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
            >
              <BarChart3 className="inline mr-2" size={18} />
              Analytics
            </button>
            <button
              onClick={() => setCurrentPage('jobs')}
              className={`font-medium transition pb-4 text-sm ${currentPage === 'jobs' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
            >
              <Briefcase className="inline mr-2" size={18} />
              Jobs
            </button>
            <button
              onClick={() => setCurrentPage('teachers')}
              className={`font-medium transition pb-4 text-sm ${currentPage === 'teachers' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
            >
              <Users className="inline mr-2" size={18} />
              Teachers
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition text-sm"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>

    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ADMIN STATS */}
      {currentPage === 'stats' && (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-emerald-900 mb-8">Dashboard Analytics</h1>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Teachers</p>
                  <p className="text-4xl font-bold text-emerald-600">{adminStats.totalTeachers}</p>
                </div>
                <Users size={28} className="text-emerald-400" />
              </div>
              <p className="text-xs text-emerald-600">+{Math.floor(Math.random() * 10)} this week</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Companies</p>
                  <p className="text-4xl font-bold text-emerald-600">{adminStats.totalCompanies}</p>
                </div>
                <Briefcase size={28} className="text-emerald-400" />
              </div>
              <p className="text-xs text-emerald-600">+{Math.floor(Math.random() * 5)} this week</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Job Postings</p>
                  <p className="text-4xl font-bold text-emerald-600">{jobPostings.length}</p>
                </div>
                <Briefcase size={28} className="text-emerald-400" />
              </div>
              <p className="text-xs text-emerald-600">{jobPostings.filter(j => j.approved).length} approved</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Premium Teachers</p>
                  <p className="text-4xl font-bold text-emerald-600">{adminStats.premiumTeachers}</p>
                </div>
                <Star size={28} className="text-yellow-400" />
              </div>
              <p className="text-xs text-emerald-600">${adminStats.premiumTeachers * 9.99}/month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Premium Companies</p>
                  <p className="text-4xl font-bold text-emerald-600">{adminStats.premiumCompanies}</p>
                </div>
                <Star size={28} className="text-yellow-400" />
              </div>
              <p className="text-xs text-emerald-600">${adminStats.premiumCompanies * 49.99}/month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Monthly Revenue</p>
                  <p className="text-4xl font-bold text-emerald-600">${adminStats.totalRevenue}</p>
                </div>
                <TrendingUp size={28} className="text-emerald-400" />
              </div>
              <p className="text-xs text-emerald-600">Est. annual: ${adminStats.totalRevenue * 12}/year</p>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN JOBS MANAGEMENT */}
      {currentPage === 'jobs' && (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-emerald-900 mb-8">Manage Jobs</h1>

          <div className="space-y-4">
            {jobPostings.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-emerald-900">{job.title}</h3>
                      {job.featured && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-bold">FEATURED</span>}
                      {!job.approved && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold">PENDING</span>}
                    </div>
                    <p className="text-gray-600 text-sm">{job.company} • {job.location} • {job.salary}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{job.applicants} applicants</p>
                    <p className="text-xs text-gray-500">Posted {job.posted}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{job.description}</p>

                <div className="flex gap-2 flex-wrap">
                  {!job.approved && (
                    <>
                      <button
                        onClick={() => approveJob(job.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => rejectJob(job.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}
                  
                  {job.approved && (
                    <button
                      onClick={() => featureJob(job.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${job.featured ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}`}
                    >
                      <Star size={16} className="inline mr-1" />
                      {job.featured ? 'Featured' : 'Feature'}
                    </button>
                  )}

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition border border-red-300"
                  >
                    <Trash2 size={16} className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN TEACHERS MANAGEMENT */}
      {currentPage === 'teachers' && (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-emerald-900 mb-8">Manage Teachers</h1>

          <div className="space-y-4">
            {teacherDatabase.map(teacher => (
              <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900">{teacher.name}</h3>
                    <p className="text-gray-600 text-sm">{teacher.currentRole} • {teacher.yearsTeaching} years • {teacher.location}</p>
                  </div>
                  <div className="text-right">
                    {teacher.premium && <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-bold mb-2 block">PREMIUM</span>}
                    {teacher.suspended && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold">SUSPENDED</span>}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-3">{teacher.bio}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {teacher.skills.map(skill => (
                      <span key={skill} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => suspendTeacher(teacher.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${teacher.suspended ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'}`}
                  >
                    {teacher.suspended ? '✓ Unsuspend' : 'Suspend'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
```

}

// === MAIN APP (Teachers/Companies) ===
return (
<div className="min-h-screen bg-amber-50">
{/* Navigation */}
<nav className="bg-white border-b border-emerald-200 sticky top-0 z-50 shadow-sm">
<div className="max-w-6xl mx-auto px-4">
<div className="flex justify-between items-center h-16">
<div className="flex items-center gap-2">
<div className="bg-emerald-600 text-white rounded px-2 py-1 font-bold text-sm">T2C</div>
<span className="font-bold text-lg hidden sm:inline text-emerald-900">Teacher2Corp</span>
</div>

```
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => setCurrentPage('feed')}
            className={`font-medium transition pb-4 text-sm ${currentPage === 'feed' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
          >
            Feed
          </button>
          {userType === 'teacher' && (
            <>
              <button
                onClick={() => setCurrentPage('profile')}
                className={`font-medium transition pb-4 text-sm ${currentPage === 'profile' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
              >
                My Profile
              </button>
              <button
                onClick={() => setCurrentPage('jobs')}
                className={`font-medium transition pb-4 text-sm ${currentPage === 'jobs' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
              >
                Jobs
              </button>
            </>
          )}
          {userType === 'company' && (
            <>
              <button
                onClick={() => setCurrentPage('search')}
                className={`font-medium transition pb-4 text-sm ${currentPage === 'search' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
              >
                Find Teachers
              </button>
              <button
                onClick={() => setCurrentPage('myJobs')}
                className={`font-medium transition pb-4 text-sm ${currentPage === 'myJobs' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-emerald-700'}`}
              >
                My Jobs
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPremiumModal(true)}
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
          >
            <Zap size={18} />
            Premium
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition text-sm"
          >
            <LogOut size={18} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div className="max-w-6xl mx-auto px-4 py-8">
    {/* TEACHER: FEED */}
    {userType === 'teacher' && currentPage === 'feed' && (
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-xl">👤</div>
              <div className="flex-1">
                <textarea
                  value={statusPost}
                  onChange={(e) => setStatusPost(e.target.value)}
                  placeholder="Share your transition journey..."
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"
                  rows="3"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleCreatePost}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition text-sm"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {teacherPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 text-3xl flex items-center justify-center">{post.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-emerald-900 text-sm">{post.author}</h3>
                  <p className="text-xs text-gray-600">{post.role}</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4 text-sm">{post.content}</p>
              <div className="flex gap-6 text-gray-600 text-xs">
                <button className="flex items-center gap-2 hover:text-emerald-600 transition">
                  <Heart size={16} /> {post.likes}
                </button>
                <button className="flex items-center gap-2 hover:text-emerald-600 transition">
                  <MessageSquare size={16} /> {post.comments}
                </button>
                <button className="flex items-center gap-2 hover:text-emerald-600 transition">
                  <Share2 size={16} /> {post.shares}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow p-6 text-white">
            <Zap size={28} className="mb-2" />
            <h3 className="font-bold text-lg mb-2">Go Premium</h3>
            <p className="text-sm mb-4">Unlock AI resume optimizer & more</p>
            <button
              onClick={() => setShowPremiumModal(true)}
              className="w-full bg-amber-50 text-emerald-700 font-bold py-2 rounded-lg hover:bg-white transition text-sm"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    )}

    {/* TEACHER: PROFILE */}
    {userType === 'teacher' && currentPage === 'profile' && (
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-emerald-900 mb-6">Build Your Profile</h2>
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 space-y-4">
          <input type="text" placeholder="Full Name" value={teacherProfile.name} onChange={(e) => setTeacherProfile({...teacherProfile, name: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm" />
          <input type="text" placeholder="Location" value={teacherProfile.location} onChange={(e) => setTeacherProfile({...teacherProfile, location: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm" />
          <textarea placeholder="Bio" value={teacherProfile.bio} onChange={(e) => setTeacherProfile({...teacherProfile, bio: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm h-24 resize-none" />
          <textarea placeholder="Resume" value={teacherProfile.resumeText} onChange={(e) => setTeacherProfile({...teacherProfile, resumeText: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm h-32 font-mono resize-none" />
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition text-sm">Save Profile</button>
        </div>

        {teacherProfile.resumeText && (
          <div className="mt-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow p-6 text-white">
            <button onClick={() => optimizeResume(teacherProfile.resumeText)} className="w-full bg-amber-50 text-emerald-700 font-bold py-2 rounded-lg text-sm">
              Optimize Resume
            </button>
          </div>
        )}

        {resumeOptimized && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-emerald-100 p-4">
            <h4 className="font-bold text-emerald-900 mb-3 text-sm">✨ Optimized Resume</h4>
            <div className="bg-amber-50 p-3 rounded text-xs text-gray-700 font-mono border border-emerald-200 max-h-48 overflow-y-auto">{resumeOptimized.optimized}</div>
            <button onClick={() => copyToClipboard(resumeOptimized.optimized)} className="w-full mt-3 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition text-sm">
              {copiedMessage || '📋 Copy to Clipboard'}
            </button>
          </div>
        )}
      </div>
    )}

    {/* TEACHER: JOBS */}
    {userType === 'teacher' && currentPage === 'jobs' && (
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-emerald-900 mb-6">Jobs for Teachers</h2>
        <div className="space-y-4">
          {jobPostings.filter(j => j.approved).map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                </div>
                {job.featured && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-bold">FEATURED</span>}
              </div>
              <p className="text-gray-700 mb-4 text-sm">{job.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-900">{job.salary}</span>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition text-sm">
                  View & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* COMPANY: MY JOBS */}
    {userType === 'company' && currentPage === 'myJobs' && (
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-emerald-900 mb-6">Post a Job</h2>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 mb-8 space-y-4">
          <input type="text" placeholder="Job Title" value={newJobPosting.title} onChange={(e) => setNewJobPosting({...newJobPosting, title: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm" />
          <input type="text" placeholder="Location" value={newJobPosting.location} onChange={(e) => setNewJobPosting({...newJobPosting, location: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm" />
          <input type="text" placeholder="Salary" value={newJobPosting.salary} onChange={(e) => setNewJobPosting({...newJobPosting, salary: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm" />
          <textarea placeholder="Description" value={newJobPosting.description} onChange={(e) => setNewJobPosting({...newJobPosting, description: e.target.value})} className="w-full px-4 py-2 border border-emerald-300 rounded-lg text-sm h-32 resize-none" />
          <button onClick={handlePostJob} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition text-sm">
            <Plus size={18} className="inline mr-2" />
            Post Job
          </button>
        </div>

        <h3 className="text-2xl font-bold text-emerald-900 mb-4">Your Job Postings</h3>
        <div className="space-y-4">
          {jobPostings.filter(j => j.postedBy === user.id).map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.location} • {job.salary}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-sm font-medium">
                  {job.applicants} applicants
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* PREMIUM MODAL */}
  {showPremiumModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-amber-50 rounded-xl max-w-2xl w-full p-8 border border-emerald-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-emerald-900">Premium Features</h2>
          <button onClick={() => setShowPremiumModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border-2 border-emerald-300 rounded-lg p-6 bg-white">
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">Teacher Plan</h3>
            <p className="text-3xl font-bold text-emerald-600 mb-6">$9.99<span className="text-lg text-gray-600">/mo</span></p>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>AI Resume Optimizer</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>Interview Prep</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>Cover Letter Generator</span>
              </li>
            </ul>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition text-sm">
              Choose Plan
            </button>
          </div>

          <div className="border-2 border-emerald-300 rounded-lg p-6 bg-white">
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">Company Plan</h3>
            <p className="text-3xl font-bold text-emerald-600 mb-6">$49.99<span className="text-lg text-gray-600">/mo</span></p>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>Unlimited Job Posts</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>Advanced Search</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>Analytics</span>
              </li>
            </ul>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition text-sm">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
```

);
}
