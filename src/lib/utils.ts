import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function highlightEasyTrieve(code: string): string {
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
    'W', 'A', 'N', 'P', 'B', 'U', 'S', 'D',
    'EQ', 'NE', 'GT', 'LT', 'GE', 'LE', 'AND', 'OR', 'NOT',
    'LIKE', 'CONTAINS', 'SPACES', 'ZEROS', 'NULL'
  ]

  const statements = [
    'FILE', 'DEFINE', 'REPORT', 'LINE', 'TITLE', 'HEADING', 'CONTROL'
  ]

  let highlighted = code
    .replace(/\*/g, '<span class="eztv-comment">*</span>')
    .replace(/'([^']*)'/g, '<span class="eztv-string">\'$1\'</span>')
    .replace(/(\d+)/g, '<span class="eztv-number">$1</span>')

  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi')
    const className = statements.includes(keyword) ? 'eztv-statement' : 'eztv-keyword'
    highlighted = highlighted.replace(regex, `<span class="${className}">$1</span>`)
  })

  return highlighted
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
