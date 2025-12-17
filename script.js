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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            if (username && password && fullName && phone) {
                onLogin({ name: fullName, username, password, email, phone, type: userType });
            } else alert("Please fill in all fields.");
        } else {
            if (username && password) {
                // Default Profile for Demo
                onLogin({
                    name: username,
                    username: username,
                    password: password,
                    email: `${username}@example.com`,
                    phone: "60123456789", // Default phone for demo
                    type: "client" 
                });
            } else alert("Please enter credentials.");
        }
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
                            <input type="tel" placeholder="Phone (e.g. 6012...)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" required />
                            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" required />
                            <select value={userType} onChange={e => setUserType(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white">
                                <option value="client">Client (Hire)</option>
                                <option value="freelancer">Freelancer (Work)</option>
                            </select>
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
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Name" />
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Phone" />
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Email" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Save Changes</button>
            </form>
        </div>
    );
};

// --- PAGE 3: CLIENT INBOX (UPDATED: WhatsApp & Payment) ---
const InboxPage = ({ messages, onPayment }) => (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Inbox</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {messages.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">No messages yet.</div>
            ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {messages.map((msg) => (
                        <li key={msg.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <div className="flex justify-between">
                                <span className="font-bold text-blue-600 dark:text-blue-400">{msg.title || "Notification"}</span>
                                <span className="text-xs text-gray-400">{new Date(msg.id).toLocaleTimeString()}</span>
                            </div>
                            <p className="mt-1 text-gray-800 dark:text-gray-200 mb-3">{msg.text}</p>
                            
                            {/* ACTION BUTTONS */}
                            {msg.isActionable && (
                                <div className="flex space-x-3 mt-2">
                                    {/* WhatsApp Button */}
                                    <a 
                                        href={`https://wa.me/${msg.freelancerPhone ? msg.freelancerPhone.replace(/\D/g,'') : ''}`} 
                                        target="_blank" 
                                        className="flex items-center bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded shadow transition"
                                    >
                                        <span className="mr-2">💬</span> Chat on WhatsApp
                                    </a>

                                    {/* Payment Button */}
                                    {!msg.isPaid ? (
                                        <button 
                                            onClick={() => onPayment(msg.id)}
                                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow transition"
                                        >
                                            <span className="mr-2">💳</span> Pay RM {msg.amount.toFixed(2)}
                                        </button>
                                    ) : (
                                        <span className="flex items-center text-green-600 font-bold px-4 py-2 border border-green-200 rounded bg-green-50">
                                            ✅ Paid Successfully
                                        </span>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

// --- PAGE 4: CLIENT CALCULATOR (UPDATED: Slider Description) ---
const ClientPage = ({ user, onOrderCreate }) => {
    const [serviceType, setServiceType] = useState('web');
    const [complexity, setComplexity] = useState('low');
    const [hours, setHours] = useState(10);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

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
                        <option value="low">Low Complexity</option><option value="medium">Medium Complexity</option><option value="high">High Complexity</option>
                    </select>
                    
                    {/* SLIDER WITH DESCRIPTION */}
                    <div>
                        <label className="block text-sm font-bold dark:text-white mb-2">Project Duration (Hours)</label>
                        <input type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full cursor-pointer" />
                        <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded mt-2 text-center">
                            <span className="text-blue-800 dark:text-blue-300 font-semibold">Estimated Completion Time: {hours} Hours</span>
                        </div>
                    </div>

                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your project requirements..." className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white h-24 mt-4"></textarea>
                </div>
                <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div><h3 className="text-xl font-bold">Estimate</h3><p className="text-4xl font-bold mt-2">RM {price.toFixed(2)}</p></div>
                    <button onClick={handleBooking} className="w-full bg-green-500 hover:bg-green-600 font-bold py-3 rounded mt-4">Post Job</button>
                </div>
            </div>
        </div>
    );
};

// --- PAGE 5: FREELANCER JOB BOARD ---
const FreelancerPage = ({ jobs, onAcceptJob, user }) => {
    const availableJobs = jobs.filter(job => job.status === "Open");

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Available Jobs</h2>
            {availableJobs.length === 0 ? (
                <p className="text-gray-500">No jobs available right now.</p>
            ) : (
                <div className="grid gap-4">
                    {availableJobs.map(job => (
                        <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{job.service}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Posted by: {job.user.name}</p>
                                <p className="text-gray-600 dark:text-gray-300 mt-2 italic">"{job.description}"</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-green-600">RM {job.total.toFixed(2)}</p>
                                <button 
                                    onClick={() => onAcceptJob(job.id, user)}
                                    className="mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-lg transition transform hover:scale-105"
                                >
                                    Accept Job
                                </button>
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
    const [jobs, setJobs] = useState([]); 
    const [messages, setMessages] = useState([]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleLogin = (profile) => {
        setUser(profile);
        setPage(profile.type === 'client' ? 'client-home' : 'freelancer-home');
    };

    const handleLogout = () => { setUser(null); setPage('login'); };

    const handleOrderCreate = (newJob) => {
        setJobs([...jobs, newJob]);
        alert("Job Posted Successfully! Freelancers can now see it.");
        setPage('client-home'); 
    };

    // Freelancer accepts a job
    const handleAcceptJob = (jobId, freelancerUser) => {
        const updatedJobs = jobs.map(job => 
            job.id === jobId ? { ...job, status: 'Accepted', acceptedBy: freelancerUser.name } : job
        );
        setJobs(updatedJobs);

        const acceptedJob = jobs.find(job => job.id === jobId);

        // CREATE NOTIFICATION WITH ACTIONS (WhatsApp & Payment)
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

        alert("Job Accepted! The client has been notified.");
    };

    // Payment Handler
    const handlePayment = (msgId) => {
        if(confirm("Confirm Payment? This will simulate a transaction.")) {
            // Update message status to Paid
            const updatedMessages = messages.map(msg => 
                msg.id === msgId ? { ...msg, isPaid: true } : msg
            );
            setMessages(updatedMessages);
            alert("Payment Successful! Receipt sent to email.");
        }
    };

    const myMessages = user ? messages.filter(m => m.toUser === user.username) : [];

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                {user && (
                    <nav className="bg-white dark:bg-gray-800 shadow mb-4">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                            <div className="font-bold text-xl text-blue-600 dark:text-blue-400">GigLink</div>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => setPage(user.type === 'client' ? 'client-home' : 'freelancer-home')} className="text-sm font-bold hover:text-blue-500">Home</button>
                                
                                {user.type === 'client' && (
                                    <button onClick={() => setPage('inbox')} className="text-sm font-bold hover:text-blue-500 flex items-center">
                                        Inbox 
                                        {myMessages.length > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-2 rounded-full">{myMessages.length}</span>}
                                    </button>
                                )}
                                
                                <button onClick={() => setPage('profile')} className="text-sm font-bold hover:text-blue-500">Profile</button>
                                
                                <div className="border-l pl-4 flex items-center space-x-3">
                                    <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded capitalize">{user.type}: {user.name}</span>
                                    <button onClick={handleLogout} className="text-sm text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-50">Logout</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                )}

                {page === 'login' && <LoginPage onLogin={handleLogin} isDark={isDarkMode} toggleTheme={toggleTheme} />}
                {page === 'profile' && <ProfilePage user={user} onUpdateProfile={setUser} />}
                {page === 'client-home' && <ClientPage user={user} onOrderCreate={handleOrderCreate} />}
                {page === 'inbox' && <InboxPage messages={myMessages} onPayment={handlePayment} />}
                {page === 'freelancer-home' && <FreelancerPage jobs={jobs} onAcceptJob={handleAcceptJob} user={user} />}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
