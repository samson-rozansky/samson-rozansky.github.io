import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaSun, FaMoon, FaExternalLinkAlt } from 'react-icons/fa'
import { SiPython, SiCplusplus, SiJavascript, SiFlask, SiGit, SiLinux, SiLatex, SiPandas } from 'react-icons/si'
import { BiCodeBlock } from 'react-icons/bi'
import { TbLambda, TbBrain, TbNetwork } from 'react-icons/tb'
import { HiAcademicCap, HiBriefcase, HiCode, HiLightBulb, HiSparkles } from 'react-icons/hi'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

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
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#teaching">Teaching</a>
            <a href="#contact">Contact</a>
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
            <h1 className="name">Samson Rozansky</h1>
            <p className="tagline">
              Computer Science @ Carnegie Mellon University
            </p>
            <p className="sub-tagline">
              Machine Learning <span className="operator">|</span> Functional Programming <span className="operator">|</span> Systems
            </p>
            <div className="hero-links">
              <a href="mailto:samsonrozansky@gmail.com" className="hero-link">
                <FaEnvelope /> samsonrozansky@gmail.com
              </a>
              <a href="tel:919-520-4648" className="hero-link">
                <FaPhone /> 919-520-4648
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
            <HiAcademicCap className="section-icon" />
            <h2>Education</h2>
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
              <h4>Relevant Coursework</h4>
              <div className="course-tags">
                {['Computer Systems', 'Imperative Programming', 'Functional Programming', 
                  'Game Theory', 'Calculus 3', 'Linear Algebra', 'Differential Equations', 
                  'Discrete Math', 'Constructive Logic', 'Theoretical Computer Science', 
                  'Computational Probability'].map(course => (
                  <span key={course} className="course-tag">{course}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-header">
            <BiCodeBlock className="section-icon" />
            <h2>Technical Skills</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Languages</h4>
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
              <h4>Frameworks & Libraries</h4>
              <div className="skill-items">
                <div className="skill-item"><SiPandas /> Pandas</div>
                <div className="skill-item"><HiCode /> BeautifulSoup</div>
                <div className="skill-item"><HiCode /> Matplotlib</div>
                <div className="skill-item"><SiFlask /> Flask</div>
              </div>
            </div>
            <div className="skill-category">
              <h4>Tools</h4>
              <div className="skill-items">
                <div className="skill-item"><SiLinux /> Linux</div>
                <div className="skill-item"><SiLatex /> LaTeX</div>
                <div className="skill-item"><SiGit /> Git</div>
                <div className="skill-item"><FaGithub /> GitHub</div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-header">
            <HiBriefcase className="section-icon" />
            <h2>Experience</h2>
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
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="job-header">
                  <h3>Lecturer</h3>
                  <span className="company">Math Honor Society</span>
                </div>
                <div className="job-meta">
                  <span className="date">2020 - 2024</span>
                  <span className="location">Raleigh, NC</span>
                </div>
                <ul className="job-details">
                  <li>Competed in statewide and countrywide math competitions</li>
                  <li>Presented lectures on topics ranging from Statistics to Algorithms</li>
                  <li>Tutored topics ranging from Physics and Computer Science to Calculus and Linear Algebra</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-header">
            <HiLightBulb className="section-icon" />
            <h2>Projects</h2>
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
            <TbLambda className="section-icon" />
            <h2>Teaching</h2>
          </div>
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
              <h4>Topics Covered</h4>
              <div className="topic-tags">
                {['Simply-Typed Lambda Calculus', 'Algebraic Data Types', 'Curry-Howard Isomorphism',
                  'Continuations', 'Substructural Logic', 'Phantom Types', 'Polymorphism',
                  'Parametricity', 'Monads', 'Dependent Types'].map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="honors" className="section">
          <div className="section-header">
            <HiSparkles className="section-icon" />
            <h2>Honors & Awards</h2>
          </div>
          <div className="honors-list">
            {[
              { title: "Second place in Carnegie AI Safety x Gray Swan Hackathon", date: "November 2025" },
              { title: "First Place Jane Street GUTS++ Challenge", date: "February 2025" },
              { title: "Second Place ACM@CMU Algorithms With A Purpose challenge", date: "February 2025" },
              { title: "First overall in the world in American Computer Science League", date: "2020 - 2024" },
              { title: "Top 5 in Citadel Securities Quantitative Challenge", date: "September 2024" },
              { title: "First overall in the world Math Kangaroo with perfect score", date: "March 2024" },
              { title: "First place in NC State DiamondHacks Hackathon Competition", date: "April 2023" },
              { title: "First place in College of Charleston 40th Annual Programming Competition", date: "February 2023" },
            ].map((honor, i) => (
              <div key={i} className="honor-item">
                <span className="honor-title">{honor.title}</span>
                <span className="honor-date">{honor.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-header">
            <FaEnvelope className="section-icon" />
            <h2>Get In Touch</h2>
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
