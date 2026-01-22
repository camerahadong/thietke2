import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Leaderboard from './pages/Leaderboard';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Rules from './pages/Rules';
import Partners from './pages/Partners';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Challenges from './pages/Challenges';
import ChallengeDetail from './pages/ChallengeDetail';
import { USERS, BLOG_POSTS, CHALLENGES } from './constants';
import { User, BlogPost } from './types';

const App: React.FC = () => {
  // Router state
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  
  // Mock Auth state
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    // Simulate Login
    setTimeout(() => {
       setUser(USERS[0]); // Log in as "Minh Nguyen"
       setCurrentPage('home');
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const navigateTo = (page: string, params?: any) => {
    window.scrollTo(0, 0);
    if (page === 'blog-detail' && params?.id) {
        setSelectedPostId(params.id);
    }
    if (page === 'challenge-detail' && params?.id) {
        setSelectedChallengeId(params.id);
    }
    setCurrentPage(page);
  };

  // Pages that don't use the Main Layout (Auth pages, 404)
  if (currentPage === 'login') return <Login onNavigate={navigateTo} onLogin={handleLogin} />;
  if (currentPage === 'register') return <Register onNavigate={navigateTo} />;
  if (currentPage === 'forgot-password') return <ForgotPassword onNavigate={navigateTo} />;
  if (currentPage === '404') return <NotFound onNavigate={navigateTo} />;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onJoin={() => navigateTo('register')} onNavigate={navigateTo} />;
      case 'activities':
        return <Activities onJoin={() => navigateTo('register')} onNavigate={navigateTo} />;
      case 'challenges':
        return <Challenges onNavigate={navigateTo} />;
      case 'challenge-detail':
        const challenge = CHALLENGES.find(c => c.id === selectedChallengeId);
        return challenge ? <ChallengeDetail challenge={challenge} onNavigate={navigateTo} /> : <NotFound onNavigate={navigateTo} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'events':
        return <Events />;
      case 'profile':
        return user ? <Profile user={user} /> : <Login onNavigate={navigateTo} onLogin={handleLogin} />; // Redirect to login if accessing profile
      case 'blog':
        return <Blog onNavigate={navigateTo} />;
      case 'blog-detail':
        const post = BLOG_POSTS.find(p => p.id === selectedPostId);
        return post ? <BlogDetail post={post} onNavigate={navigateTo} /> : <NotFound onNavigate={navigateTo} />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'rules':
        return <Rules />;
      case 'partners':
        return <Partners />;
      default:
        return <NotFound onNavigate={navigateTo} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={navigateTo}
      user={user}
      onLogin={() => navigateTo('login')}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;