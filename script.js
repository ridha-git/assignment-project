/* ==========================================
   SECTION 1: OOP & DESIGN PATTERNS
   ========================================== */

/**
 * PATTERN 1: STRATEGY PATTERN
 * Used to calculate pricing based on complexity level.
 */
class PricingStrategy {
    calculate(baseRate, hours) {
        throw new Error("Method 'calculate' must be implemented.");
    }
}

class LowComplexityStrategy extends PricingStrategy {
    calculate(baseRate, hours) {
        return baseRate * hours * 1.0; 
    }
}

class MediumComplexityStrategy extends PricingStrategy {
    calculate(baseRate, hours) {
        return baseRate * hours * 1.5; 
    }
}

class HighComplexityStrategy extends PricingStrategy {
    calculate(baseRate, hours) {
        return baseRate * hours * 2.5; 
    }
}

/**
 * PATTERN 2: FACTORY PATTERN
 * Used to create Service objects dynamically.
 */
class ServiceFactory {
    static createService(type) {
        switch (type) {
            case 'web':
                return { name: "Web Development", baseRate: 50, icon: "💻" };
            case 'design':
                return { name: "Graphic Design", baseRate: 40, icon: "🎨" };
            case 'content':
                return { name: "Content Writing", baseRate: 30, icon: "✍️" };
            default:
                return { name: "General Service", baseRate: 20, icon: "🔧" };
        }
    }
}

/**
 * PATTERN 3: OBSERVER PATTERN
 * Used to simulate the Notification System (Email/WhatsApp).
 */
