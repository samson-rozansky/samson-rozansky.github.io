import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaExternalLinkAlt } from 'react-icons/fa'
import { SiPython, SiCplusplus, SiJavascript, SiFlask, SiGit, SiLinux, SiLatex, SiPandas } from 'react-icons/si'
import { BiCodeBlock } from 'react-icons/bi'
import { TbLambda, TbBrain } from 'react-icons/tb'
import { HiCode } from 'react-icons/hi'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

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
    { code: '21-242', name: 'Matrix Theory' },
    { code: '21-268', name: 'Multidimensional Calculus' },
    { code: '80-305', name: 'Game Theory' },
  ]

  return (
    <div className="app">
      <div className="background-pattern"></div>
      
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <TbLambda className="lambda-icon" />
            <span className="logo-text">SR</span>
          </div>
          <div className="nav-links">
            <a href="#about"><span className="nav-lambda">λ</span>about</a>
            <a href="#experience"><span className="nav-lambda">λ</span>experience</a>
            <a href="#projects"><span className="nav-lambda">λ</span>projects</a>
            <a href="#teaching"><span className="nav-lambda">λ</span>teaching</a>
            <a href="#contact"><span className="nav-lambda">λ</span>contact</a>
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

      <main>
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
              Machine Learning <span className="operator">|></span> Functional Programming <span className="operator">|></span> Systems
            </p>
            <div className="hero-links">
              <a href="mailto:samsonrozansky@gmail.com" className="hero-link">
                <FaEnvelope /> samsonrozansky@gmail.com
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
                <div className="skill-item"><HiCode /> Java</div>
                <div className="skill-item"><HiCode /> C#</div>
                <div className="skill-item"><SiJavascript /> JavaScript</div>
                <div className="skill-item"><TbLambda /> SML/NJ</div>
                <div className="skill-item"><TbLambda /> OCaml</div>
                <div className="skill-item"><HiCode /> Prolog</div>
              </div>
            </div>
            <div className="skill-category">
              <h4><span className="keyword">val</span> frameworks <span className="colon">:</span> <span className="type">list</span></h4>
              <div className="skill-items">
                <div className="skill-item"><SiPandas /> Pandas</div>
                <div className="skill-item"><HiCode /> BeautifulSoup</div>
                <div className="skill-item"><HiCode /> Matplotlib</div>
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
            <p className="course-institution">Carnegie Mellon University</p>
            <p className="course-description">
              A student-run course (StuCo) teaching topics in type theory and related disciplines. 
              Designed to give students a high-level introduction to fascinating practical topics 
              in type theory and programming language theory.
            </p>
            <div className="course-topics">
              <h4><span className="keyword">instance</span> Topics <span className="keyword">where</span></h4>
              <div className="topic-tags">
                {['Simply-Typed Lambda Calculus', 'Algebraic Data Types', 'Curry-Howard Isomorphism',
                  'Continuations', 'Substructural Logic', 'Phantom Types', 'Polymorphism',
                  'Parametricity', 'Monads', 'Dependent Types'].map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="teaching-card secondary">
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

        <section id="honors" className="section">
          <div className="section-header">
            <h2><span className="section-keyword">val</span> honors <span className="colon">:</span> <span className="type">achievement list</span> <span className="section-eq">=</span></h2>
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
              <span>samsonrozansky@gmail.com</span>
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
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-type">
            <span className="keyword">val</span> website <span className="colon">:</span> <span className="type">unit</span> <span className="operator">=</span> <span className="literal">()</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Samson Rozansky</p>
        </div>
      </footer>
    </div>
  )
}

export default App
