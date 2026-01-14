import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Database, 
  GitBranch, 
  Settings2, 
  FileText, 
  BarChart3, 
  Building2,
  ArrowRight,
  Terminal,
  Zap,
  Shield
} from 'lucide-react'

const modules = [
  {
    id: 1,
    title: 'EasyTrieve Fundamentals',
    description: 'Program structure, JOB statements, FILE definitions, and data types',
    icon: BookOpen,
    color: 'mainframe-green',
  },
  {
    id: 2,
    title: 'File Processing',
    description: 'Sequential files, VSAM access methods, and DB2 integration',
    icon: Database,
    color: 'accent-cyan',
  },
  {
    id: 3,
    title: 'Control Structures',
    description: 'Conditional logic, loops, procedures, and program flow',
    icon: GitBranch,
    color: 'mainframe-amber',
  },
  {
    id: 4,
    title: 'Data Manipulation',
    description: 'String operations, arithmetic, date functions, and conversions',
    icon: Settings2,
    color: 'accent-magenta',
  },
  {
    id: 5,
    title: 'Report Generation',
    description: 'REPORT statements, control breaks, and page formatting',
    icon: FileText,
    color: 'mainframe-green',
  },
  {
    id: 6,
    title: 'Sorting & Summarization',
    description: 'SORT operations, SEQUENCE BY, and aggregate functions',
    icon: BarChart3,
    color: 'accent-cyan',
  },
  {
    id: 7,
    title: 'Financial Applications',
    description: 'Real-world banking examples and regulatory reporting',
    icon: Building2,
    color: 'accent-gold',
  },
]

const features = [
  {
    icon: Terminal,
    title: 'Interactive Code Editor',
    description: 'Write and test EasyTrieve programs with syntax highlighting',
  },
  {
    icon: Zap,
    title: 'Real-World Examples',
    description: 'Learn from actual financial institution use cases',
  },
  {
    icon: Shield,
    title: 'Best Practices',
    description: 'Industry-standard patterns and optimization techniques',
  },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-mainframe-green/10 border border-mainframe-green/30 rounded-full mb-6">
          <span className="w-2 h-2 bg-mainframe-green rounded-full animate-pulse" />
          <span className="text-mainframe-green text-sm font-mono">EasyTrieve Plus R6.4</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
          <span className="text-gradient">Mainframe Programming</span>
          <br />
          <span className="text-white">for Financial Institutions</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          Master EasyTrieve Plus—the industry-standard report generator and data extraction
          tool powering batch processing at the world's largest banks and financial institutions.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/module/1" className="btn-primary flex items-center gap-2">
            Start Learning
            <ArrowRight size={18} />
          </Link>
          <Link to="/playground" className="btn-secondary flex items-center gap-2">
            <Terminal size={18} />
            Try Playground
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="card-highlight animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-lg bg-mainframe-green/20 flex items-center justify-center mb-4 border border-mainframe-green/30">
              <feature.icon className="text-mainframe-green" size={24} />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* Modules Grid */}
      <section className="mb-16">
        <h2 className="section-title text-center mb-8">Learning Modules</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              className="group card-highlight animate-slide-up flex flex-col"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-${module.color}/20 flex items-center justify-center border border-${module.color}/30 group-hover:scale-110 transition-transform`}>
                  <module.icon className={`text-${module.color}`} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500">MODULE {module.id}</span>
                  </div>
                  <h3 className="font-display font-semibold text-white group-hover:text-mainframe-green transition-colors">
                    {module.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-400 flex-1">
                {module.description}
              </p>
              <div className="mt-4 flex items-center text-mainframe-green text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Start module
                <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Reference */}
      <section className="card-highlight mb-16">
        <h2 className="subsection-title mb-4">Quick Example: Hello World</h2>
        <div className="bg-mainframe-darker rounded-lg p-4 font-mono text-sm border border-mainframe-green/20">
          <pre className="text-gray-300">
            <span className="text-mainframe-green">FILE</span> SYSPRINT <span className="text-accent-cyan">PRINTER</span>{'\n'}
            <span className="text-gray-500">*</span>{'\n'}
            <span className="text-mainframe-green">JOB</span> INPUT NULL{'\n'}
            {'  '}<span className="text-mainframe-green">DISPLAY</span> <span className="text-mainframe-amber">'HELLO, EASYTRIEVE WORLD!'</span>{'\n'}
            <span className="text-mainframe-green">STOP</span>
          </pre>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          This simple program demonstrates the basic structure of an EasyTrieve Plus program
          with a FILE definition, JOB statement, and DISPLAY output.
        </p>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-12 border-t border-mainframe-green/20">
        <h2 className="text-2xl font-display font-bold text-white mb-4">
          Ready to become an EasyTrieve expert?
        </h2>
        <p className="text-gray-400 mb-6">
          Start with Module 1 and build your mainframe programming skills.
        </p>
        <Link to="/module/1" className="btn-primary inline-flex items-center gap-2">
          Begin Your Journey
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