class NotificationService {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class EmailObserver {
    update(data) {
        // CURRENCY UPDATE: Using RM
        return `[EMAIL SENT]: Invoice #${data.id} sent to ${data.email} for RM ${data.total.toFixed(2)}`;
    }
}

class WhatsAppObserver {
    update(data) {
        return `[WHATSAPP SENT]: Hi ${data.user}, your project "${data.service}" is confirmed!`;
    }
}

/* ==========================================
   SECTION 2: REACT COMPONENTS (GUI)
   ========================================== */

const { useState, useEffect } = React;

// --- Component: Dark Mode Toggle Button ---
const ThemeToggle = ({ isDark, toggleTheme }) => (
    <button 
        onClick={toggleTheme} 
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        title="Toggle Dark Mode"
    >
        {isDark ? "☀️" : "🌙"}
    </button>
);

// --- Component: Login Page ---
const LoginPage = ({ onLogin, isDark, toggleTheme }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin(username);
        } else {
            alert("Please enter both username and password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
            {/* Absolute positioning for Theme Toggle on Login Page */}
            <div className="absolute top-5 right-5">
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 animate-fade-in transition-colors duration-300">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">GigLink</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Empowering the Gig Economy (SDG 8 & 9)</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input 
                            type="password" 
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Login to Dashboard
                    </button>
                </form>
                
                <div className="mt-6 flex justify-between text-xs text-gray-400 dark:text-gray-500">
                    <span>SDG 8: Decent Work</span>
                    <span>SDG 9: Innovation</span>
                </div>
            </div>
        </div>
    );
};

// --- Component: Service Calculator Page ---
const CalculatorPage = ({ user, onOrderCreate }) => {
    const [serviceType, setServiceType] = useState('web');
    const [complexity, setComplexity] = useState('low');
    const [hours, setHours] = useState(10);
    const [price, setPrice] = useState(0);

    // Strategy Pattern Implementation
    useEffect(() => {
        const serviceObj = ServiceFactory.createService(serviceType);
        
        let strategy;
        if (complexity === 'low') strategy = new LowComplexityStrategy();
        else if (complexity === 'medium') strategy = new MediumComplexityStrategy();
        else strategy = new HighComplexityStrategy();

        const calculatedPrice = strategy.calculate(serviceObj.baseRate, hours);
        setPrice(calculatedPrice);
    }, [serviceType, complexity, hours]);

    const handleBooking = () => {
        const orderDetails = {
            id: Math.floor(Math.random() * 10000),
            user: user,
            email: `${user}@example.com`,
            service: ServiceFactory.createService(serviceType).name,
            total: price,
            date: new Date().toLocaleDateString()
        };
        onOrderCreate(orderDetails);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Project Estimator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Configuration Panel */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Configure Service</h3>
                    
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-3">Service Type</label>
                    <select 
                        value={serviceType} 
                        onChange={(e) => setServiceType(e.target.value)} 
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded mt-1"
                    >
                        <option value="web">Web Development</option>
                        <option value="design">Graphic Design</option>
                        <option value="content">Content Writing</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-3">Complexity Level</label>
                    <select 
                        value={complexity} 
                        onChange={(e) => setComplexity(e.target.value)} 
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded mt-1"
                    >
                        <option value="low">Standard (Low)</option>
                        <option value="medium">Advanced (Medium)</option>
                        <option value="high">Enterprise (High)</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-3">Estimated Hours: {hours}</label>
                    <input 
                        type="range" min="1" max="100" value={hours} 
                        onChange={(e) => setHours(Number(e.target.value))} 
                        className="w-full mt-2 cursor-pointer"
                    />
                </div>

                {/* Price Display Panel */}
                <div className="bg-blue-900 dark:bg-blue-950 text-white p-6 rounded-lg shadow-md flex flex-col justify-between transition-colors duration-300">
                    <div>
                        <h3 className="text-xl font-bold">Estimated Cost</h3>
                        <p className="text-4xl font-bold mt-2">RM {price.toFixed(2)}</p>
                        <p className="text-sm opacity-75 mt-2">Based on {hours} hours work</p>
                    </div>
                    <button 
                        onClick={handleBooking}
                        className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-3 px-4 rounded mt-4 transition duration-300">
                        Confirm & Book Project
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Component: Dashboard/Notification Page ---
const DashboardPage = ({ order, onReset }) => {
    const [logs, setLogs] = useState([]);

    // Observer Pattern Implementation
    useEffect(() => {
        const notifier = new NotificationService();
        const emailSystem = new EmailObserver();
        const whatsappSystem = new WhatsAppObserver();

        notifier.subscribe(emailSystem);
        notifier.subscribe(whatsappSystem);

        const newLogs = [];
        notifier.observers.forEach(obs => {
            newLogs.push(obs.update(order));
        });
        setLogs(newLogs);
    }, [order]);

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-100 p-4 mb-6 rounded">
                <p className="font-bold">Success!</p>
                <p>Order #{order.id} has been successfully created.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
                <div className="p-6 border-b dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Notification Hub</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time system updates (Observer Pattern)</p>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {logs.map((log, index) => (
                        <li key={index} className="p-4 flex items-start space-x-3">
                            <span className="text-2xl">{log.includes("EMAIL") ? "📧" : "📱"}</span>
                            <div>
                                <p className="text-sm text-gray-900 dark:text-white font-medium">{log.split(':')[0]}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{log.split(':')[1]}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <button 
                onClick={onReset}
                className="mt-6 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
                &larr; Create Another Order
            </button>
        </div>
    );
};

// --- Main App Component ---
const App = () => {
    const [page, setPage] = useState('login');
    const [user, setUser] = useState(null);
    const [lastOrder, setLastOrder] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogin = (username) => {
        setUser(username);
        setPage('calculator');
    };

    const handleLogout = () => {
        setUser(null);
        setPage('login');
        setLastOrder(null);
    };

    const handleOrderCreate = (order) => {
        setLastOrder(order);
        setPage('dashboard');
    };

    const handleReset = () => {
        setLastOrder(null);
        setPage('calculator');
    };

    // 'dark' class is applied to the outer div to trigger Tailwind dark mode
    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                
                {/* Navbar (Only when logged in) */}
                {user && (
                    <nav className="bg-white dark:bg-gray-800 shadow mb-4 transition-colors duration-300">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                            <div className="font-bold text-xl text-blue-600 dark:text-blue-400">GigLink</div>
