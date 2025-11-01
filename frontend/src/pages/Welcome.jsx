import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react'; // Import X for the close button

// --- Embedded CSS for Welcome Page ---
const WelcomeStyles = () => (
    <style>{`
        /* Import Google Font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* Base styles */
        html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
        }

        :root { /* CSS Variables */
         --orange-500: #f97316; --orange-600: #ea580c;
         --owner-primary: #047857; --owner-secondary: #065f46;
         --admin-primary: #374151; --admin-secondary: #1f2937;
         --gray-50: #f9fafb; --gray-100: #f3f4f6; --gray-200: #e5e7eb;
         --gray-600: #4b5563; --gray-700: #374151; --white: #ffffff;
         --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }

        .welcome-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Full viewport height */
            padding: 1.5rem;
            box-sizing: border-box;
            background: linear-gradient(135deg, var(--gray-50) 0%, #e2e8f0 100%);
            text-align: center;
        }

        .welcome-container h1 {
            font-size: 3.5rem; /* Large logo text */
            font-weight: 800;
            color: var(--orange-500);
            margin: 0;
            animation: fadeInDown 0.5s ease-out;
        }

        .welcome-container .tagline {
            font-size: 1.25rem;
            color: var(--gray-600);
            margin-top: 0.5rem;
            margin-bottom: 3rem; /* Space above buttons */
            animation: fadeInUp 0.5s ease-out 0.2s;
            animation-fill-mode: forwards; /* Stay visible */
            opacity: 0;
        }

        .nav-buttons {
            display: flex;
            flex-direction: column; /* MOBILE-FIRST: Stack buttons vertically */
            gap: 1.25rem; /* Space between buttons */
            width: 100%;
            max-width: 350px; /* Limit button width on mobile */
            animation: fadeInUp 0.5s ease-out 0.4s;
            animation-fill-mode: forwards; /* Stay visible */
            opacity: 0;
        }

        .btn {
            display: block;
            padding: 1rem;
            border-radius: 0.5rem;
            font-size: 1.125rem;
            font-weight: 700;
            text-decoration: none;
            text-align: center;
            border: none;
            cursor: pointer;
            width: 100%;
            box-sizing: border-box;
            transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .btn-customer {
            background-color: var(--orange-500);
            color: var(--white);
        }
        .btn-customer:hover {
            background-color: var(--orange-600);
        }

        .btn-owner {
            background-color: var(--owner-primary);
            color: var(--white);
        }
        .btn-owner:hover {
            background-color: var(--owner-secondary);
        }

        .btn-admin {
            background-color: var(--admin-primary);
            color: var(--white);
        }
        .btn-admin:hover {
            background-color: var(--admin-secondary);
        }
        
        /* --- NEW BUTTON STYLE --- */
        .btn-credentials {
            background-color: transparent;
            color: var(--gray-700);
            border: 2px solid var(--gray-700);
            margin-top: 1.5rem; /* Space it from the main buttons */
            width: 100%;
            max-width: 350px;
            padding: 0.75rem 1rem;
            font-weight: 600;
            animation: fadeInUp 0.5s ease-out 0.6s;
            animation-fill-mode: forwards; /* Stay visible */
            opacity: 0;
        }
        .btn-credentials:hover {
             background-color: var(--gray-700);
             color: var(--white);
        }

        /* --- THE RESPONSIVE PART --- */
        @media (min-width: 768px) {
            .welcome-container h1 {
                font-size: 5rem; /* Even bigger logo on desktop */
            }

            .nav-buttons {
                flex-direction: row; /* DESKTOP: Buttons side-by-side */
                max-width: none; /* Allow container to grow */
                width: auto; /* Fit content */
                gap: 2rem; /* More space on desktop */
            }
            
            .btn {
                width: 200px; /* Give buttons a fixed width on desktop */
            }
            
            .btn-credentials {
                 width: 300px; /* Give fixed width on desktop */
            }
        }
        
        /* Simple keyframe animations */
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* --- NEW MODAL STYLES --- */
        .credentials-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
            padding: 1rem;
            animation: fadeIn 0.3s ease-out;
        }
        .credentials-card {
            background: var(--white);
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: var(--shadow-lg);
            width: 100%;
            max-width: 400px;
            animation: fadeInDown 0.3s ease-out;
        }
        .credentials-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--gray-200);
            padding-bottom: 1rem;
            margin-bottom: 1rem;
        }
        .credentials-header h3 {
            font-size: 1.25rem;
            color: var(--gray-800);
            margin: 0;
        }
        .close-btn {
            background: none;
            border: none;
            color: var(--gray-400);
            cursor: pointer;
            padding: 0.25rem;
            line-height: 1;
        }
        .close-btn:hover {
            color: var(--gray-700);
        }
        .credentials-body {
            text-align: left;
        }
        .credentials-body ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .credentials-body li {
            margin-bottom: 1.25rem;
        }
        .credentials-body h4 {
            margin: 0 0 0.25rem 0;
            color: var(--gray-700);
            font-size: 1.1rem;
        }
        .credentials-body p {
            margin: 0;
            color: var(--gray-600);
            font-size: 0.95rem;
        }
        .credentials-body code {
            background-color: var(--gray-100);
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            color: var(--gray-800);
            font-family: monospace;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `}</style>
);


function Welcome() {
  const [showCredentials, setShowCredentials] = useState(false);

  return (
    <>
      <WelcomeStyles /> {/* Add the styles */}
      <div className="welcome-container">
        <h1>READY GO</h1>
        <p className="tagline">Your Adventure Awaits. Rent a Vehicle Today.</p>
        <nav className="nav-buttons">
          <Link to="/customer-login" className="btn btn-customer">I'm a Customer</Link>
          <Link to="/owner-login" className="btn btn-owner">I'm an Owner</Link>
          <Link to="/admin-login" className="btn btn-admin">Login as Admin</Link>
        </nav>

        {/* --- NEW BUTTON --- */}
        <button onClick={() => setShowCredentials(true)} className="btn btn-credentials">
            Show Test Credentials
        </button>
      </div>

      {/* --- NEW MODAL --- */}
      {showCredentials && (
        <div className="credentials-modal-overlay" onClick={() => setShowCredentials(false)}>
            <div className="credentials-card" onClick={(e) => e.stopPropagation()}>
                <div className="credentials-header">
                    <h3>Test Credentials</h3>
                    <button onClick={() => setShowCredentials(false)} className="close-btn">
                        <X size={24} />
                    </button>
                </div>
                <div className="credentials-body">
                    <ul>
                        <li>
                            <h4>Customer Dashboard</h4>
                            <p>Email: <code>cus1@gmail.com</code></p>
                            <p>Password: <code>123</code></p>
                        </li>
                        <li>
                            <h4>Owner Dashboard</h4>
                            <p>Email: <code>own1@gmail.com</code></p>
                            <p>Password: <code>123</code></p>
                        </li>
                        <li>
                            <h4>Admin Dashboard</h4>
                            <p>Email: <code>admin@readygo.com</code></p>
                            <p>Password: <code>123</code></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      )}
    </>
  );
}

export default Welcome;
