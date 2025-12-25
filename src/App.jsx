import { useState, useEffect, useRef } from 'react'
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaExternalLinkAlt, FaJava } from 'react-icons/fa'
import { SiPython, SiCplusplus, SiJavascript, SiFlask, SiGit, SiLinux, SiLatex, SiPandas } from 'react-icons/si'
import { TbLambda, TbBrain, TbWriting, TbChartLine, TbBrandCSharp, TbMusic } from 'react-icons/tb'
import { DiProlog } from 'react-icons/di'
import { HiCode } from 'react-icons/hi'
import { BiCodeCurly } from 'react-icons/bi'
import './App.css'

// Loss Curve Background Component - Shows a training loss curve that generates as user scrolls
function LossCurve() {
  const canvasRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lossPointsRef = useRef(null)

  // Generate loss curve data points once
  useEffect(() => {
    const points = []
    for (let i = 0; i < 200; i++) {
      const t = i / 200
      const baseLoss = 2.5 * Math.exp(-3 * t) + 0.15
      const noise = (Math.random() - 0.5) * 0.15 * (1 - t * 0.7)
      const spike = Math.random() > 0.95 ? Math.random() * 0.1 : 0
      points.push(Math.max(0.1, baseLoss + noise + spike))
    }
    lossPointsRef.current = points
  }, [])

  // Handle scroll and resize
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      // Complete the curve exactly at contact section (100% of scroll)
      const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
      setScrollProgress(progress)
    }

    const handleResize = () => {
      setScrollProgress(prev => prev) // Force re-render
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !lossPointsRef.current) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Clear
    ctx.clearRect(0, 0, width, height)

    const lossPoints = lossPointsRef.current
    const numPointsToDraw = Math.floor(scrollProgress * lossPoints.length) + 15

    // Larger padding to make the graph smaller and fit nicely
    const padding = { 
      top: Math.max(120, height * 0.15), 
      right: Math.max(80, width * 0.1), 
      bottom: Math.max(120, height * 0.15), 
      left: Math.max(120, width * 0.1) 
    }
    const graphWidth = width - padding.left - padding.right
    const graphHeight = height - padding.top - padding.bottom

    if (graphWidth <= 0 || graphHeight <= 0) return

    // Draw axes - more visible
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.35)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    // Labels - brighter
    ctx.fillStyle = 'rgba(0, 212, 255, 0.5)'
    ctx.font = '12px JetBrains Mono, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('epochs', width / 2, height - 35)

    ctx.save()
    ctx.translate(padding.left - 60, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('loss', 0, 0)
    ctx.restore()

    const maxLoss = 2.5

    // Draw loss curve - more subtle
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.shadowColor = 'rgba(0, 212, 255, 0.3)'
    ctx.shadowBlur = 8

    ctx.beginPath()
    for (let i = 0; i < Math.min(numPointsToDraw, lossPoints.length); i++) {
      const x = padding.left + (i / (lossPoints.length - 1)) * graphWidth
      const normalizedLoss = Math.min(1, Math.max(0, lossPoints[i] / maxLoss))
      const y = padding.top + (1 - normalizedLoss) * graphHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
    ctx.shadowBlur = 0

    // Small subtle indicator at current point
    if (numPointsToDraw > 1 && numPointsToDraw <= lossPoints.length) {
      const idx = Math.min(numPointsToDraw - 1, lossPoints.length - 1)
      const x = padding.left + (idx / (lossPoints.length - 1)) * graphWidth
      const normalizedLoss = Math.min(1, Math.max(0, lossPoints[idx] / maxLoss))
      const y = padding.top + (1 - normalizedLoss) * graphHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 212, 255, 0.6)'
      ctx.fill()
    }

    // Title - brighter and more descriptive
    ctx.fillStyle = 'rgba(0, 212, 255, 0.45)'
    ctx.font = '13px JetBrains Mono, monospace'
    ctx.textAlign = 'right'
    ctx.fillText('learning about samson progress', width - padding.right, padding.top - 20)

  }, [scrollProgress])

  // Calculate how much to move the graph up as user scrolls
  const translateY = scrollProgress * window.innerHeight * 0.8

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.4,
        transform: `translateY(-${translateY}px)`,
      }}
    />
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    
    // Track page views in Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: pathname === '/personal' ? 'Personal' : 'Home'
      })
    }
  }, [pathname])
  return null
}

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function Header({ isDark, setIsDark }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(false)
  const isPersonalPage = location.pathname === '/personal'

  const handleNavigation = (path) => {
    // Enable animations only when user clicks navigation
    setAnimationsEnabled(true)
    navigate(path)
    setMobileMenuOpen(false)
  }

  const handleScrollTo = (id) => {
    scrollToSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <TbLambda className="lambda-icon" />
          <span className="logo-text">SR</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile overlay */}
        {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {/* Home button - always visible */}
          <button onClick={() => isPersonalPage ? handleNavigation('/') : handleScrollTo('about')} className="nav-btn nav-home">
            <span className="nav-lambda">λ</span>home
          </button>
          
          {/* Main nav items - collapse from right to left into personal */}
          <div className={`nav-items-main ${isPersonalPage ? 'hidden' : 'visible'} ${animationsEnabled ? '' : 'no-animation'}`}>
            <button onClick={() => handleScrollTo('about')} className="nav-btn"><span className="nav-lambda">λ</span>about</button>
            <button onClick={() => handleScrollTo('education')} className="nav-btn"><span className="nav-lambda">λ</span>education</button>
            <button onClick={() => handleScrollTo('experience')} className="nav-btn"><span className="nav-lambda">λ</span>experience</button>
            <button onClick={() => handleScrollTo('projects')} className="nav-btn"><span className="nav-lambda">λ</span>projects</button>
            <button onClick={() => handleScrollTo('teaching')} className="nav-btn"><span className="nav-lambda">λ</span>teaching</button>
            <button onClick={() => handleScrollTo('skills')} className="nav-btn"><span className="nav-lambda">λ</span>skills</button>
            <button onClick={() => handleScrollTo('contact')} className="nav-btn"><span className="nav-lambda">λ</span>contact</button>
          </div>

          {/* Personal button - always visible, acts as the pivot point */}
          <button 
            onClick={() => isPersonalPage ? handleNavigation('/') : handleNavigation('/personal')} 
            className="nav-btn nav-personal"
          >
            <span className="nav-lambda">λ</span>personal
          </button>

          {/* Personal nav items - expand from left to right out of personal */}
          <div className={`nav-items-personal ${isPersonalPage ? 'visible' : 'hidden'} ${animationsEnabled ? '' : 'no-animation'}`}>
            <button onClick={() => handleScrollTo('interests')} className="nav-btn"><span className="nav-lambda">λ</span>interests</button>
            <button onClick={() => handleScrollTo('music')} className="nav-btn"><span className="nav-lambda">λ</span>music</button>
            <button onClick={() => handleScrollTo('insights')} className="nav-btn"><span className="nav-lambda">λ</span>insights</button>
          </div>
          
          <button 
            className="theme-toggle" 
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </header>
  )
}

