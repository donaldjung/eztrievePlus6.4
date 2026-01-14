import { useState } from 'react'
import { Play, RotateCcw, Download, Copy, Check } from 'lucide-react'
import OutputDisplay from '../components/code/OutputDisplay'

const samplePrograms = [
  {
    name: 'Hello World',
    code: `* EASYTRIEVE PLUS - HELLO WORLD
*
FILE SYSPRINT PRINTER
*
JOB INPUT NULL
  DISPLAY 'HELLO, EASYTRIEVE WORLD!'
  DISPLAY 'WELCOME TO MAINFRAME PROGRAMMING'
STOP`,
  },
  {
    name: 'File Processing',
    code: `* FILE PROCESSING EXAMPLE
*
FILE ACCOUNTS
  ACCT-NUM       1   12  A
  ACCT-NAME     13   30  A
  ACCT-BAL      43   11  P  2
  ACCT-STATUS   54    1  A
*
FILE OUTFILE
FILE SYSPRINT PRINTER
*
W REC-COUNT     W   7  N  0
W TOTAL-BAL     W  15  P  2
*
JOB INPUT ACCOUNTS
*
  IF ACCT-STATUS EQ 'A'
    ADD 1 TO REC-COUNT
    ADD ACCT-BAL TO TOTAL-BAL
    PUT OUTFILE
  END-IF
*
AFTER-JOB.
  DISPLAY 'RECORDS PROCESSED: ' REC-COUNT
  DISPLAY 'TOTAL BALANCE:     ' TOTAL-BAL
*
STOP`,
  },
  {
    name: 'Control Break Report',
    code: `* CONTROL BREAK REPORT EXAMPLE
*
FILE TRANSACTIONS
  REGION         1    4  A
  BRANCH         5    4  A
  TRANS-AMT      9   11  P  2
*
REPORT TRANS-RPT LINESIZE 80
  SEQUENCE REGION BRANCH
  CONTROL REGION BRANCH FINAL
*
  TITLE 1 'TRANSACTION SUMMARY REPORT'
  TITLE 2 'BY REGION AND BRANCH'
*
  HEADING REGION    'REGION'
  HEADING BRANCH    'BRANCH'
  HEADING TRANS-AMT 'AMOUNT'
*
  LINE REGION BRANCH TRANS-AMT TALLY
*
  SUM BRANCH 'BRANCH TOTAL:' TRANS-AMT
  SUM REGION 'REGION TOTAL:' TRANS-AMT
  SUM FINAL  'GRAND TOTAL: ' TRANS-AMT
*
JOB INPUT TRANSACTIONS
  PRINT TRANS-RPT
STOP`,
  },
  {
    name: 'Date Calculations',
    code: `* DATE CALCULATION EXAMPLE
*
FILE LOANS
  LOAN-NUM       1   15  A
  DUE-DATE      16    8  N  0
  BALANCE       24   13  P  2
*
FILE SYSPRINT PRINTER
*
W DAYS-PAST     W   5  N  0
W TODAY         W   8  N  0
*
JOB INPUT LOANS
*
  MOVE SYSDATE TO TODAY
*
  IF DUE-DATE LT TODAY
    MOVE DAYS-BETWEEN(DUE-DATE TODAY 'YYYYMMDD') +
         TO DAYS-PAST
    DISPLAY 'PAST DUE: ' LOAN-NUM +
            ' DAYS: ' DAYS-PAST +
            ' BAL: ' BALANCE
  END-IF
*
STOP`,
  },
  {
    name: 'VSAM Lookup',
    code: `* VSAM KEY LOOKUP EXAMPLE
*
FILE CUSTVSAM VS
  CUST-KEY       1   12  A
  CUST-NAME     13   30  A
  CUST-BAL      43   13  P  2
*
FILE TRANSIN
  TRANS-ACCT     1   12  A
  TRANS-AMT     13   11  P  2
*
W STATUS        W   1  A
*
JOB INPUT TRANSIN
*
  MOVE TRANS-ACCT TO CUST-KEY
  GET CUSTVSAM KEY CUST-KEY STATUS STATUS
*
  IF STATUS EQ '0'
    DISPLAY 'FOUND: ' CUST-NAME ' BAL: ' CUST-BAL
  ELSE
    DISPLAY 'NOT FOUND: ' TRANS-ACCT
  END-IF
*
STOP`,
  },
]

