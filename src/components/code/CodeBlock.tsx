import { useState } from 'react'
import { Copy, Check, Play } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CodeBlockProps {
  code: string
  title?: string
  language?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
  onRun?: () => void
}

export default function CodeBlock({
  code,
  title,
  language = 'easytrieve',
  showLineNumbers = true,
  highlightLines = [],
  className,
  onRun,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split('\n')

  const highlightEasyTrieve = (line: string): string => {
    const keywords = [
      'JOB', 'PARM', 'FILE', 'DEFINE', 'GET', 'PUT', 'PRINT', 'DISPLAY',
      'IF', 'ELSE', 'END-IF', 'DO', 'WHILE', 'UNTIL', 'END-DO',
      'PROC', 'END-PROC', 'PERFORM', 'STOP', 'GOTO',
      'REPORT', 'SEQUENCE', 'CONTROL', 'LINE', 'TITLE', 'HEADING',
      'SORT', 'SUMMARY', 'SUM', 'COUNT', 'AVERAGE',
      'MOVE', 'ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'COMPUTE',
      'INPUT', 'OUTPUT', 'UPDATE', 'INSTREAM', 'END-INSTREAM',
      'SELECT', 'FROM', 'WHERE', 'SQL', 'END-SQL',
      'BEFORE', 'AFTER', 'FIRST', 'LAST', 'FINAL',
      'EQ', 'NE', 'GT', 'LT', 'GE', 'LE', 'AND', 'OR', 'NOT',
      'LIKE', 'CONTAINS', 'SPACES', 'ZEROS', 'NULL', 'NEWPAGE'
    ]

    const fieldTypes = ['W', 'A', 'N', 'P', 'B', 'U', 'S', 'D']

    // Handle comments (lines starting with *)
    if (line.trim().startsWith('*')) {
      return `<span class="text-gray-500 italic">${line}</span>`
    }

    let result = line
      // Strings in single quotes
      .replace(/'([^']*)'/g, '<span class="text-mainframe-amber">\'$1\'</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-accent-magenta">$1</span>')

    // Keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi')
      result = result.replace(regex, '<span class="text-mainframe-green font-semibold">$1</span>')
    })

    // Field types (single character type indicators)
    fieldTypes.forEach(type => {
      const regex = new RegExp(`\\s(${type})\\s+(\\d+)`, 'g')
      result = result.replace(regex, ` <span class="text-accent-cyan font-semibold">$1</span> <span class="text-accent-magenta">$2</span>`)
    })

    return result
  }

  return (
    <div className={cn('terminal-window', className)}>
      {/* Header */}
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-3 text-gray-400 text-sm font-mono flex-1">
          {title || `${language.toUpperCase()} Program`}
        </span>
        <div className="flex items-center gap-2">
          {onRun && (
            <button
              onClick={onRun}
              className="p-1.5 text-gray-400 hover:text-mainframe-green hover:bg-mainframe-green/10 rounded transition-all"
              title="Run code"
            >
              <Play size={14} />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-mainframe-green hover:bg-mainframe-green/10 rounded transition-all"
            title="Copy code"
          >
            {copied ? <Check size={14} className="text-mainframe-green" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          {lines.map((line, index) => (
            <div
              key={index}
              className={cn(
                'flex',
                highlightLines.includes(index + 1) && 'bg-mainframe-green/10 -mx-4 px-4'
              )}
            >
              {showLineNumbers && (
                <span className="select-none text-gray-600 w-8 text-right mr-4 flex-shrink-0">
                  {index + 1}
                </span>
              )}
              <code
                className="flex-1"
                dangerouslySetInnerHTML={{
                  __html: language === 'easytrieve' ? highlightEasyTrieve(line) : line
                }}
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
