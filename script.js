/* ==========================================
   SECTION 1: OOP & DESIGN PATTERNS
   ========================================== */

// --- STRATEGY PATTERN (Pricing) ---
class PricingStrategy {
    calculate(baseRate, hours) { throw new Error("Method 'calculate' must be implemented."); }
}
class LowComplexityStrategy extends PricingStrategy {
    calculate(baseRate, hours) { return baseRate * hours * 1.0; }
}
class MediumComplexityStrategy extends PricingStrategy {
    calculate(baseRate, hours) { return baseRate * hours * 1.5; }
}
class HighComplexityStrategy extends PricingStrategy {
    calculate(baseRate, hours) { return baseRate * hours * 2.5; }
}

// --- FACTORY PATTERN (Services) ---
class ServiceFactory {
    static createService(type) {
        switch (type) {
            case 'web': return { name: "Web Development", baseRate: 50, icon: "💻" };
            case 'design': return { name: "Graphic Design", baseRate: 40, icon: "🎨" };
            case 'content': return { name: "Content Writing", baseRate: 30, icon: "✍️" };
            default: return { name: "General Service", baseRate: 20, icon: "🔧" };
        }
    }
}

// --- OBSERVER PATTERN (System Notifications) ---
class NotificationService {
    constructor() { this.observers = []; }
    subscribe(observer) { this.observers.push(observer); }
    notify(data) { this.observers.forEach(observer => observer.update(data)); }
}
class EmailObserver {
    update(data) { return `[EMAIL]: Invoice sent to ${data.email} for RM ${data.total.toFixed(2)}`; }
}
class WhatsAppObserver {
    update(data) { return `[WHATSAPP]: Hi ${data.user.name}, project "${data.service}" created!`; }
}

/* ==========================================
   SECTION 2: REACT COMPONENTS
   ========================================== */

const { useState, useEffect } = React;

