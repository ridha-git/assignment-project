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

/* ==========================================
   SECTION 2: UI COMPONENTS (MODERN UX)
   ========================================== */

const { useState, useEffect } = React;

// --- 1. TOAST NOTIFICATION COMPONENT (Replaces Alert) ---
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Auto close after 3s
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500"
    };

    return (
        <div className={`fixed top-5 right-5 z-50 ${bgColors[type]} text-white px-6 py-3 rounded shadow-lg animate-fade-in flex items-center`}>
            <span className="mr-2 text-xl">{type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span className="font-semibold">{message}</span>
        </div>
    );
};

// --- 2. LOADING BUTTON COMPONENT ---
const LoadingButton = ({ onClick, isLoading, text, className, type = "button" }) => (
    <button 
        type={type}
        onClick={onClick} 
        disabled={isLoading}
        className={`${className} flex justify-center items-center transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
        {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : null}
        {isLoading ? "Processing..." : text}
    </button>
);

// --- 3. AVATAR COMPONENT ---
const UserAvatar = ({ seed, className }) => (
    <img 
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`} 
        alt="avatar" 
        className={`rounded-full border-2 border-white shadow-sm ${className}`}
    />
);

// --- 4. THEME TOGGLE ---
const ThemeToggle = ({ isDark, toggleTheme }) => (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
        {isDark ? "☀️" : "🌙"}
    </button>
);

/* ==========================================
   SECTION 3: PAGE COMPONENTS
   ========================================== */

// --- PAGE: LOGIN ---
const LoginPage = ({ onLogin, onSignup, existingUsers, isDark, toggleTheme, showToast }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    
    // Form States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("client");
    const [specialization, setSpecialization] = useState("Web Development");

    const handleReset = () => {
        if(confirm("⚠ RESET SYSTEM? This will restore defaults.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start Spinner

        // Simulate Network Delay (Authenticity)
        setTimeout(() => {
            if (isRegistering) {
                if (username && password && fullName && phone) {
                    if (existingUsers.find(u => u.username === username)) {
                        showToast("Username already taken", "error");
                        setIsLoading(false);
                        return;
                    }
                    const newUser = {
                        name: fullName, username, password, email, phone, type: userType,
                        rating: "5.0", specialization: userType === 'freelancer' ? specialization : null
                    };
                    onSignup(newUser);
                    showToast("Account Created Successfully!", "success");
                } else {
                    showToast("Please fill all fields", "error");
                }
            } else {
                const foundUser = existingUsers.find(u => u.username === username && u.password === password);
                if (foundUser) {
                    onLogin(foundUser);
                    showToast(`Welcome back, ${foundUser.name}!`, "success");
                } else {
                    showToast("Invalid Credentials", "error");
                }
            }
            setIsLoading(false); // Stop Spinner
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 relative">
            <div className="absolute top-5 right-5"><ThemeToggle isDark={isDark} toggleTheme={toggleTheme} /></div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 animate-fade-in my-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">GigLink</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{isRegistering ? "Create New Account" : "Login to Your Account"}</p>
                
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
                                <select value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"><option value="Web Development">Web Development</option><option value="Graphic Design">Graphic Design</option><option value="Content Writing">Content Writing</option></select>
                            )}
                        </div>
                    )}
                    
                    <LoadingButton 
                        type="submit" 
                        isLoading={isLoading} 
                        text={isRegistering ? "Sign Up" : "Login"} 
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold" 
                    />
                </form>

                <button onClick={() => setIsRegistering(!isRegistering)} className="w-full mt-4 text-sm text-blue-500 underline">{isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}</button>
                {!isRegistering && (
                    <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-500 dark:text-gray-400 text-center">
                        <p><strong>Demo Login:</strong> client1 / 123 OR john / 123</p>
                    </div>
                )}
                <div className="mt-8 border-t pt-4 text-center"><button onClick={handleReset} className="text-xs text-red-400 hover:text-red-600">⚠ Reset Database</button></div>
            </div>
        </div>
    );
};

// --- PAGE: PROFILE ---
const ProfilePage = ({ user, onUpdateProfile, showToast }) => {
    const [formData, setFormData] = useState(user);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onUpdateProfile(formData);
            showToast("Profile Updated!", "success");
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Profile</h2>
            <div className="flex items-center mb-6">
                <UserAvatar seed={formData.username} className="h-24 w-24 mr-4" />
                <div><h3 className="text-xl font-bold dark:text-white">{formData.name}</h3><p className="text-gray-500 dark:text-gray-400 capitalize">{formData.type}</p></div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                <LoadingButton type="submit" isLoading={isLoading} text="Save Changes" className="w-full bg-blue-600 text-white py-2 rounded" />
            </form>
        </div>
    );
};

