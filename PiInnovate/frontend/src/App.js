import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/variables.css';
import './assets/css/hero.css';
import './assets/css/header.css';
import './assets/css/footer.css';
import './assets/css/home.css';
import './assets/css/services.css';
import './assets/css/blog.css';
import './App.css';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './components/home/HomePage';
import ServicesPage from './components/services/ServicesPage';
import ServiceDetailPage from './components/services/ServiceDetailPage';
import TeamPage from './components/team/TeamPage';
import ContactPage from './components/contact/ContactPage';
import BlogPage from './components/blog/BlogPage';
import BlogPostPage from './components/blog/BlogPostPage';

// Note: We'll add more page imports as we develop them

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Add more routes as we create the components */}
              {/* 
              <Route path="/team/:id" element={<TeamMemberPage />} />
              <Route path="/blog/category/:category" element={<BlogCategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              */}
              
              {/* Not Found Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