function MainPage() {
  const courses = [
    { code: '15-122', name: 'Principles of Imperative Computation' },
    { code: '15-150', name: 'Principles of Functional Programming' },
    { code: '15-151', name: 'Mathematical Foundations of CS' },
    { code: '15-213', name: 'Introduction to Computer Systems' },
    { code: '15-251', name: 'Great Ideas in Theoretical CS' },
    { code: '15-259', name: 'Probability and Computing' },
    { code: '15-317', name: 'Constructive Logic' },
    { code: '15-210', name: 'Parallel & Sequential Data Structures' },
    { code: '15-445', name: 'Database Systems' },
    { code: '07-280', name: 'AI/ML I' },
    { code: '21-242', name: 'Honors Matrix Theory' },
    { code: '21-268', name: 'Multidimensional Calculus' },
    { code: '80-180', name: 'Nature of Language' },
    { code: '80-305', name: 'Game Theory' },
    { code: '05-391', name: 'Designing Human-Centered Software' },
  ]

  return (
    <main>
      {/* ABOUT */}
      <section id="about" className="hero">
        <div className="hero-content">
          <div className="type-annotation">
            <span className="keyword">val</span> samson <span className="colon">:</span> <span className="type">Developer</span>
          </div>
          <h1 className="name">
            <TbLambda className="name-lambda" />
            Samson Rozansky
          </h1>
          <p className="tagline">
            Computer Science @ Carnegie Mellon University
          </p>
          <p className="sub-tagline">
            Machine Learning <span className="operator">{"|->"}</span> Functional Programming <span className="operator">{"|->"}</span> Systems
          </p>
          <div className="hero-links">
            <a href="mailto:samsonrozansky@gmail.com" className="hero-link">
              <FaEnvelope /> samsonrozansky [at] gmail [dot] com
            </a>
            <a href="mailto:srozansk@andrew.cmu.edu" className="hero-link">
              <FaEnvelope /> srozansk [at] andrew [dot] cmu [dot] edu
            </a>
            <a href="https://github.com/samson-rozansky" target="_blank" rel="noopener noreferrer" className="hero-link">
              <FaGithub /> github.com/samson-rozansky
            </a>
            <a href="https://linkedin.com/in/sam-rozansky" target="_blank" rel="noopener noreferrer" className="hero-link">
              <FaLinkedin /> linkedin.com/in/sam-rozansky
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="neural-net">
            <TbBrain className="brain-icon" />
            <div className="nodes">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`node node-${i}`}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <div className="section-header">
          <h2><span className="section-keyword">datatype</span> Education <span className="section-eq">=</span></h2>
        </div>
        <div className="education-card">
          <div className="edu-main">
            <h3>Carnegie Mellon University</h3>
            <span className="edu-location">Pittsburgh, PA</span>
          </div>
          <p className="edu-degree">Bachelor of Science in Computer Science</p>
          <p className="edu-concentration">Concentration in Machine Learning</p>
          <p className="edu-years">2024 - 2028</p>
          <div className="coursework">
            <h4><span className="keyword">type class</span> Coursework <span className="keyword">where</span></h4>
            <div className="course-tags">
              {courses.map(course => (
                <span key={course.code} className="course-tag">
                  <span className="course-code">{course.code}</span>
                  <span className="course-name">{course.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="section-header">
          <h2><span className="section-keyword">fun</span> experience <span className="section-eq">=</span> <span className="section-keyword">fn</span> () <span className="section-arrow">=&gt;</span></h2>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="job-header">
                <h3>Machine Learning Engineering Intern</h3>
                <span className="company">Baxter International</span>
              </div>
              <div className="job-meta">
                <span className="date">May 2025 - August 2025</span>
                <span className="location">Raleigh, NC</span>
              </div>
              <ul className="job-details">
                <li>Indexed over 5000 JIRA issues to create model to find related RCAs for device failures</li>
                <li>Used Flask to develop tool that let engineers create unit tests using Baxter LLM API or local Ollama models</li>
                <li>Processed 15 years of documentation into chunks to store into vector database for employees to use</li>
                <li>Used RAG to speedup information retrieval by 60% improving workflow and decreased communication overhead</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="job-header">
                <h3>Quantitative Analyst Intern</h3>
                <span className="company">Velocity Labs</span>
              </div>
              <div className="job-meta">
                <span className="date">May 2024 - August 2024</span>
                <span className="location">Chapel Hill, NC</span>
              </div>
              <ul className="job-details">
                <li>Implemented Recurrent Neural Networks and Support Vector Machines for predicting stock prices</li>
                <li>Developed interactive Profit and Loss model for analyzing different option spread strategies</li>
                <li>Utilized Tastytrade's WebSockets to stream real-time data using DXLink protocol</li>
                <li>Collaborated with team about methods to predict Implied Volatility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="section-header">
          <h2><span className="section-keyword">val</span> projects <span className="colon">:</span> <span className="type">unit</span> <span className="section-arrow">-&gt;</span> <span className="type">project list</span></h2>
        </div>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-header">
              <h3>Email-lingo</h3>
              <span className="project-date">September 2025</span>
            </div>
            <p className="project-desc">LLM-powered trainer for professional email writing</p>
            <ul className="project-details">
              <li>Built a Flask app with SQL to generate scenarios and evaluate submissions via an Ollama-hosted LLM</li>
              <li>Implemented consistent LLM rubric-based scoring across categories with weighted totals</li>
              <li>Created analytics (trend/bar/radar PNG charts), achievement tracking and kept information persistent</li>
            </ul>
            <div className="project-tech">
              <span>Flask</span>
              <span>SQL</span>
              <span>LLM</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-header">
              <h3>Analyzing Education Retention</h3>
              <span className="project-date">March 2024</span>
            </div>
            <p className="project-desc">Analysis about factors that contribute to dropout rates</p>
            <ul className="project-details">
              <li>Implemented recursive feature removal to see what parts of a student's history are irrelevant</li>
              <li>Ran multiple visualizations including PCA to assist in understanding data</li>
              <li>Applied different distance metrics for hyper-parameter optimization</li>
            </ul>
            <div className="project-tech">
              <span>Python</span>
              <span>PCA</span>
              <span>Data Analysis</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-header">
              <h3>Hunt Institute Datathon</h3>
              <span className="project-date">March 2023</span>
            </div>
            <p className="project-desc">Data Analysis About Sleep</p>
            <ul className="project-details">
              <li>Placed 1st in collegiate division for analyzing NC education system to find improvements</li>
              <li>Developed automated data cleaning pipelines for efficient processing</li>
              <li>Used Tableau to visualize the impact of potential policies about sleep awareness</li>
            </ul>
            <div className="project-tech">
              <span>Tableau</span>
              <span>Data Cleaning</span>
              <span>Visualization</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-header">
              <h3>Circa</h3>
              <span className="project-date">April 2022</span>
            </div>
            <p className="project-desc">Messaging app focused around discovering clubs</p>
            <ul className="project-details">
              <li>Placed second overall in the school-oriented track for NC State Pack-Hacks Hackathon</li>
              <li>Leveraged Git expertise and JavaScript proficiency to develop scalable backend solution</li>
              <li>Implemented a RESTful API to send and delete messages</li>
            </ul>
            <div className="project-tech">
              <span>JavaScript</span>
              <span>REST API</span>
              <span>Git</span>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section id="awards" className="section">
        <div className="section-header">
          <h2><span className="section-keyword">val</span> awards <span className="colon">:</span> <span className="type">achievement list</span> <span className="section-eq">=</span></h2>
        </div>
        <div className="honors-list">
          {[
            { title: "Second place in Carnegie AI Safety x Gray Swan Hackathon", date: "November 2025" },
            { title: "First Place Jane Street GUTS++ Challenge", date: "February 2025" },
            { title: "Second Place ACM@CMU Algorithms With A Purpose challenge", date: "February 2025" },
            { title: "First overall in the world in American Computer Science League", date: "2020 - 2024" },
            { title: "Top 5 in Citadel Securities Quantitative Challenge", date: "September 2024" },
            { title: "First overall in the world Math Kangaroo with perfect score", date: "March 2024" },
            { title: "First Place Hunt Institute Datathon - Collegiate Division", date: "March 2023" },
            { title: "First place in NC State DiamondHacks Hackathon Competition", date: "April 2023" },
            { title: "First place in College of Charleston 40th Annual Programming Competition", date: "February 2023" },
          ].map((honor, i) => (
            <div key={i} className="honor-item">
              <span className="honor-bullet">[</span>
              <span className="honor-title">{honor.title}</span>
              <span className="honor-comma">,</span>
              <span className="honor-date">{honor.date}</span>
              <span className="honor-bullet">]</span>
            </div>
          ))}
        </div>
      </section>

      {/* TEACHING */}
      <section id="teaching" className="section teaching-section">
        <div className="section-header">
          <h2><span className="section-keyword">structure</span> Teaching <span className="colon">:</span> <span className="type">INSTRUCTOR</span> <span className="section-eq">=</span></h2>
        </div>
        <div className="teaching-grid">
          <div className="teaching-card">
            <div className="teaching-header">
              <div className="course-title">
                <h3>98-317: Hype for Types</h3>
                <a href="https://hypefortypes.github.io/" target="_blank" rel="noopener noreferrer" className="course-link">
                  <FaExternalLinkAlt />
        </a>
      </div>
              <span className="course-role">Instructor</span>
            </div>
            <p className="course-institution">Carnegie Mellon University | Pittsburgh, PA | Spring 2026</p>
            <p className="course-description">
              Designed curriculum and taught weekly lectures for undergraduates interested in type theory. 
              Topics covered included Rust's type system, proof assistants, and formal verification. 
              Handled logistics including the course website, homework autograders, and office hours.
            </p>
            <div className="course-topics">
              <h4><span className="keyword">instance</span> Topics <span className="keyword">where</span></h4>
              <div className="topic-tags">
                {['Simply-Typed Lambda Calculus', 'Algebraic Data Types', 'Curry-Howard Isomorphism',
                  'Continuations', 'Substructural Logic', 'Phantom Types', 'Polymorphism',
                  'Parametricity', 'Monads', 'Dependent Types', 'Rust Type System', 'Proof Assistants', 'Formal Verification'].map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="teaching-card">
            <div className="teaching-header">
              <div className="course-title">
                <h3>Math Honor Society</h3>
              </div>
              <span className="course-role">Lecturer</span>
            </div>
            <p className="course-institution">Raleigh, NC | 2020 - 2024</p>
            <p className="course-description">
              Competed in statewide and countrywide math competitions. Presented lectures on topics 
              ranging from Statistics to Algorithms. Tutored topics ranging from Physics and Computer 
              Science to Calculus and Linear Algebra.
            </p>
            <div className="course-topics">
              <h4><span className="keyword">instance</span> Topics <span className="keyword">where</span></h4>
              <div className="topic-tags">
                {['Statistics', 'Algorithms', 'Physics', 'Computer Science', 'Calculus', 'Linear Algebra'].map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="section-header">
          <h2><span className="section-keyword">signature</span> SKILLS <span className="section-eq">=</span> <span className="section-keyword">sig</span></h2>
        </div>
        <div className="skills-grid">
          <div className="skill-category">
            <h4><span className="keyword">val</span> languages <span className="colon">:</span> <span className="type">list</span></h4>
            <div className="skill-items">
              <div className="skill-item"><SiPython /> Python</div>
              <div className="skill-item"><SiCplusplus /> C/C++</div>
              <div className="skill-item"><FaJava /> Java</div>
              <div className="skill-item"><TbBrandCSharp /> C#</div>
              <div className="skill-item"><SiJavascript /> JavaScript</div>
              <div className="skill-item"><TbLambda /> SML/NJ</div>
              <div className="skill-item"><TbLambda /> OCaml</div>
              <div className="skill-item"><BiCodeCurly /> Prolog</div>
            </div>
          </div>
          <div className="skill-category">
            <h4><span className="keyword">val</span> frameworks <span className="colon">:</span> <span className="type">list</span></h4>
            <div className="skill-items">
              <div className="skill-item"><SiPandas /> Pandas</div>
              <div className="skill-item"><HiCode /> BeautifulSoup</div>
              <div className="skill-item"><TbChartLine /> Matplotlib</div>
              <div className="skill-item"><SiFlask /> Flask</div>
            </div>
          </div>
          <div className="skill-category">
            <h4><span className="keyword">val</span> tools <span className="colon">:</span> <span className="type">list</span></h4>
            <div className="skill-items">
              <div className="skill-item"><SiLinux /> Linux</div>
              <div className="skill-item"><SiLatex /> LaTeX</div>
              <div className="skill-item"><SiGit /> Git</div>
              <div className="skill-item"><FaGithub /> GitHub</div>
            </div>
          </div>
        </div>
        <div className="section-end"><span className="section-keyword">end</span></div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <div className="section-header">
          <h2><span className="section-keyword">val</span> contact <span className="colon">:</span> <span className="type">unit</span> <span className="section-arrow">-&gt;</span> <span className="type">connection</span></h2>
        </div>
        <p className="contact-text">
          Good questions have good answers. Feel free to reach out.
        </p>
        <div className="contact-links">
          <a href="mailto:samsonrozansky@gmail.com" className="contact-link">
            <FaEnvelope />
            <span>samsonrozansky [at] gmail [dot] com</span>
          </a>
          <a href="mailto:srozansk@andrew.cmu.edu" className="contact-link">
            <FaEnvelope />
            <span>srozansk [at] andrew [dot] cmu [dot] edu</span>
          </a>
          <a href="https://github.com/samson-rozansky" target="_blank" rel="noopener noreferrer" className="contact-link">
            <FaGithub />
            <span>github.com/samson-rozansky</span>
          </a>
          <a href="https://linkedin.com/in/sam-rozansky" target="_blank" rel="noopener noreferrer" className="contact-link">
            <FaLinkedin />
            <span>linkedin.com/in/sam-rozansky</span>
          </a>
        </div>
      </section>

      <div className="go-personal">
        <Link to="/personal" className="go-personal-link">
          <span className="keyword">fun</span> explore () <span className="section-eq">=</span> Personal
        </Link>
      </div>
    </main>
  )
}

function PersonalPage({ isDark }) {
  return (
    <main className="personal-page">
      <section id="interests" className="section personal-section-page">
        <div className="section-header">
          <h2><span className="section-keyword">datatype</span> Interests <span className="section-eq">=</span> <span className="type">Me</span> <span className="section-keyword">of</span></h2>
        </div>
        <div className="personal-grid">
          <div className="personal-card favorites-card">
            <h3><span className="keyword">val</span> favorites <span className="colon">:</span> <span className="type">record</span></h3>
            <div className="favorites-list">
              <div className="favorite-item">
                <span className="favorite-label">Anime</span>
                <span className="favorite-value">Hunter X Hunter</span>
              </div>
              <div className="favorite-item">
                <span className="favorite-label">Manga</span>
                <span className="favorite-value">One Piece</span>
              </div>
              <div className="favorite-item">
                <span className="favorite-label">Show</span>
                <span className="favorite-value">Ancient Aliens</span>
              </div>
              <div className="favorite-item">
                <span className="favorite-label">Movie</span>
                <span className="favorite-value">12 Angry Men</span>
              </div>
              <div className="favorite-item">
                <span className="favorite-label">Book</span>
                <span className="favorite-value">Frankenstein</span>
              </div>
            </div>
          </div>
          <div className="personal-card hobbies-card">
            <h3><span className="keyword">val</span> hobbies <span className="colon">:</span> <span className="type">string</span></h3>
            <p className="hobbies-text">
              I play a lot of trivia including quizbowl competitions and even played on TV! 
              I love reading Hacker News to stay up to date on the latest tech and enjoy 
              diving into the history of technology and computing.
            </p>
          </div>
        </div>
      </section>

      <section id="music" className="section music-section">
        <div className="section-header">
          <h2><span className="section-keyword">val</span> music <span className="colon">:</span> <span className="type">track list</span> <span className="section-eq">=</span></h2>
        </div>
        <div className="music-container">
          <div className="music-card">
            <div className="music-header">
              <TbMusic className="music-icon" />
              <div className="music-info">
                <h3>Bangers</h3>
                <p>My favorite tracks</p>
              </div>
            </div>
            <div className="spotify-embed">
              {/* Both iframes preloaded, toggle visibility for instant theme switching */}
              <iframe
                title="Spotify Playlist Dark"
                src="https://open.spotify.com/embed/playlist/7ttYj7jv5TS2UEuVSaTzd1?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: isDark ? 'block' : 'none' }}
              ></iframe>
              <iframe
                title="Spotify Playlist Light"
                src="https://open.spotify.com/embed/playlist/7ttYj7jv5TS2UEuVSaTzd1?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: isDark ? 'none' : 'block' }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="section insights-section">
        <div className="section-header">
          <h2><span className="section-keyword">val</span> insights <span className="colon">:</span> <span className="type">blog list ref</span> <span className="section-eq">=</span></h2>
        </div>
        <div className="insights-placeholder">
          <TbWriting className="insights-icon" />
          <p className="insights-coming-soon">Insights coming soon...</p>
          <p className="insights-subtext">
            <span className="keyword">raise</span> <span className="type">NotYetImplemented</span>
          </p>
        </div>
      </section>

      <div className="back-home">
        <Link to="/" className="back-link">
          <span className="keyword">fun</span> goBack () <span className="section-eq">=</span> Home
        </Link>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-type">
          <span className="keyword">val</span> website <span className="colon">:</span> <span className="type">unit</span> <span className="operator">=</span> <span className="literal">()</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Samson Rozansky</p>
      </div>
    </footer>
  )
}

function AnimatedRoutes({ isDark }) {
  const location = useLocation()
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<MainPage />} />
      <Route path="/personal" element={<PersonalPage isDark={isDark} />} />
    </Routes>
  )
}

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <HashRouter>
      <div className="app">
        <div className="background-pattern"></div>
        <LossCurve />
        <ScrollToTop />
        <Header isDark={isDark} setIsDark={setIsDark} />
        <AnimatedRoutes isDark={isDark} />
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
