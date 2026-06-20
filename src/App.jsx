import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaPhone, 
  FaDownload, 
  FaExternalLinkAlt, 
  FaAward, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaCode, 
  FaServer, 
  FaBrain, 
  FaCloud, 
  FaChevronUp, 
  FaBars, 
  FaTimes, 
  FaCalendarAlt, 
  FaLightbulb, 
  FaCheckCircle, 
  FaSpinner, 
  FaTrophy, 
  FaHandshake, 
  FaMicrophone, 
  FaLaptopCode, 
  FaBookReader, 
  FaGraduationCap, 
  FaAtom 
} from 'react-icons/fa';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form states
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Simple scrollspy to track active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'community', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.warn("VITE_WEB3FORMS_ACCESS_KEY environment variable is missing. Set it in .env to send actual emails.");
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey || "1b1b17b6-45e1-4efa-b7cb-ba43e6994e7e",
          name: formState.name,
          email: formState.email,
          company: formState.company || "N/A",
          message: formState.message,
          subject: `Portfolio Contact from ${formState.name}`,
          from_name: "Portfolio Website"
        })
      });

      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        setFormState({ name: '', email: '', company: '', message: '' });
      } else {
        setFormStatus('error');
        console.error("Web3Forms error:", data.message || data);
      }
    } catch (err) {
      setFormStatus('error');
      console.error("Connection error:", err);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const skillsData = [
    {
      title: 'Languages',
      icon: <FaCode className="text-blue-500 text-3xl mb-4" />,
      items: ['Python', 'Java', 'C', 'JavaScript', 'HTML & CSS'],
      color: 'border-blue-500/20 hover:border-blue-500/50'
    },
    {
      title: 'Full-Stack Web Dev',
      icon: <FaServer className="text-emerald-500 text-3xl mb-4" />,
      items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'Auth (JWT)'],
      color: 'border-emerald-500/20 hover:border-emerald-500/50'
    },
    {
      title: 'AI/ML Foundations',
      icon: <FaBrain className="text-indigo-500 text-3xl mb-4" />,
      items: ['Streamlit', 'LangChain', 'Groq API', 'FAISS Vector Indexing', 'HuggingFace Embeddings', 'NumPy', 'Pandas', 'Matplotlib'],
      color: 'border-indigo-500/20 hover:border-indigo-500/50'
    },
    {
      title: 'Tools & Core Concepts',
      icon: <FaCloud className="text-sky-500 text-3xl mb-4" />,
      items: ['Git & GitHub', 'VS Code IDE', 'Data Structures & Algorithms', 'Object-Oriented Programming (OOP)'],
      color: 'border-sky-500/20 hover:border-sky-500/50'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 mesh-gradient">
      
      {/* ── NAVBAR ────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors duration-300">
                Aathira A S<span className="text-blue-500 font-sans"></span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' },
                { id: 'community', label: 'Community' },
                { id: 'contact', label: 'Contact' }
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-xs lg:text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                    activeSection === sec.id ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
              <a
                href="/Aathira%20A%20S%20-%20Resume.pdf"
                download="Aathira A S - Resume.pdf"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-blue-500 hover:bg-blue-400 rounded transition-all duration-300 shadow-md shadow-blue-500/25"
              >
                <FaDownload className="mr-2 text-[10px]" /> Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-white p-2 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-900/95 border-b border-slate-800"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col items-start">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'education', label: 'Education' },
                  { id: 'community', label: 'Community' },
                  { id: 'contact', label: 'Contact' }
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-sm font-medium tracking-wide uppercase block w-full text-left py-2 border-b border-slate-800/50 ${
                      activeSection === sec.id ? 'text-blue-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
                <a
                  href="/Aathira%20A%20S%20-%20Resume.pdf"
                  download="Aathira A S - Resume.pdf"
                  className="inline-flex w-full items-center justify-center px-4 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-blue-500 rounded shadow-md shadow-blue-500/20"
                >
                  <FaDownload className="mr-2" /> Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Wrap */}
      <main id="main-content" className="pt-20 lg:pt-28">

        {/* ── HERO SECTION ─────────────────────────────────── */}
        <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> AI/ML Research Intern @ DUK
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                  Aathira A S
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 mt-3">
                    Aspiring AI/ML Engineer | BCA (AI & ML) Student
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-light">
                  I’m a BCA student specializing in Artificial Intelligence and Machine Learning at Jain Deemed-to-be University, Kochi, passionate about exploring how technology, innovation, and intelligent systems can be used to solve real-world problems.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  View Projects
                </button>
                <a
                  href="/Aathira%20A%20S%20-%20Resume.pdf"
                  download="Aathira A S - Resume.pdf"
                  className="px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Download Resume
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center space-x-6 pt-4">
                <a 
                  href="https://linkedin.com/in/aathira-a-s" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a 
                  href="https://github.com/aathira-a-s" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a 
                  href="mailto:aathirasagar9@gmail.com" 
                  className="text-slate-400 hover:text-emerald-500 transition-colors duration-300"
                  aria-label="Email"
                >
                  <FaEnvelope size={24} />
                </a>
                <div className="h-px w-16 bg-slate-800"></div>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Let's Connect</span>
              </div>
            </motion.div>

            {/* Right Headshot Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative group">
                {/* Back glowing elements */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                
                {/* Image Frame */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900">
                  <img
                    src="/profile.jpg"
                    alt="Aathira A S"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-60"></div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── ABOUT SECTION ────────────────────────────────── */}
        <section id="about" className="bg-slate-900/30 border-y border-slate-900/50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Label */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="lg:col-span-4"
              >
                <span className="text-xs uppercase tracking-widest text-blue-500 font-bold block mb-2">01 / BIO</span>
                <h2 className="text-3xl font-serif font-bold text-white tracking-tight">About Me</h2>
              </motion.div>

              {/* Right Content */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="lg:col-span-8 space-y-6"
              >
                <h3 className="text-xl font-medium text-slate-200 leading-snug">
                  Exploring how technology, innovation, and intelligent systems can be used to solve real-world problems.
                </h3>
                <p className="text-slate-400 leading-relaxed font-light text-base sm:text-lg">
                  I’m a BCA student specializing in Artificial Intelligence and Machine Learning at Jain Deemed-to-be University, Kochi, passionate about exploring how technology, innovation, and intelligent systems can be used to solve real-world problems. I enjoy learning through practical experience, building projects, collaborating with others, and continuously expanding my technical and creative skill set. 
                </p>
                <p className="text-slate-400 leading-relaxed font-light text-base sm:text-lg">
                  My interests span across Artificial Intelligence, Machine Learning, full-stack development, cloud technologies, and modern software systems. I recently completed a MERN Stack internship at Luminar Technolab, Kochi, gaining hands-on exposure to real-world development workflows, and I'm currently working as an AI/ML Research Intern at the Centre for Digital Transformation and Innovation (CDTI),
Kerala University of Digital Sciences, Innovation and Technology at the Digital University Kerala (DUK, formerly IIITM-K), Trivandrum, to further strengthen my understanding of intelligent systems.
                </p>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-900 mt-6">
                  <div className="flex items-center space-x-3 text-sm text-slate-400">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>Trivandrum, Kerala, India</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-400">
                    <FaBriefcase className="text-emerald-500" />
                    <span>AI/ML Research Intern @ DUK</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── SKILLS MATRIX GRID ────────────────────────────── */}
        <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">02 / CAPABILITIES</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">Skills & Core Competencies</h2>
              <p className="text-sm sm:text-base text-slate-400 font-light">
                Classified proficiencies showing a structured path from system-level software engineering to AI/ML applications.
              </p>
            </div>

            {/* Matrix Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`glass-card glass-card-hover p-6 rounded-xl border ${skill.color}`}
                >
                  <div className="flex items-center justify-between">
                    {skill.icon}
                    <span className="text-[10px] font-bold text-slate-600 font-mono">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 tracking-tight">{skill.title}</h3>
                  <ul className="space-y-2.5">
                    {skill.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-400 font-light">
                        <span className="h-1.5 w-1.5 bg-slate-500 rounded-full mr-2.5"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ── FEATURED PROJECTS ─────────────────────────────── */}
        <section id="projects" className="bg-slate-900/10 border-t border-slate-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-blue-500 font-bold block">03 / CODE</span>
                  <h2 className="text-3xl font-serif font-bold text-white tracking-tight">Featured Engineering Projects</h2>
                </div>
                <p className="text-slate-400 font-light text-sm max-w-md">
                  Solving practical administrative challenges and addressing sustainability goals using modern web stacks and intelligent data systems.
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Project 1 */}
                <motion.article 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-card rounded-2xl overflow-hidden border border-slate-900 hover:border-slate-800 flex flex-col justify-between group"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded">
                        MERN Stack Project
                      </span>
                      <span className="text-xs font-mono text-slate-500">March 2026</span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      Nyvora - ECart
                    </h3>
                    <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed mb-6">
                      Developed a full-stack fashion e-commerce platform using the MERN stack with responsive UI and modern component-based architecture. Implemented shopping cart, wishlist, product catalog, dynamic routing, and state management using React Context API. Scaled frontend modules and RESTful backend integration.
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'React Context API'].map((badge) => (
                        <span key={badge} className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-slate-900 bg-slate-950/40 p-6 flex items-center justify-between">
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span> Production Style
                    </span>
                    <div className="flex items-center space-x-4">
                      <a 
                        href="https://github.com/aathira-a-s" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-300"
                      >
                        Source Code
                      </a>
                      <span className="text-slate-700">|</span>
                      <button 
                        onClick={() => alert("Demonstration platform coming soon.")}
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        Live Demo <FaExternalLinkAlt className="ml-1 text-[10px]" />
                      </button>
                    </div>
                  </div>
                </motion.article>

                {/* Project 2 */}
                <motion.article 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden border border-slate-900 hover:border-slate-800 flex flex-col justify-between group"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded">
                        RAG AI & LLMs
                      </span>
                      <span className="text-xs font-mono text-slate-500">June 2026</span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                      NoteBot AI (RAG-based AI ChatBot)
                    </h3>
                    <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed mb-6">
                      Architected a localized Retrieval-Augmented Generation (RAG) platform capable of processing academic PDF documents and generating context-aware, low-latency conversational responses. Developed document chunking pipelines, FAISS similarity retrieval indexing, and integrated Groq-hosted Llama 3.1 8B Instant models inside a customized Neo-Brutalist Streamlit interface.
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['LangChain', 'FAISS', 'HuggingFace Embeddings', 'Groq API', 'Llama 3.1', 'Streamlit UI'].map((badge) => (
                        <span key={badge} className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-slate-900 bg-slate-950/40 p-6 flex items-center justify-between">
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-2"></span> Semantic Chatbot
                    </span>
                    <div className="flex items-center space-x-4">
                      <a 
                        href="https://github.com/aathira-a-s" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-300"
                      >
                        Source Code
                      </a>
                      <span className="text-slate-700">|</span>
                      <button 
                        onClick={() => alert("Verification chatbot demo coming soon.")}
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                      >
                        Live Demo <FaExternalLinkAlt className="ml-1 text-[10px]" />
                      </button>
                    </div>
                  </div>
                </motion.article>

              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 4: PROFESSIONAL EXPERIENCE ──────────────── */}
        <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <span className="text-xs uppercase tracking-widest text-blue-500 font-bold block">04 / WORK</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">Professional Experience</h2>
              <p className="text-slate-400 font-light text-base leading-relaxed">
                Direct hands-on engineering experience within research settings and software development environments.
              </p>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8 relative pl-6 sm:pl-8">
              {/* Timeline Line */}
              <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-[2px] bg-slate-800"></div>

              <div className="space-y-10">
                {/* Role 1: DUK */}
                <motion.div 
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -left-[24px] sm:-left-[28px] top-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="glass-card p-6 rounded-xl hover:border-slate-800 transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold block mb-1">Active Role</span>
                        <h3 className="text-xl font-bold text-white">AI/ML Research Intern</h3>
                        <p className="text-sm text-slate-400 font-light">Digital University of Kerala, Trivandrum</p>
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                        June 2026 — Present
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                      Collaborating on active AI/ML research initiatives, exploring advanced intelligent systems, deep neural nets, and research-driven software technologies.
                    </p>
                  </div>
                </motion.div>

                {/* Role 2: Luminar */}
                <motion.div 
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -left-[24px] sm:-left-[28px] top-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="glass-card p-6 rounded-xl hover:border-slate-800 transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold block mb-1">Completed Internship</span>
                        <h3 className="text-xl font-bold text-white">MERN Stack Intern</h3>
                        <p className="text-sm text-slate-400 font-light">Luminar Technolab, Kochi</p>
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                        March 2026 — May 2026
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                      <li className="flex items-start">
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        <span>Built full-stack web applications using React.js, Node.js, Express.js, and MongoDB.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        <span>Developed RESTful APIs and implemented secure user authentication protocols utilizing JSON Web Tokens (JWT).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        <span>Designed and deployed CRUD-based applications with efficient schema design and database integration.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 5: ACADEMIC EDUCATION ─────────────────── */}
        <section id="education" className="bg-slate-900/30 border-y border-slate-900/50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Header */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold block">05 / ACADEMICS</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">Academic Education</h2>
                <p className="text-slate-400 font-light text-base leading-relaxed">
                  Academic qualifications, highlighting core concentrations in computer applications, informatics, and machine learning.
                </p>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* College */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-lg">
                        <FaGraduationCap />
                      </span>
                      <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded">2025 — Present</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">Bachelor of Computer Applications (BCA)</h3>
                      <p className="text-sm text-indigo-400 font-medium mt-1">Specialization in AI & ML</p>
                      <p className="text-slate-400 font-light text-sm mt-3 leading-relaxed">
                        Jain (Deemed-to-be University), Kochi. Actively focusing on advanced mathematics, statistics, data modeling, and neural network foundations.
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-900 mt-6 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 uppercase">Performance</span>
                    <span className="text-sm font-semibold text-blue-400">CGPA: 9.3 / 10</span>
                  </div>
                </motion.div>

                {/* High School */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-lg">
                        <FaBookReader />
                      </span>
                      <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded">Graduated 2024</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">Higher Secondary Education (CBSE)</h3>
                      <p className="text-sm text-indigo-400 font-medium mt-1">PCB with Informatics Practices</p>
                      <p className="text-slate-400 font-light text-sm mt-3 leading-relaxed">
                        The School of the Good Shepherd, Trivandrum. Acquired foundational skills in programming languages, databases, algorithms, and logical problem solving.
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-900 mt-6 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 uppercase">Performance</span>
                    <span className="text-sm font-semibold text-emerald-400">Grade: 98.4%</span>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 6: TECHNICAL & COMMUNITY IMPACT ───────── */}
        <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">06 / ECOSYSTEM</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">Tech Ecosystem & Community</h2>
              <p className="text-slate-400 font-light text-base leading-relaxed">
                Volunteering, hackathons, presentations, and technical engagements in developer ecosystems.
              </p>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Panel 1: Hackathons */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-slate-900"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="h-8 w-8 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-sm">
                      <FaTrophy />
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">Hackathons</h3>
                  </div>
                  <ul className="space-y-4 text-sm text-slate-400 font-light">
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">Smart India Hackathon (SIH)</strong>
                        <span className="text-slate-400 block leading-relaxed">Secured Second Place at the college/regional level for prototyping and technical execution.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">Tink-her-hack Hackathon</strong>
                        <span className="text-slate-400 block leading-relaxed">Participant in the all-women developer hackathon hosted by Tinkerhub.</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                {/* Panel 2: Leadership & Community */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-6 rounded-xl border border-slate-900"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="h-8 w-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">
                      <FaHandshake />
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">Leadership & Community</h3>
                  </div>
                  <ul className="space-y-4 text-sm text-slate-400 font-light">
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2.5 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">Technology Track Lead</strong>
                        <span className="text-slate-400 block leading-relaxed">Served as Student Coordinator for the Technology Track at The Summit of Future hosted by Jain University.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2.5 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">GDG Women in AI Volunteer</strong>
                        <span className="text-slate-400 block leading-relaxed">Co-organized community initiatives in association with GDG Cloud Kochi. Helped manage event flow and logistics.</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                {/* Panel 3: Speaking & Presentations */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-slate-900 md:col-span-2"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="h-8 w-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                      <FaMicrophone />
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">Speaking & Presentations</h3>
                  </div>
                  <ul className="text-sm text-slate-400 font-light">
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">Guinness World Record Event Speaker</strong>
                        <span className="text-slate-400 block leading-relaxed">Delivered a speech at a Guinness World Record event, speaking about innovation and technological frontiers, demonstrating high-level public presentation skills and clear communication capabilities.</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                {/* Panel 4: Workshops, Masterclasses & Communities */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-slate-900 md:col-span-2"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="h-8 w-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
                      <FaLaptopCode />
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">Workshops, Masterclasses & Communities</h3>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-400 font-light">
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2.5 mt-2.5 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">Demystifying Quantum Computing Masterclass</strong>
                        <span className="text-slate-400 block leading-relaxed">Attended the advanced technical masterclass hosted at The Summit of Future, Jain University.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2.5 mt-2.5 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">CrewAI Signal Workshop (Indian Edition)</strong>
                        <span className="text-slate-400 block leading-relaxed">Attended key agentic AI and multi-agent system builder workshop in Trivandrum.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2.5 mt-2.5 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">Google Antigravity Workshop</strong>
                        <span className="text-slate-400 block leading-relaxed">Participated in specialized developer workshop conducted by ICT Academy of Kerala.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2.5 mt-2.5 flex-shrink-0"></span>
                      <div>
                        <strong className="text-slate-200 font-medium block mb-1">Developer Conferences</strong>
                        <span className="text-slate-400 block leading-relaxed">Regular attendee and contributor at Google Cloud Community Day Kochi and AWS Community Day (AI/ML Edition).</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 7: CONTACT & FOOTER ──────────────────── */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-900">
          <div className="relative rounded-2xl border border-blue-500/20 bg-slate-900/40 p-8 sm:p-12 overflow-hidden recruiter-glow">
            
            {/* Absolute visual grid background */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column Text */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase tracking-widest text-blue-500 font-bold block">07 / CONNECT</span>
                <h2 className="text-3xl font-serif font-bold text-white tracking-tight">Let's Connect</h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  Looking for AI/ML Research opportunities or Full-Stack Engineering roles? Let's build something impactful together.
                </p>
                <div className="pt-4 space-y-3">
                  <p className="text-xs font-mono text-slate-500 flex items-center">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span> Quick Response Target: 24 Hours
                  </p>
                  <p className="text-xs font-mono text-slate-500 flex items-center">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-2"></span> Open to Relocation & Remote Work
                  </p>
                  <p className="text-xs font-mono text-slate-400 flex items-center pt-2">
                    <FaEnvelope className="text-blue-500 mr-2.5" /> <a href="mailto:aathirasagar9@gmail.com" className="hover:text-blue-450 transition-colors">aathirasagar9@gmail.com</a>
                  </p>
                  <p className="text-xs font-mono text-slate-400 flex items-center">
                    <FaPhone className="text-emerald-500 mr-2.5" /> <span>(+91) 9400417817</span>
                  </p>
                </div>
              </div>

              {/* Right Column Form */}
              <div className="lg:col-span-7 bg-slate-950/80 p-6 sm:p-8 rounded-xl border border-slate-900">
                
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <FaCheckCircle className="text-emerald-500 text-5xl mx-auto animate-bounce" />
                    <h3 className="text-xl font-bold text-white">Thank You!</h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto font-light">
                      Your message has been submitted. Aathira will respond to your query at the earliest convenience.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-colors duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-slate-850 text-white rounded px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-300"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="form-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-slate-850 text-white rounded px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-300"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="form-company" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Company Name <span className="text-slate-600">(Optional)</span>
                      </label>
                      <input
                        id="form-company"
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-850 text-white rounded px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-300"
                        placeholder="Name of your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="form-message"
                        name="message"
                        required
                        value={formState.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-slate-900 border border-slate-850 text-white rounded px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
                        placeholder="Hi Aathira, ..."
                      ></textarea>
                    </div>
                    {formStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-light"
                      >
                        * An error occurred while sending your message. Please verify your internet connection or email directly.
                      </motion.div>
                    )}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-blue-500 hover:bg-blue-400 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'sending' ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" /> Submitting Query...
                          </>
                        ) : (
                          'Send Direct Message'
                        )}
                      </button>
                    </div>
                  </form>
                )}

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Left Copyright */}
            <div className="text-slate-500 text-sm font-light text-center md:text-left">
              &copy; {new Date().getFullYear()} Aathira A S. All rights reserved.
            </div>

            {/* Center Quick Scroll */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { id: 'home', label: 'home' },
                { id: 'about', label: 'about' },
                { id: 'skills', label: 'skills' },
                { id: 'projects', label: 'projects' },
                { id: 'experience', label: 'experience' },
                { id: 'education', label: 'education' },
                { id: 'community', label: 'community' },
                { id: 'contact', label: 'contact' }
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Right Social Grid */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com/in/aathira-a-s" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-8 w-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={14} />
              </a>
              <a 
                href="https://github.com/aathira-a-s" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-8 w-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={14} />
              </a>
              <a 
                href="mailto:aathirasagar9@gmail.com" 
                className="h-8 w-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-450 hover:border-emerald-500/30 transition-all duration-300"
                aria-label="Email"
              >
                <FaEnvelope size={14} />
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 h-10 w-10 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 hover:bg-slate-800"
            aria-label="Scroll to top"
          >
            <FaChevronUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