// --- Helper: Avatar Generator (NEW) ---
// Generates a unique avatar based on the username using DiceBear API
const UserAvatar = ({ seed, className }) => (
    <img 
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`} 
        alt="avatar" 
        className={`rounded-full border-2 border-white shadow-sm ${className}`}
    />
);

// --- Helper: Theme Toggle ---
const ThemeToggle = ({ isDark, toggleTheme }) => (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
        {isDark ? "☀️" : "🌙"}
    </button>
);

// --- PAGE 1: LOGIN & SIGN UP PAGE ---
const LoginPage = ({ onLogin, isDark, toggleTheme }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("client");
    const [specialization, setSpecialization] = useState("Web Development");

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = {
            name: isRegistering ? fullName : username,
            username: username,
            password: password,
            email: isRegistering ? email : `${username}@example.com`,
            phone: isRegistering ? phone : "60123456789",
            type: userType,
            rating: isRegistering ? "5.0" : "4.8", // Default rating
            specialization: userType === 'freelancer' ? specialization : null
        };
        onLogin(profile);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 relative">
            <div className="absolute top-5 right-5"><ThemeToggle isDark={isDark} toggleTheme={toggleTheme} /></div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 animate-fade-in my-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">GigLink</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{isRegistering ? "Create Account" : "Welcome Back"}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" required />
                    
                    {isRegistering && (
                        <div className="space-y-4 animate-fade-in">
                            <hr className="dark:border-gray-600"/>
                            <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" required />
                            <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" required />
                            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" required />
                            <select value={userType} onChange={e => setUserType(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white">
                                <option value="client">Client (Hire)</option>
                                <option value="freelancer">Freelancer (Work)</option>
                            </select>
                            {userType === 'freelancer' && (
                                <select value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white">
                                    <option value="Web Development">Web Development</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                    <option value="Content Writing">Content Writing</option>
                                </select>
                            )}
                        </div>
                    )}
                    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">{isRegistering ? "Sign Up" : "Login"}</button>
                </form>
                <button onClick={() => setIsRegistering(!isRegistering)} className="w-full mt-4 text-sm text-blue-500 underline">{isRegistering ? "Login instead" : "Create new account"}</button>
            </div>
        </div>
    );
};

// --- PAGE 2: PROFILE PAGE ---
const ProfilePage = ({ user, onUpdateProfile }) => {
    const [formData, setFormData] = useState(user);
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Profile</h2>
            {saved && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">Saved successfully!</div>}
            <div className="flex items-center mb-6">
                <UserAvatar seed={formData.username} className="h-24 w-24 mr-4" />
                <div>
                    <h3 className="text-xl font-bold dark:text-white">{formData.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 capitalize">{formData.type}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Save Changes</button>
            </form>
        </div>
    );
};

// --- PAGE 3: FREELANCER DIRECTORY (With Search) ---
const FreelancerListPage = ({ freelancers, onDirectHire }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter Logic
    const filteredFreelancers = freelancers.filter(fl => 
        fl.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        fl.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Find Talent</h2>
                <input 
                    type="text" 
                    placeholder="Search by name or skill..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded dark:bg-gray-700 dark:text-white w-64"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.map((fl, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <UserAvatar seed={fl.name} className="h-16 w-16" />
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{fl.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{fl.specialization}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                <span className="flex items-center text-yellow-500 font-bold">⭐ {fl.rating}</span>
                                <span className="text-xs text-gray-400">Verified</span>
                            </div>
                            <button onClick={() => onDirectHire(fl)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center">
                                Hire Now <span className="ml-2">&rarr;</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PAGE 4: CLIENT INBOX ---
const InboxPage = ({ messages, onPayment }) => (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Inbox</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {messages.length === 0 ? <div className="p-8 text-center text-gray-500">No messages yet.</div> : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {messages.map((msg) => (
                        <li key={msg.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <div className="flex justify-between">
                                <span className="font-bold text-blue-600 dark:text-blue-400">{msg.title}</span>
                                <span className="text-xs text-gray-400">{new Date(msg.id).toLocaleTimeString()}</span>
                            </div>
                            <p className="mt-1 text-gray-800 dark:text-gray-200 mb-3">{msg.text}</p>
                            {msg.isActionable && (
                                <div className="flex space-x-3 mt-2">
                                    <a href={`https://wa.me/${msg.freelancerPhone ? msg.freelancerPhone.replace(/\D/g,'') : ''}`} target="_blank" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow flex items-center">💬 WhatsApp</a>
                                    {!msg.isPaid ? (
                                        <button onClick={() => onPayment(msg.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow flex items-center">💳 Pay RM {msg.amount.toFixed(2)}</button>
                                    ) : <span className="text-green-600 font-bold px-4 py-2 border border-green-200 rounded bg-green-50">✅ Paid</span>}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

// --- PAGE 5: CLIENT DASHBOARD (With Analytics) ---
const ClientPage = ({ user, onOrderCreate, initialData, jobs }) => {
    const [serviceType, setServiceType] = useState('web');
    const [complexity, setComplexity] = useState('low');
    const [hours, setHours] = useState(10);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    // Analytics Calculation
    const myJobs = jobs.filter(j => j.postedBy === user.username);
    const totalSpent = myJobs.reduce((acc, curr) => acc + curr.total, 0);

    useEffect(() => {
        if (initialData && initialData.freelancerName) {
            setDescription(`DIRECT OFFER FOR: ${initialData.freelancerName}.\n\nProject details: `);
            if(initialData.specialization.includes("Web")) setServiceType('web');
        }
    }, [initialData]);

    useEffect(() => {
        const serviceObj = ServiceFactory.createService(serviceType);
        let strategy = complexity === 'low' ? new LowComplexityStrategy() : 
                       complexity === 'medium' ? new MediumComplexityStrategy() : new HighComplexityStrategy();
        setPrice(strategy.calculate(serviceObj.baseRate, hours));
    }, [serviceType, complexity, hours]);

    const handleBooking = () => {
        onOrderCreate({
            id: Date.now(),
            user: user,
            email: user.email,
            service: ServiceFactory.createService(serviceType).name,
            total: price,
            description: description,
            status: "Open",
            postedBy: user.username 
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-blue-500">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Jobs Posted</p>
                    <p className="text-2xl font-bold dark:text-white">{myJobs.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-green-500">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Value</p>
                    <p className="text-2xl font-bold dark:text-white">RM {totalSpent.toFixed(2)}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Post a Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                    <label className="block text-sm font-bold dark:text-white">Service Type</label>
                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                        <option value="web">Web Development</option>
                        <option value="design">Graphic Design</option>
                        <option value="content">Content Writing</option>
                    </select>
                    <label className="block text-sm font-bold dark:text-white">Complexity</label>
                    <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                    </select>
                    <div>
                        <label className="block text-sm font-bold dark:text-white mb-2">Duration: {hours} Hours</label>
                        <input type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full cursor-pointer" />
                    </div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Project Requirements..." className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white h-24 mt-4"></textarea>
                </div>
                <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div><h3 className="text-xl font-bold">Estimate</h3><p className="text-4xl font-bold mt-2">RM {price.toFixed(2)}</p></div>
                    <button onClick={handleBooking} className="w-full bg-green-500 hover:bg-green-600 font-bold py-3 rounded mt-4">Post Job</button>
                </div>
            </div>
        </div>
    );
};

// --- PAGE 6: FREELANCER JOB BOARD ---
const FreelancerPage = ({ jobs, onAcceptJob, user }) => {
    const availableJobs = jobs.filter(job => job.status === "Open");
    
    // Analytics
    const myWork = jobs.filter(j => j.acceptedBy === user.name);
    const earnings = myWork.reduce((acc, curr) => acc + curr.total, 0);

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
             {/* Dashboard Stats */}
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-purple-500">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Jobs Accepted</p>
                    <p className="text-2xl font-bold dark:text-white">{myWork.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-green-500">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Projected Earnings</p>
                    <p className="text-2xl font-bold dark:text-white">RM {earnings.toFixed(2)}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Job Board</h2>
            {availableJobs.length === 0 ? <p className="text-gray-500">No open jobs.</p> : (
                <div className="grid gap-4">
                    {availableJobs.map(job => (
                        <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{job.service}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Client: {job.postedBy}</p>
                                <p className="text-gray-600 dark:text-gray-300 mt-2 italic">"{job.description}"</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-green-600">RM {job.total.toFixed(2)}</p>
                                <button onClick={() => onAcceptJob(job.id, user)} className="mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-lg transition hover:scale-105">Accept Job</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- MAIN CONTROLLER (APP) ---
const App = () => {
    const [page, setPage] = useState('login');
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // --- PERSISTENT STATE ---
    const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem('giglink_jobs')) || []);
    const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('giglink_messages')) || []);
    const [allFreelancers, setAllFreelancers] = useState(() => JSON.parse(localStorage.getItem('giglink_freelancers')) || [
        { name: "John Doe", rating: "4.8", specialization: "Web Development" },
        { name: "Jane Smith", rating: "4.9", specialization: "Graphic Design" },
        { name: "Ali Bin Abu", rating: "4.7", specialization: "Content Writing" }
    ]);
    const [directHireData, setDirectHireData] = useState(null);

    // Save to LocalStorage whenever data changes
    useEffect(() => { localStorage.setItem('giglink_jobs', JSON.stringify(jobs)); }, [jobs]);
    useEffect(() => { localStorage.setItem('giglink_messages', JSON.stringify(messages)); }, [messages]);
    useEffect(() => { localStorage.setItem('giglink_freelancers', JSON.stringify(allFreelancers)); }, [allFreelancers]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleLogin = (profile) => {
        setUser(profile);
        if (profile.type === 'freelancer') {
            const exists = allFreelancers.find(f => f.name === profile.name);
            if (!exists) setAllFreelancers([...allFreelancers, { name: profile.name, rating: profile.rating, specialization: profile.specialization }]);
        }
        setPage(profile.type === 'client' ? 'client-home' : 'freelancer-home');
    };

    const handleLogout = () => { setUser(null); setPage('login'); };

    const handleOrderCreate = (newJob) => {
        setJobs([...jobs, newJob]);
        alert("Job Posted Successfully!");
        setPage('client-home'); 
        setDirectHireData(null);
    };

    const handleDirectHire = (freelancer) => {
        setDirectHireData({ freelancerName: freelancer.name, specialization: freelancer.specialization });
        setPage('client-home');
    };

    const handleAcceptJob = (jobId, freelancerUser) => {
        const updatedJobs = jobs.map(job => job.id === jobId ? { ...job, status: 'Accepted', acceptedBy: freelancerUser.name } : job);
        setJobs(updatedJobs);
        const acceptedJob = jobs.find(job => job.id === jobId);
        
        const newMessage = {
            id: Date.now(),
            toUser: acceptedJob.postedBy, 
            title: "Job Accepted!",
            text: `Freelancer ${freelancerUser.name} has accepted your "${acceptedJob.service}" project.`,
            isActionable: true,
            isPaid: false,
            freelancerPhone: freelancerUser.phone,
            amount: acceptedJob.total,
            jobId: acceptedJob.id
        };
        setMessages([...messages, newMessage]);
        alert("Job Accepted!");
    };

    const handlePayment = (msgId) => {
        if(confirm("Confirm Payment?")) {
            const updatedMessages = messages.map(msg => msg.id === msgId ? { ...msg, isPaid: true } : msg);
            setMessages(updatedMessages);
            alert("Payment Successful!");
        }
    };

    const myMessages = user ? messages.filter(m => m.toUser === user.username) : [];

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                {user && (
                    <nav className="bg-white dark:bg-gray-800 shadow mb-4 sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="font-bold text-xl text-blue-600 dark:text-blue-400 mr-8">GigLink</div>
                                <button onClick={() => setPage(user.type === 'client' ? 'client-home' : 'freelancer-home')} className="text-sm font-bold hover:text-blue-500 mr-4">Home</button>
                                {user.type === 'client' && (
                                    <>
                                        <button onClick={() => setPage('freelancer-list')} className="text-sm font-bold hover:text-blue-500 mr-4">Freelancers</button>
                                        <button onClick={() => setPage('inbox')} className="text-sm font-bold hover:text-blue-500 flex items-center">
                                            Inbox {myMessages.length > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-2 rounded-full">{myMessages.length}</span>}
                                        </button>
                                    </>
                                )}
                                <button onClick={() => setPage('profile')} className="text-sm font-bold hover:text-blue-500">Profile</button>
                            </div>
                            <div className="flex items-center space-x-3">
                                <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
                                <div className="flex items-center border-l pl-4 border-gray-300 dark:border-gray-600">
                                    <UserAvatar seed={user.username} className="h-8 w-8 mr-2" />
                                    <span className="text-xs font-bold capitalize mr-3">{user.name}</span>
                                    <button onClick={handleLogout} className="text-xs text-red-500 border border-red-200 px-2 py-1 rounded hover:bg-red-50">Logout</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                )}

                {page === 'login' && <LoginPage onLogin={handleLogin} isDark={isDarkMode} toggleTheme={toggleTheme} />}
                {page === 'profile' && <ProfilePage user={user} onUpdateProfile={setUser} />}
                {page === 'client-home' && <ClientPage user={user} onOrderCreate={handleOrderCreate} initialData={directHireData} jobs={jobs} />}
                {page === 'freelancer-list' && <FreelancerListPage freelancers={allFreelancers} onDirectHire={handleDirectHire} />}
                {page === 'inbox' && <InboxPage messages={myMessages} onPayment={handlePayment} />}
                {page === 'freelancer-home' && <FreelancerPage jobs={jobs} onAcceptJob={handleAcceptJob} user={user} />}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
