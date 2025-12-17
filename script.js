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

// --- OBSERVER PATTERN (Notifications) ---
class NotificationService {
    constructor() { this.observers = []; }
    subscribe(observer) { this.observers.push(observer); }
    notify(data) { this.observers.forEach(observer => observer.update(data)); }
}
class EmailObserver {
    update(data) { return `[EMAIL]: Invoice sent to ${data.email} for RM ${data.total.toFixed(2)}`; }
}
class WhatsAppObserver {
    update(data) { return `[WHATSAPP]: Hi ${data.user.name}, project "${data.service}" confirmed!`; }
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
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Sign Up

    // Login States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Sign Up States
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("client");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isRegistering) {
            // --- SIGN UP LOGIC ---
            if (username && password && fullName && email && phone) {
                const newUser = {
                    name: fullName,
                    username: username,
                    password: password,
                    email: email,
                    phone: phone,
                    type: userType
                };
                onLogin(newUser);
            } else {
                alert("Please fill in all fields to sign up.");
            }
        } else {
            // --- LOGIN LOGIC ---
            if (username && password) {
                // Simulate a default profile if just logging in
                const defaultProfile = {
                    name: username,
                    username: username,
                    password: password,
                    email: `${username.toLowerCase()}@example.com`,
                    phone: "+6012-3456789",
                    type: "client" // Default to client
                };
                onLogin(defaultProfile);
            } else {
                alert("Please enter username and password.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 relative">
            <div className="absolute top-5 right-5">
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 animate-fade-in transition-colors duration-300 my-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">GigLink</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{isRegistering ? "Create New Account" : "Welcome Back"}</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Common Fields */}
                    <div>
                        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                    </div>

                    {/* Sign Up Only Fields */}
                    {isRegistering && (
                        <div className="space-y-4 animate-fade-in">
                            <hr className="border-gray-200 dark:border-gray-600"/>
                            <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                            <input type="tel" placeholder="Telephone No." value={phone} onChange={e => setPhone(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                            
                            <select value={userType} onChange={e => setUserType(e.target.value)} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                <option value="client">I want to Hire (Client)</option>
                                <option value="freelancer">I want to Work (Freelancer)</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold">
                        {isRegistering ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button 
                        onClick={() => setIsRegistering(!isRegistering)} 
                        className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 underline"
                    >
                        {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- PAGE 2: USER PROFILE PAGE (EDIT PROFILE) ---
const ProfilePage = ({ user, onUpdateProfile }) => {
    const [formData, setFormData] = useState(user);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Profile</h2>
            {saved && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">Profile updated successfully!</div>}
            
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telephone No.</label>
                    <input name="phone" type="text" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <option value="client">Client (I want to hire)</option>
                        <option value="freelancer">Freelancer (I want to work)</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">Save Changes</button>
            </form>
        </div>
    );
};

// --- PAGE 3a: CLIENT ACCOUNT PAGE (CALCULATOR) ---
const ClientPage = ({ user, onOrderCreate }) => {
    const [serviceType, setServiceType] = useState('web');
    const [complexity, setComplexity] = useState('low');
    const [hours, setHours] = useState(10);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState(""); // NEW: Description State

    useEffect(() => {
        const serviceObj = ServiceFactory.createService(serviceType);
        let strategy = complexity === 'low' ? new LowComplexityStrategy() : 
                       complexity === 'medium' ? new MediumComplexityStrategy() : new HighComplexityStrategy();
        setPrice(strategy.calculate(serviceObj.baseRate, hours));
    }, [serviceType, complexity, hours]);

    const handleBooking = () => {
        onOrderCreate({
            id: Math.floor(Math.random() * 10000),
            user: user,
            email: user.email,
            service: ServiceFactory.createService(serviceType).name,
            total: price,
            description: description // NEW: Passing description to order
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Client Dashboard: Estimate Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <label className="block mb-2 dark:text-white font-semibold">Service Type</label>
                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-4">
                        <option value="web">Web Development</option>
                        <option value="design">Graphic Design</option>
                        <option value="content">Content Writing</option>
                    </select>
                    
                    <label className="block mb-2 dark:text-white font-semibold">Complexity</label>
                    <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-4">
                        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                    </select>
                    
                    <label className="block mb-2 dark:text-white font-semibold">Estimated Hours: {hours}</label>
                    <input type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full mb-4" />

                    {/* NEW: Project Description Field */}
                    <label className="block mb-2 dark:text-white font-semibold">Project Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the work you need (e.g., I need a responsive website for my bakery...)"
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white h-24"
                    ></textarea>
                </div>

                <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Total Estimate</h3>
                        <p className="text-4xl font-bold mt-2">RM {price.toFixed(2)}</p>
                    </div>
                    <button onClick={handleBooking} className="w-full bg-green-500 hover:bg-green-600 font-bold py-3 rounded mt-4">Place Order</button>
                </div>
            </div>
        </div>
    );
};

// --- PAGE 3b: FREELANCER ACCOUNT PAGE (JOB BOARD) ---
const FreelancerPage = () => {
    // Static list of jobs to simulate a freelancer view
    const jobs = [
        { id: 1, title: "Logo Design needed", budget: "RM 400", type: "Design" },
        { id: 2, title: "React JS Bug Fix", budget: "RM 150", type: "Web" },
        { id: 3, title: "SEO Articles", budget: "RM 300", type: "Content" }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Freelancer Dashboard: Available Jobs</h2>
            <div className="grid gap-4">
                {jobs.map(job => (
                    <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{job.title}</h3>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">{job.type}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-green-600">{job.budget}</p>
                            <button className="mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PAGE 4: NOTIFICATIONS/SUCCESS ---
const NotificationPage = ({ order, onReset }) => {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const notifier = new NotificationService();
        notifier.subscribe(new EmailObserver());
        notifier.subscribe(new WhatsAppObserver());
        const newLogs = [];
        notifier.observers.forEach(obs => newLogs.push(obs.update(order)));
        setLogs(newLogs);
    }, [order]);

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-100 p-4 mb-6 rounded">
                <p className="font-bold">Order #{order.id} Success!</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b pb-2 mb-4">Order Details</h3>
                <div className="mb-4 text-gray-700 dark:text-gray-300">
                    <p><strong>Service:</strong> {order.service}</p>
                    <p><strong>Description:</strong> {order.description || "No description provided."}</p>
                    <p><strong>Total:</strong> RM {order.total.toFixed(2)}</p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b pb-2 mb-4">Notifications Sent</h3>
                <ul className="space-y-3">
                    {logs.map((log, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <span className="mr-2">{log.includes("EMAIL") ? "📧" : "📱"}</span> {log}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={onReset} className="mt-6 text-blue-600 dark:text-blue-400 font-bold">&larr; Back</button>
        </div>
    );
};

// --- MAIN APP CONTROLLER ---
const App = () => {
    const [page, setPage] = useState('login');
    const [user, setUser] = useState(null); 
    const [lastOrder, setLastOrder] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    
    const handleLogin = (userProfile) => {
        setUser(userProfile);
        if(userProfile.type === 'client') setPage('client-home');
        else setPage('freelancer-home');
    };

    const handleUpdateProfile = (updatedProfile) => {
        setUser(updatedProfile);
        if(updatedProfile.type === 'client') setPage('client-home');
        else setPage('freelancer-home');
    };

    const handleOrder = (order) => { setLastOrder(order); setPage('notifications'); };
    const handleLogout = () => { setUser(null); setPage('login'); setLastOrder(null); };

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                {user && (
                    <nav className="bg-white dark:bg-gray-800 shadow mb-4">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                            <div className="font-bold text-xl text-blue-600 dark:text-blue-400">GigLink</div>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => setPage(user.type === 'client' ? 'client-home' : 'freelancer-home')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-500">Home</button>
                                <button onClick={() => setPage('profile')} className={`text-sm font-bold ${page === 'profile' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}>Profile</button>
                                
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
                {page === 'profile' && <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} />}
                {page === 'client-home' && <ClientPage user={user} onOrderCreate={handleOrder} />}
                {page === 'freelancer-home' && <FreelancerPage />}
                {page === 'notifications' && <NotificationPage order={lastOrder} onReset={() => setPage('client-home')} />}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
