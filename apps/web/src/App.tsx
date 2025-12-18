import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import WriteLetter from './pages/WriteLetter';
import ContractReview from './pages/ContractReview';
import Profile from './pages/Profile';
import LawyerProfile from './pages/LawyerProfile';
import LawyerFinder from './pages/LawyerFinder';
import FindLawyer from './pages/FindLawyer';
import Chat from './pages/Chat';
import Documents from './pages/Documents';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import HowItWorks from './pages/HowItWorks';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div dir="rtl">
        <Router>
          <a href="#main-content" className="skip-to-main">
            דלג לתוכן הראשי
          </a>
          <div className="d-flex flex-column min-vh-100">
            <AppNavbar />
            <main id="main-content" className="flex-grow-1" tabIndex={-1}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write-letter" element={<WriteLetter />} />
                <Route path="/contract-review" element={<ContractReview />} />
                <Route path="/lawyers" element={<FindLawyer />} />
                <Route path="/lawyers-old" element={<LawyerFinder />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <RequireAuth>
                      <Settings />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <RequireAuth>
                      <AdminPanel />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth role="client">
                      <Profile role="client" userId="client-demo" name="ישראל ישראלי" email="client@example.com" />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile-lawyer"
                  element={
                    <RequireAuth role="lawyer">
                      <Profile
                        role="lawyer"
                        userId="lawyer-demo"
                        name='עו״ד דמו'
                        email="lawyer@example.com"
                        specialization="דיני עבודה, חוזים"
                        region="מרכז"
                      />
                    </RequireAuth>
                  }
                />
                <Route path="/lawyers/:id" element={<LawyerProfile />} />
                <Route
                  path="/chat"
                  element={
                    <RequireAuth>
                      <Chat />
                    </RequireAuth>
                  }
                />
                <Route path="/documents" element={<Documents />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
            <FloatingChatButton />
            <Footer />
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;

