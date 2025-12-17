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

// --- 1. TOAST NOTIFICATION ---
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); 
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColors = {
        success: "bg-gradient-to-r from-green-500 to-emerald-600",
        error: "bg-gradient-to-r from-red-500 to-rose-600",
        info: "bg-gradient-to-r from-blue-500 to-indigo-600"
    };

    return (
        <div className={`fixed top-5 right-5 z-50 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-2xl animate-fade-in flex items-center transform transition-all hover:scale-105`}>
            <span className="mr-3 text-2xl">{type === 'success' ? '✅' : type === 'error' ? '❌' : '🔔'}</span>
            <span className="font-bold tracking-wide">{message}</span>
        </div>
    );
};

// --- 2. PAYMENT MODAL (REALISTIC ENVIRONMENT) ---
const PaymentModal = ({ isOpen, onClose, onConfirm, amount, recipient }) => {
    if (!isOpen) return null;
    const [processing, setProcessing] = useState(false);

    const handlePay = (e) => {
        e.preventDefault();
        setProcessing(true);
        // Simulate Bank Processing Delay
        setTimeout(() => {
            setProcessing(false);
            onConfirm();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2">💳</span> Secure Payment
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-xl">&times;</button>
                </div>
                
                <div className="mb-6 p-4 bg-blue-50 dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Paying to:</p>
                    <p className="font-bold text-gray-800 dark:text-white text-lg">{recipient}</p>
                    <div className="mt-2 flex justify-between items-end">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount:</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">RM {amount.toFixed(2)}</p>
                    </div>
                </div>

                <form onSubmit={handlePay} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase">Card Number</label>
                        <div className="relative">
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none" required />
                            <span className="absolute left-3 top-3 text-gray-400">🔢</span>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-xs font-bold text-gray-500 uppercase">Expiry</label>
                            <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none" required />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-xs font-bold text-gray-500 uppercase">CVV</label>
                            <input type="password" placeholder="123" className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none" required />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={processing}
                        className={`w-full py-3 rounded-lg text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${processing ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
                    >
                        {processing ? "Processing..." : `Pay RM ${amount.toFixed(2)}`}
                    </button>
                </form>
                <p className="text-center text-xs text-gray-400 mt-4">🔒 Encrypted with 256-bit SSL</p>
            </div>
        </div>
    );
};

// --- 3. LOADING BUTTON ---
const LoadingButton = ({ onClick, isLoading, text, className, type = "button" }) => (
    <button type={type} onClick={onClick} disabled={isLoading} className={`${className} flex justify-center items-center transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
        {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        ) : null}
        {isLoading ? "Processing..." : text}
    </button>
);

// --- 4. AVATAR COMPONENT ---
const UserAvatar = ({ seed, className }) => (
    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`} alt="avatar" className={`rounded-full border-2 border-white shadow-sm ${className}`} />
);

// --- 5. THEME TOGGLE ---
const ThemeToggle = ({ isDark, toggleTheme }) => (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 dark:text-yellow-300 hover:bg-white/30 transition-all shadow-lg">
        {isDark ? "☀️" : "🌙"}
    </button>
);

/* ==========================================
   SECTION 3: PAGE COMPONENTS
   ========================================== */

// --- PAGE: LOGIN ---
const LoginPage = ({ onLogin, onSignup, existingUsers, isDark, toggleTheme, showToast }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("client");
    const [specialization, setSpecialization] = useState("Web Development");

    const handleReset = () => { if(confirm("⚠ RESET SYSTEM?")) { localStorage.clear(); window.location.reload(); } };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (isRegistering) {
                if (username && password && fullName && phone) {
                    if (existingUsers.find(u => u.username === username)) {
                        showToast("Username already taken", "error"); setIsLoading(false); return;
                    }
                    onSignup({ name: fullName, username, password, email, phone, type: userType, rating: "5.0", specialization: userType === 'freelancer' ? specialization : null });
                    showToast("Account Created Successfully!", "success");
                } else showToast("Please fill all fields", "error");
            } else {
                const foundUser = existingUsers.find(u => u.username === username && u.password === password);
                if (foundUser) { onLogin(foundUser); showToast(`Welcome back, ${foundUser.name}!`, "success"); } 
                else showToast("Invalid Credentials", "error");
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="absolute top-5 right-5"><ThemeToggle isDark={isDark} toggleTheme={toggleTheme} /></div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in border border-white/20">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">GigLink</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{isRegistering ? "Join the Future of Work" : "Access Your Dashboard"}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none transition" required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none transition" required />
                    
                    {isRegistering && (
                        <div className="space-y-4 animate-fade-in">
                            <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600" required />
                            <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600" required />
                            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600" required />
                            <select value={userType} onChange={e => setUserType(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600">
                                <option value="client">Client (Hire)</option><option value="freelancer">Freelancer (Work)</option>
                            </select>
                            {userType === 'freelancer' && (
                                <select value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600">
                                    <option value="Web Development">Web Development</option><option value="Graphic Design">Graphic Design</option><option value="Content Writing">Content Writing</option>
                                </select>
                            )}
                        </div>
                    )}
                    <LoadingButton type="submit" isLoading={isLoading} text={isRegistering ? "Create Account" : "Login"} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-bold shadow-lg transform transition hover:-translate-y-0.5" />
                </form>

                <div className="mt-6 text-center">
                    <button onClick={() => setIsRegistering(!isRegistering)} className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                        {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                    </button>
                </div>
                {!isRegistering && (
                    <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-xs text-center text-gray-500 dark:text-gray-400">
                        <p className="font-bold mb-1">Demo Credentials:</p>
                        <p>User: <span className="font-mono bg-gray-200 dark:bg-gray-600 px-1 rounded">client1</span> Pass: <span className="font-mono bg-gray-200 dark:bg-gray-600 px-1 rounded">123</span></p>
                        <p className="mt-1">User: <span className="font-mono bg-gray-200 dark:bg-gray-600 px-1 rounded">john</span> Pass: <span className="font-mono bg-gray-200 dark:bg-gray-600 px-1 rounded">123</span></p>
                    </div>
                )}
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
                    <button onClick={handleReset} className="text-xs text-red-400 hover:text-red-600 transition-colors">⚠ Reset Database</button>
                </div>
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
        <div className="max-w-3xl mx-auto p-6 animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Profile Settings</h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
                    <UserAvatar seed={formData.username} className="h-28 w-28 md:mr-6 mb-4 md:mb-0" />
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold dark:text-white">{formData.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium capitalize flex items-center justify-center md:justify-start">
                           <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs uppercase tracking-wider">{formData.type}</span>
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                            <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none" />
                    </div>
                    <LoadingButton type="submit" isLoading={isLoading} text="Save Changes" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold shadow-md" />
                </form>
            </div>
        </div>
    );
};

// --- PAGE: DIRECTORY ---
const FreelancerListPage = ({ freelancers, onDirectHire }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filtered = freelancers.filter(fl => fl.name.toLowerCase().includes(searchTerm.toLowerCase()) || fl.specialization.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="max-w-7xl mx-auto p-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Explore Talent</h2>
                <div className="relative w-full md:w-72">
                    <input type="text" placeholder="Search by name or skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 p-3 rounded-full border dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 ring-blue-500 outline-none" />
                    <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((fl, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        <div className="p-6 text-center">
                            <UserAvatar seed={fl.name} className="h-24 w-24 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{fl.name}</h3>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{fl.specialization}</p>
                            <div className="flex justify-center items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 py-2 rounded-lg mb-4">
                                <span className="text-yellow-500 text-lg">⭐ {fl.rating}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-xs text-green-500 font-bold uppercase tracking-wide">Verified Pro</span>
                            </div>
                            <button onClick={() => onDirectHire(fl)} className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center">
                                Hire Talent <span className="ml-2">🚀</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PAGE: INBOX (UPDATED: New Messages at Top + WhatsApp Pretext) ---
const InboxPage = ({ messages, onPaymentRequest, showToast }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Messages</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden min-h-[400px] border border-gray-100 dark:border-gray-700">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
                        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-4 text-4xl">📭</div>
                        <p className="text-lg font-medium">No messages yet.</p>
                        <p className="text-sm">Notifications and chats will appear here.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                        {messages.map((msg) => (
                            <li key={msg.id} className="p-6 hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center">
                                        <div className={`h-2 w-2 rounded-full mr-3 ${msg.isPaid ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                        <span className="font-bold text-gray-800 dark:text-white text-lg">{msg.title}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{new Date(msg.id).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 ml-5 leading-relaxed">{msg.text}</p>
                                {msg.isActionable && (
                                    <div className="ml-5 flex flex-wrap gap-3">
                                        {/* WHATSAPP WITH PRE-FILLED MESSAGE */}
                                        <a 
                                            href={`https://wa.me/${msg.freelancerPhone ? msg.freelancerPhone.replace(/\D/g,'') : ''}?text=${encodeURIComponent(`Hi, I'm contacting you regarding the job: ${msg.jobTitle}.`)}`} 
                                            target="_blank" 
                                            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-105 font-medium"
                                        >
                                            <span className="mr-2 text-lg">💬</span> Chat on WhatsApp
                                        </a>
                                        
                                        {!msg.isPaid ? (
                                            <button 
                                                onClick={() => onPaymentRequest(msg)} 
                                                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-105 font-medium"
                                            >
                                                <span className="mr-2 text-lg">💳</span> Pay RM {msg.amount.toFixed(2)}
                                            </button>
                                        ) : (
                                            <span className="flex items-center text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 font-bold px-5 py-2.5 rounded-lg border border-green-200 dark:border-green-800 cursor-default">
                                                ✅ Payment Verified
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
        <div className="max-w-5xl mx-auto p-6 animate-fade-in">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
                    <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Active Jobs</p>
                    <p className="text-4xl font-extrabold mt-1">{myJobs.length}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-6 rounded-2xl shadow-lg text-white">
                    <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Total Value</p>
                    <p className="text-4xl font-extrabold mt-1">RM {totalSpent.toFixed(2)}</p>
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Create New Project</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Service Type</label>
                            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none">
                                <option value="web">Web Development</option><option value="design">Graphic Design</option><option value="content">Content Writing</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Complexity</label>
                            <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none">
                                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Duration Estimate</label>
                            <span className="text-blue-600 dark:text-blue-400 font-bold">{hours} Hours</span>
                        </div>
                        <input type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    </div>
                    <div>
                         <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Project Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your project requirements in detail..." className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 ring-blue-500 outline-none h-32 resize-none"></textarea>
                    </div>
                </div>

                <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-8 rounded-2xl shadow-xl flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-xl font-bold opacity-90">Estimated Cost</h3>
                        <p className="text-5xl font-extrabold mt-4">RM {price.toFixed(2)}</p>
                        <p className="text-sm opacity-60 mt-2">Includes service fees & taxes</p>
                        <div className="mt-8 space-y-2 text-sm opacity-80">
                            <div className="flex justify-between"><span>Base Rate:</span><span>Standard</span></div>
                            <div className="flex justify-between"><span>Duration:</span><span>{hours} Hrs</span></div>
                            <div className="flex justify-between"><span>Support:</span><span>24/7</span></div>
                        </div>
                    </div>
                    <LoadingButton onClick={handleBooking} isLoading={isLoading} text="Post Job Now" className="w-full bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 font-bold py-4 rounded-xl mt-8 text-lg shadow-lg" />
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
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
                    <p className="text-purple-100 text-sm font-medium uppercase tracking-wider">Jobs Accepted</p>
                    <p className="text-4xl font-extrabold mt-1">{myWork.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-6 rounded-2xl shadow-lg text-white">
                    <p className="text-green-100 text-sm font-medium uppercase tracking-wider">Total Earnings</p>
                    <p className="text-4xl font-extrabold mt-1">RM {earnings.toFixed(2)}</p>
                </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Available Opportunities</h2>
            {availableJobs.length === 0 ? (
                <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                    <div className="text-6xl mb-4">🔭</div>
                    <p className="text-xl font-medium text-gray-600 dark:text-gray-300">No open jobs found.</p>
                    <p className="text-gray-500">Check back later for new opportunities!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {availableJobs.map(job => (
                        <div key={job.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">{job.service}</div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{job.service}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Posted by <span className="font-semibold text-gray-700 dark:text-gray-200">{job.postedBy}</span></p>
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-6">
                                <p className="text-gray-600 dark:text-gray-300 italic">"{job.description}"</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Payout</p>
                                    <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">RM {job.total.toFixed(2)}</p>
                                </div>
                                <LoadingButton onClick={() => handleAccept(job.id)} isLoading={acceptingId === job.id} text="Accept Job" className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 shadow-md" />
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
    const [toast, setToast] = useState(null);
    
    // --- PAYMENT MODAL STATE ---
    const [paymentModal, setPaymentModal] = useState({ isOpen: false, msg: null });

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

    // --- FREELANCER ACCEPTS JOB ---
    const handleAcceptJob = (jobId, freelancerUser) => {
        const updatedJobs = jobs.map(job => job.id === jobId ? { ...job, status: 'Accepted', acceptedBy: freelancerUser.name } : job);
        setJobs(updatedJobs);
        const acceptedJob = jobs.find(job => job.id === jobId);
        
        const newMessage = {
            id: Date.now(), toUser: acceptedJob.postedBy, title: "Job Accepted!",
            text: `Freelancer ${freelancerUser.name} has accepted your "${acceptedJob.service}" project.`,
            isActionable: true, isPaid: false, freelancerPhone: freelancerUser.phone, amount: acceptedJob.total, 
            jobId: acceptedJob.id, jobTitle: acceptedJob.service, freelancerName: freelancerUser.name
        };
        // UPDATED: Prepend to top
        setMessages([newMessage, ...messages]);
    };

    // --- PAYMENT HANDLING ---
    const openPaymentModal = (msg) => {
        setPaymentModal({ isOpen: true, msg });
    };

    const confirmPayment = () => {
        const { msg } = paymentModal;
        
        // 1. Update Message Status (Paid)
        const updatedMessages = messages.map(m => m.id === msg.id ? { ...m, isPaid: true } : m);
        
        // 2. Create Notification for Freelancer (UPDATED)
        const freelancerNotification = {
            id: Date.now(),
            toUser: msg.freelancerName, // This assumes Freelancer username is their name (demo logic). In real app use IDs.
            // Note: Since our user object saves username as 'john' but name as 'John Doe', we need to match carefully.
            // For this demo, we'll try to match by finding the user in 'users' array or just sending to 'freelancerName' if we used that as ID.
            // Let's rely on the fact that we can just create the message. We'll adjust Inbox to show messages where toUser === username OR toUser === name.
            title: "Payment Received! 💰",
            text: `You have received a payment of RM ${msg.amount.toFixed(2)} for the project: ${msg.jobTitle}.`,
            isActionable: false
        };

        // Prepend Notification + Updated List
        setMessages([freelancerNotification, ...updatedMessages]);
        
        setPaymentModal({ isOpen: false, msg: null });
        showToast("Payment Successful! Receipt Sent.", "success");
    };

    // Filter messages: Check if msg.toUser matches current user's username OR name (to handle loose demo linking)
    const myMessages = user ? messages.filter(m => m.toUser === user.username || m.toUser === user.name) : [];

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white" : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"}`}>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
                
                {/* PAYMENT MODAL */}
                <PaymentModal 
                    isOpen={paymentModal.isOpen} 
                    onClose={() => setPaymentModal({ isOpen: false, msg: null })} 
                    onConfirm={confirmPayment} 
                    amount={paymentModal.msg?.amount || 0}
                    recipient={paymentModal.msg?.freelancerName || "Freelancer"}
                />

                {user && (
                    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mr-8 cursor-pointer" onClick={() => setPage('client-home')}>GigLink</div>
                                <button onClick={() => setPage(user.type === 'client' ? 'client-home' : 'freelancer-home')} className="text-sm font-bold hover:text-blue-500 mr-6 transition">Home</button>
                                {user.type === 'client' && <button onClick={() => setPage('freelancer-list')} className="text-sm font-bold hover:text-blue-500 mr-6 transition">Freelancers</button>}
                                <button onClick={() => setPage('inbox')} className="text-sm font-bold hover:text-blue-500 flex items-center mr-6 transition">
                                    Inbox {myMessages.length > 0 && <span className="ml-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">{myMessages.length}</span>}
                                </button>
                                <button onClick={() => setPage('profile')} className="text-sm font-bold hover:text-blue-500 transition">Profile</button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
                                <div className="flex items-center pl-4 border-l border-gray-300 dark:border-gray-600">
                                    <UserAvatar seed={user.username} className="h-9 w-9 mr-3" />
                                    <span className="text-sm font-bold capitalize mr-4 hidden md:block">{user.name}</span>
                                    <button onClick={handleLogout} className="text-xs font-bold text-red-500 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 px-3 py-1.5 rounded-lg hover:bg-red-100 transition">Log Out</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                )}

                <div className="pt-6">
                    {page === 'login' && <LoginPage onLogin={handleLogin} onSignup={handleSignup} existingUsers={users} isDark={isDarkMode} toggleTheme={toggleTheme} showToast={showToast} />}
                    {page === 'profile' && <ProfilePage user={user} onUpdateProfile={setUser} showToast={showToast} />}
                    {page === 'client-home' && <ClientPage user={user} onOrderCreate={handleOrderCreate} initialData={directHireData} jobs={jobs} showToast={showToast} />}
                    {page === 'freelancer-list' && <FreelancerListPage freelancers={allFreelancers} onDirectHire={handleDirectHire} />}
                    {page === 'inbox' && <InboxPage messages={myMessages} onPaymentRequest={openPaymentModal} showToast={showToast} />}
                    {page === 'freelancer-home' && <FreelancerPage jobs={jobs} onAcceptJob={handleAcceptJob} user={user} showToast={showToast} />}
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
