import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for each section to handle scrolling
  const heroRef = useRef(null);
  const rulesRef = useRef(null);
  const galleryRef = useRef(null);
  const evaluationRef = useRef(null);

  const sections = [
    { name: 'Hero', ref: heroRef, id: 'hero' },
    { name: 'Rules', ref: rulesRef, id: 'rules' },
    { name: 'Gallery', ref: galleryRef, id: 'gallery' },
    { name: 'Evaluation Form', ref: evaluationRef, id: 'evaluation' },
  ];

  // Logic to handle smooth scrolling
  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 70, // Adjust for sticky navbar height
      behavior: 'smooth',
    });
    setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
  };

  // Logic to update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset;
      let newActiveSection = '';

      sections.forEach(section => {
        const sectionEl = section.ref.current;
        if (sectionEl) {
          const { offsetTop, offsetHeight } = sectionEl;
          const sectionTop = offsetTop - 100; // Offset to activate a bit earlier
          if (pageYOffset >= sectionTop && pageYOffset < sectionTop + offsetHeight) {
            newActiveSection = section.id;
          }
        }
      });
      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Mock data for the gallery and carousel
  const carouselPhotos = [
    'https://placehold.co/800x600/FF5555/FFFFFF?text=Marching+Band+1',
    'https://placehold.co/800x600/FFFFFF/FF5555?text=Performance',
    'https://placehold.co/800x600/FF5555/FFFFFF?text=Team+Spirit',
    'https://placehold.co/800x600/FFFFFF/FF5555?text=Trophy+Moment',
    'https://placehold.co/800x600/FF5555/FFFFFF?text=Practice',
  ];

  const galleryPhotos = [
    'https://placehold.co/600x400/FF6666/FFFFFF?text=Image+A',
    'https://placehold.co/600x400/FFFFFF/FF6666?text=Image+B',
    'https://placehold.co/600x400/FF6666/FFFFFF?text=Image+C',
    'https://placehold.co/600x400/FFFFFF/FF6666?text=Image+D',
    'https://placehold.co/600x400/FF6666/FFFFFF?text=Image+E',
    'https://placehold.co/600x400/FFFFFF/FF6666?text=Image+F',
  ];

  const rules = [
    'Semua peserta harus tiba 1 jam sebelum jadwal penampilan.',
    'Durasi penampilan maksimal 15 menit, termasuk persiapan.',
    'Penggunaan alat peraga di luar alat musik standar tidak diizinkan.',
    'Pakaian seragam lengkap adalah wajib untuk semua anggota tim.',
    'Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat.',
  ];

  return (
    <div className="bg-gray-100 font-sans text-gray-800">
      <style>{`
        html {
          scroll-padding-top: 70px; /* Offset for the fixed header */
        }
      `}</style>
      
      {/* Sticky Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-red-600 shadow-lg transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-wide">
            Marching Fest
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-white">
            <li className={`nav-link ${activeSection === 'hero' ? 'text-white font-bold' : 'text-gray-200'}`} onClick={() => scrollToSection(heroRef)}>
              Hero
            </li>
            <li className={`nav-link ${activeSection === 'rules' ? 'text-white font-bold' : 'text-gray-200'}`} onClick={() => scrollToSection(rulesRef)}>
              Rules
            </li>
            <li className={`nav-link ${activeSection === 'gallery' ? 'text-white font-bold' : 'text-gray-200'}`} onClick={() => scrollToSection(galleryRef)}>
              Gallery
            </li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-red-700 py-4">
            <ul className="flex flex-col items-center space-y-4 text-white">
              <li className="nav-link w-full text-center" onClick={() => scrollToSection(heroRef)}>Hero</li>
              <li className="nav-link w-full text-center" onClick={() => scrollToSection(rulesRef)}>Rules</li>
              <li className="nav-link w-full text-center" onClick={() => scrollToSection(galleryRef)}>Gallery</li>
              <li className="nav-link w-full text-center">
                <a href="https://forms.gle/YOUR_FORM_LINK_HERE" target="_blank" rel="noopener noreferrer">
                  Evaluation Form
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="bg-red-600 text-white pt-24 pb-12 sm:pt-32 sm:pb-20 text-center rounded-b-3xl shadow-xl">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight animate-fade-in-up">
            National Marching Band Competition
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Jadilah bagian dari semangat, melodi, dan kebanggaan dalam kompetisi marching band paling bergengsi tahun ini!
          </p>
        </div>
      </section>

      {/* Participant Photo Carousel */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Momen Penuh Semangat</h2>
          <div className="flex space-x-4 overflow-x-auto snap-x-mandatory scroll-smooth p-4 hide-scrollbar">
            {carouselPhotos.map((photo, index) => (
              <div key={index} className="flex-none w-64 md:w-80 h-48 snap-center rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <img src={photo} alt={`Participant ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section ref={rulesRef} id="rules" className="py-16 bg-white shadow-inner">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Peraturan Kompetisi</h2>
            <ul className="space-y-4 text-lg list-disc list-inside">
              {rules.map((rule, index) => (
                <li key={index} className="bg-red-50 p-4 rounded-lg shadow-sm border-l-4 border-red-500 transition-all duration-300 hover:bg-red-100 transform hover:scale-105">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Responsive Gallery Grid */}
      <section ref={galleryRef} id="gallery" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Galeri Acara</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                <img src={photo} alt={`Gallery Image ${index + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Floating Evaluation Form Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://forms.gle/YOUR_FORM_LINK_HERE" 
          target="_blank" 
          rel="noopener noreferrer"
          ref={evaluationRef}
          className="bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl hover:bg-red-800 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Formulir Evaluasi
        </a>
      </div>

    </div>
  );
};

export default App;