// --- PAGE: DIRECTORY ---
const FreelancerListPage = ({ freelancers, onDirectHire }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filtered = freelancers.filter(fl => fl.name.toLowerCase().includes(searchTerm.toLowerCase()) || fl.specialization.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Find Talent</h2>
                <input type="text" placeholder="Search freelancers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:text-white w-64" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((fl, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <UserAvatar seed={fl.name} className="h-16 w-16" />
                                <div className="ml-4"><h3 className="text-lg font-bold text-gray-800 dark:text-white">{fl.name}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{fl.specialization}</p></div>
                            </div>
                            <div className="flex items-center justify-between mb-4 bg-gray-50 dark:bg-gray-700 p-2 rounded"><span className="text-yellow-500 font-bold">⭐ {fl.rating}</span><span className="text-xs text-gray-400">Verified</span></div>
                            <button onClick={() => onDirectHire(fl)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">Hire Now &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PAGE: INBOX ---
const InboxPage = ({ messages, onPayment, showToast }) => {
    const [processingId, setProcessingId] = useState(null);

    const handlePay = (id) => {
        setProcessingId(id);
        setTimeout(() => {
            onPayment(id);
            setProcessingId(null);
            showToast("Payment Successful!", "success");
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Inbox</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden min-h-[300px]">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
                        <span className="text-4xl mb-2">📭</span>
                        <p>No messages yet. Post a job to get started!</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {messages.map((msg) => (
                            <li key={msg.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <div className="flex justify-between"><span className="font-bold text-blue-600 dark:text-blue-400">{msg.title}</span><span className="text-xs text-gray-400">{new Date(msg.id).toLocaleTimeString()}</span></div>
                                <p className="mt-1 text-gray-800 dark:text-gray-200 mb-3">{msg.text}</p>
                                {msg.isActionable && (
                                    <div className="flex space-x-3 mt-2">
                                        <a href={`https://wa.me/${msg.freelancerPhone ? msg.freelancerPhone.replace(/\D/g,'') : ''}`} target="_blank" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow flex items-center">💬 WhatsApp</a>
                                        {!msg.isPaid ? (
                                            <LoadingButton onClick={() => handlePay(msg.id)} isLoading={processingId === msg.id} text={`💳 Pay RM ${msg.amount.toFixed(2)}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" />
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
};

// --- PAGE: CLIENT POST JOB ---
const ClientPage = ({ user, onOrderCreate, initialData, jobs, showToast }) => {
    const [serviceType, setServiceType] = useState('web');
    const [complexity, setComplexity] = useState('low');
    const [hours, setHours] = useState(10);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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
        let strategy = complexity === 'low' ? new LowComplexityStrategy() : complexity === 'medium' ? new MediumComplexityStrategy() : new HighComplexityStrategy();
        setPrice(strategy.calculate(serviceObj.baseRate, hours));
    }, [serviceType, complexity, hours]);

    const handleBooking = () => {
        setIsLoading(true);
        setTimeout(() => {
            onOrderCreate({
                id: Date.now(), user: user, email: user.email, service: ServiceFactory.createService(serviceType).name,
                total: price, description: description, status: "Open", postedBy: user.username 
            });
            showToast("Job Posted Successfully!", "success");
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-blue-500"><p className="text-gray-500 text-sm">Jobs Posted</p><p className="text-2xl font-bold dark:text-white">{myJobs.length}</p></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-green-500"><p className="text-gray-500 text-sm">Total Value</p><p className="text-2xl font-bold dark:text-white">RM {totalSpent.toFixed(2)}</p></div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Post a Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                    <label className="block text-sm font-bold dark:text-white">Service Type</label>
                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                        <option value="web">Web Development</option><option value="design">Graphic Design</option><option value="content">Content Writing</option>
                    </select>
                    <label className="block text-sm font-bold dark:text-white">Complexity</label>
                    <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                    </select>
                    <div><label className="block text-sm font-bold dark:text-white mb-2">Duration: {hours} Hours</label><input type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full cursor-pointer" /></div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Project Requirements..." className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white h-24 mt-4"></textarea>
                </div>
                <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div><h3 className="text-xl font-bold">Estimate</h3><p className="text-4xl font-bold mt-2">RM {price.toFixed(2)}</p></div>
                    <LoadingButton onClick={handleBooking} isLoading={isLoading} text="Post Job" className="w-full bg-green-500 hover:bg-green-600 font-bold py-3 rounded mt-4" />
                </div>
            </div>
        </div>
    );
};

// --- PAGE: FREELANCER BOARD ---
const FreelancerPage = ({ jobs, onAcceptJob, user, showToast }) => {
    const [acceptingId, setAcceptingId] = useState(null);
    const availableJobs = jobs.filter(job => job.status === "Open");
    const myWork = jobs.filter(j => j.acceptedBy === user.name);
    const earnings = myWork.reduce((acc, curr) => acc + curr.total, 0);

    const handleAccept = (id) => {
        setAcceptingId(id);
        setTimeout(() => {
            onAcceptJob(id, user);
            setAcceptingId(null);
            showToast("Job Accepted! Check 'Jobs' tab.", "success");
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-purple-500"><p className="text-gray-500 text-sm">Jobs Accepted</p><p className="text-2xl font-bold dark:text-white">{myWork.length}</p></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-green-500"><p className="text-gray-500 text-sm">Earnings</p><p className="text-2xl font-bold dark:text-white">RM {earnings.toFixed(2)}</p></div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Job Board</h2>
            {availableJobs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white dark:bg-gray-800 rounded shadow"><p className="text-lg">No open jobs right now.</p><p className="text-sm">Check back later!</p></div>
            ) : (
                <div className="grid gap-4">
                    {availableJobs.map(job => (
                        <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg">
                            <div><h3 className="text-lg font-bold text-gray-800 dark:text-white">{job.service}</h3><p className="text-sm text-gray-500 dark:text-gray-400">Client: {job.postedBy}</p><p className="text-gray-600 dark:text-gray-300 mt-2 italic">"{job.description}"</p></div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-green-600">RM {job.total.toFixed(2)}</p>
                                <LoadingButton onClick={() => handleAccept(job.id)} isLoading={acceptingId === job.id} text="Accept Job" className="mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow" />
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
    const [toast, setToast] = useState(null); // { message, type }
    
    // --- PERSISTENT STATE ---
    const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem('giglink_jobs')) || []);
    const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('giglink_messages')) || []);
    const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('giglink_users')) || [
        { name: "Demo Client", username: "client1", password: "123", email: "client@test.com", type: "client", phone: "123456" },
        { name: "John Doe", username: "john", password: "123", email: "john@test.com", type: "freelancer", phone: "123456", rating: "4.8", specialization: "Web Development" }
    ]);
    const [allFreelancers, setAllFreelancers] = useState(() => JSON.parse(localStorage.getItem('giglink_freelancers')) || [
        { name: "John Doe", rating: "4.8", specialization: "Web Development" },
        { name: "Jane Smith", rating: "4.9", specialization: "Graphic Design" }
    ]);
    const [directHireData, setDirectHireData] = useState(null);

    // Save Data
    useEffect(() => { localStorage.setItem('giglink_jobs', JSON.stringify(jobs)); }, [jobs]);
    useEffect(() => { localStorage.setItem('giglink_messages', JSON.stringify(messages)); }, [messages]);
    useEffect(() => { localStorage.setItem('giglink_users', JSON.stringify(users)); }, [users]);
    useEffect(() => { localStorage.setItem('giglink_freelancers', JSON.stringify(allFreelancers)); }, [allFreelancers]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const showToast = (message, type = "info") => setToast({ message, type });

    const handleLogin = (profile) => { setUser(profile); setPage(profile.type === 'client' ? 'client-home' : 'freelancer-home'); };
    const handleSignup = (newUser) => {
        setUsers([...users, newUser]);
        if (newUser.type === 'freelancer') setAllFreelancers([...allFreelancers, { name: newUser.name, rating: newUser.rating, specialization: newUser.specialization }]);
        handleLogin(newUser);
    };
    const handleLogout = () => { setUser(null); setPage('login'); };

    const handleOrderCreate = (newJob) => {
        setJobs([...jobs, newJob]);
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
            id: Date.now(), toUser: acceptedJob.postedBy, title: "Job Accepted!",
            text: `Freelancer ${freelancerUser.name} has accepted your "${acceptedJob.service}" project.`,
            isActionable: true, isPaid: false, freelancerPhone: freelancerUser.phone, amount: acceptedJob.total, jobId: acceptedJob.id
        };
        setMessages([...messages, newMessage]);
    };

    const handlePayment = (msgId) => {
        const updatedMessages = messages.map(msg => msg.id === msgId ? { ...msg, isPaid: true } : msg);
        setMessages(updatedMessages);
    };

    const myMessages = user ? messages.filter(m => m.toUser === user.username) : [];

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
                
                {user && (
                    <nav className="bg-white dark:bg-gray-800 shadow mb-4 sticky top-0 z-40">
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

                {page === 'login' && <LoginPage onLogin={handleLogin} onSignup={handleSignup} existingUsers={users} isDark={isDarkMode} toggleTheme={toggleTheme} showToast={showToast} />}
                {page === 'profile' && <ProfilePage user={user} onUpdateProfile={setUser} showToast={showToast} />}
                {page === 'client-home' && <ClientPage user={user} onOrderCreate={handleOrderCreate} initialData={directHireData} jobs={jobs} showToast={showToast} />}
                {page === 'freelancer-list' && <FreelancerListPage freelancers={allFreelancers} onDirectHire={handleDirectHire} />}
                {page === 'inbox' && <InboxPage messages={myMessages} onPayment={handlePayment} showToast={showToast} />}
                {page === 'freelancer-home' && <FreelancerPage jobs={jobs} onAcceptJob={handleAcceptJob} user={user} showToast={showToast} />}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