export default function Playground() {
  const [code, setCode] = useState(samplePrograms[0].code)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(0)

  const simulateRun = () => {
    setIsRunning(true)
    setOutput('')

    // Simulate compilation and execution
    setTimeout(() => {
      const lines = [
        'EASYTRIEVE PLUS R6.4 - COMPILATION STARTED',
        '==========================================',
        '',
        'SOURCE ANALYSIS COMPLETE',
        'NO ERRORS DETECTED',
        '',
        'EXECUTION STARTED',
        '------------------------------------------',
        '',
      ]

      // Parse code for DISPLAY statements
      const displayMatches = code.match(/DISPLAY\s+'([^']+)'[^'\n]*(?:'([^']+)')?/gi)
      if (displayMatches) {
        displayMatches.forEach((match) => {
          const parts = match.match(/'([^']+)'/g)
          if (parts) {
            const text = parts.map((p) => p.replace(/'/g, '')).join('')
            lines.push(text)
          }
        })
      } else {
        lines.push('(No output generated)')
      }

      lines.push('')
      lines.push('------------------------------------------')
      lines.push('EXECUTION COMPLETE')
      lines.push('RETURN CODE: 0')
      lines.push('')
      lines.push(`RECORDS READ:    ${Math.floor(Math.random() * 1000) + 100}`)
      lines.push(`RECORDS WRITTEN: ${Math.floor(Math.random() * 500) + 50}`)

      setOutput(lines.join('\n'))
      setIsRunning(false)
    }, 1500)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'program.eztv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleProgramSelect = (index: number) => {
    setSelectedProgram(index)
    setCode(samplePrograms[index].code)
    setOutput('')
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          EasyTrieve Playground
        </h1>
        <p className="text-gray-400">
          Write, test, and experiment with EasyTrieve Plus programs in a simulated environment.
        </p>
      </div>

      {/* Sample Programs */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Sample Programs
        </h3>
        <div className="flex flex-wrap gap-2">
          {samplePrograms.map((program, index) => (
            <button
              key={program.name}
              onClick={() => handleProgramSelect(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedProgram === index
                  ? 'bg-mainframe-green/20 text-mainframe-green border border-mainframe-green/50'
                  : 'bg-mainframe-terminal text-gray-400 border border-mainframe-green/20 hover:border-mainframe-green/40 hover:text-gray-300'
              }`}
            >
              {program.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-mainframe-green">
              Source Code
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-400 hover:text-mainframe-green hover:bg-mainframe-green/10 rounded-lg transition-all"
                title="Copy code"
              >
                {copied ? <Check size={18} className="text-mainframe-green" /> : <Copy size={18} />}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-gray-400 hover:text-mainframe-green hover:bg-mainframe-green/10 rounded-lg transition-all"
                title="Download code"
              >
                <Download size={18} />
              </button>
              <button
                onClick={() => {
                  setCode(samplePrograms[selectedProgram].code)
                  setOutput('')
                }}
                className="p-2 text-gray-400 hover:text-mainframe-amber hover:bg-mainframe-amber/10 rounded-lg transition-all"
                title="Reset code"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-3 text-gray-400 text-sm font-mono">PROGRAM.EZTV</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <button
            onClick={simulateRun}
            disabled={isRunning}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-mainframe-green/30 border-t-mainframe-green rounded-full animate-spin" />
                Compiling & Running...
              </>
            ) : (
              <>
                <Play size={18} />
                Run Program
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-display font-semibold text-accent-cyan">
            Program Output
          </h3>

          {output ? (
            <OutputDisplay output={output} title="Execution Results" />
          ) : (
            <div className="terminal-window h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Play size={48} className="mx-auto mb-4 opacity-30" />
                <p>Click "Run Program" to execute your code</p>
                <p className="text-sm mt-2">Output will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card-highlight">
        <h3 className="text-lg font-display font-semibold text-white mb-4">Playground Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-400 text-sm">
          <ul className="space-y-2">
            <li>• Use DISPLAY statements to output text and variable values</li>
            <li>• Comments start with * (asterisk) in column 1</li>
            <li>• FILE definitions must come before JOB statement</li>
          </ul>
          <ul className="space-y-2">
            <li>• Working storage (W) fields are runtime variables</li>
            <li>• STOP ends program execution (optionally with return code)</li>
            <li>• This is a simulation—actual mainframe behavior may vary</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
