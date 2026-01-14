import { NavLink } from 'react-router-dom'
import { 
  Home, 
  BookOpen, 
  Database, 
  GitBranch, 
  Settings2, 
  FileText, 
  BarChart3, 
  Building2,
  Code2,
  FileCode,
  Library
} from 'lucide-react'
import { cn } from '../../lib/utils'

const modules = [
  { id: 1, title: 'Fundamentals', icon: BookOpen, path: '/module/1' },
  { id: 2, title: 'File Processing', icon: Database, path: '/module/2' },
  { id: 3, title: 'Control Structures', icon: GitBranch, path: '/module/3' },
  { id: 4, title: 'Data Manipulation', icon: Settings2, path: '/module/4' },
  { id: 5, title: 'Report Generation', icon: FileText, path: '/module/5' },
  { id: 6, title: 'Sorting & Summary', icon: BarChart3, path: '/module/6' },
  { id: 7, title: 'Financial Apps', icon: Building2, path: '/module/7' },
]

const tools = [
  { title: 'Playground', icon: Code2, path: '/playground' },
  { title: 'Cheat Sheet', icon: FileCode, path: '/cheatsheet' },
  { title: 'Glossary', icon: Library, path: '/glossary' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-mainframe-darker border-r border-mainframe-green/20 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-mainframe-green/20">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-mainframe-green/20 flex items-center justify-center border border-mainframe-green/40 group-hover:bg-mainframe-green/30 transition-all">
            <span className="text-mainframe-green font-mono font-bold text-lg">E+</span>
          </div>
          <div>
            <h1 className="text-mainframe-green font-display font-bold text-lg leading-tight">
              EasyTrieve
            </h1>
            <span className="text-gray-500 text-xs font-mono">Plus R6.4</span>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Home */}
        <div className="px-3 mb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn('flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                isActive
                  ? 'bg-mainframe-green/10 text-mainframe-green border-l-2 border-mainframe-green'
                  : 'text-gray-400 hover:text-mainframe-green hover:bg-mainframe-green/5'
              )
            }
          >
            <Home size={18} />
            <span className="font-medium">Home</span>
          </NavLink>
        </div>

        {/* Modules Section */}
        <div className="px-3 mb-2">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Modules
          </h3>
          <div className="space-y-1">
            {modules.map((module) => (
              <NavLink
                key={module.id}
                to={module.path}
                className={({ isActive }) =>
                  cn('flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300',
                    isActive
                      ? 'bg-mainframe-green/10 text-mainframe-green border-l-2 border-mainframe-green'
                      : 'text-gray-400 hover:text-mainframe-green hover:bg-mainframe-green/5'
                  )
                }
              >
                <module.icon size={16} />
                <span className="text-sm">
                  <span className="font-mono text-xs mr-1 opacity-60">{module.id}.</span>
                  {module.title}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="px-3 mt-6">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Tools
          </h3>
          <div className="space-y-1">
            {tools.map((tool) => (
              <NavLink
                key={tool.title}
                to={tool.path}
                className={({ isActive }) =>
                  cn('flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300',
                    isActive
                      ? 'bg-accent-cyan/10 text-accent-cyan border-l-2 border-accent-cyan'
                      : 'text-gray-400 hover:text-accent-cyan hover:bg-accent-cyan/5'
                  )
                }
              >
                <tool.icon size={16} />
                <span className="text-sm">{tool.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-mainframe-green/20">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-mono">
            Financial Institution
          </p>
          <p className="text-xs text-gray-600 font-mono mt-1">
            Training Platform v1.0
          </p>
        </div>
      </div>
    </aside>
  )
}
