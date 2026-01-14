import { FileCode, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CheatItem {
  syntax: string
  description: string
  example?: string
}

interface CheatSection {
  title: string
  items: CheatItem[]
}

const cheatSheetData: CheatSection[] = [
  {
    title: 'Program Structure',
    items: [
      { syntax: 'PARM option', description: 'Set program parameters', example: 'PARM DEBUG(SHORT) DATE(MDY)' },
      { syntax: 'FILE name [type]', description: 'Define a file', example: 'FILE CUSTMAST VS' },
      { syntax: 'DEFINE field pos len type [dec]', description: 'Define a field in file', example: 'BALANCE 1 11 P 2' },
      { syntax: 'W field W len type [dec]', description: 'Define working storage', example: 'W TOTAL W 15 P 2' },
      { syntax: 'JOB INPUT filename', description: 'Start processing', example: 'JOB INPUT CUSTMAST' },
      { syntax: 'STOP [rc]', description: 'End program', example: 'STOP 8' },
    ],
  },
  {
    title: 'Data Types',
    items: [
      { syntax: 'A', description: 'Alphanumeric (text)', example: 'NAME 1 30 A' },
      { syntax: 'N', description: 'Numeric display (EBCDIC)', example: 'DATE 1 8 N 0' },
      { syntax: 'P', description: 'Packed decimal (computational)', example: 'AMOUNT 1 9 P 2' },
      { syntax: 'B', description: 'Binary (halfword/fullword)', example: 'COUNT 1 4 B 0' },
      { syntax: 'U', description: 'Unsigned packed decimal', example: 'UAMT 1 5 U 0' },
    ],
  },
  {
    title: 'File Operations',
    items: [
      { syntax: 'GET filename', description: 'Read next record', example: 'GET TRANSIN' },
      { syntax: 'GET file KEY key', description: 'Read by key (VSAM)', example: 'GET CUSTVSAM KEY CUST-KEY' },
      { syntax: 'PUT filename', description: 'Write record', example: 'PUT OUTFILE' },
      { syntax: 'PUT file UPDATE', description: 'Update VSAM record', example: 'PUT CUSTVSAM UPDATE' },
      { syntax: 'PRINT report', description: 'Print to report', example: 'PRINT DAILY-RPT' },
    ],
  },
  {
    title: 'Control Structures',
    items: [
      { syntax: 'IF cond ... END-IF', description: 'Conditional execution', example: 'IF STATUS EQ \'A\' ... END-IF' },
      { syntax: 'IF ... ELSE ... END-IF', description: 'If-else branching', example: 'IF BAL GT 0 ... ELSE ... END-IF' },
      { syntax: 'DO WHILE cond ... END-DO', description: 'While loop (test first)', example: 'DO WHILE COUNT LT 10 ... END-DO' },
      { syntax: 'DO UNTIL cond ... END-DO', description: 'Until loop (test after)', example: 'DO UNTIL EOF EQ \'Y\' ... END-DO' },
      { syntax: 'CASE field WHEN val ... END-CASE', description: 'Multi-way branch', example: 'CASE TYPE WHEN \'A\' ... END-CASE' },
      { syntax: 'PERFORM proc', description: 'Call procedure', example: 'PERFORM CALC-TOTAL' },
      { syntax: 'GOTO label', description: 'Jump to label', example: 'GOTO SKIP-REC' },
    ],
  },
  {
    title: 'Comparison Operators',
    items: [
      { syntax: 'EQ', description: 'Equal to', example: 'IF A EQ B' },
      { syntax: 'NE', description: 'Not equal to', example: 'IF A NE 0' },
      { syntax: 'GT', description: 'Greater than', example: 'IF AMT GT 1000' },
      { syntax: 'LT', description: 'Less than', example: 'IF AMT LT 0' },
      { syntax: 'GE', description: 'Greater or equal', example: 'IF BAL GE 500' },
      { syntax: 'LE', description: 'Less or equal', example: 'IF CNT LE 100' },
      { syntax: 'LIKE', description: 'Pattern match', example: 'IF NAME LIKE \'SM%\'' },
      { syntax: 'CONTAINS', description: 'Contains substring', example: 'IF DESC CONTAINS \'FEE\'' },
    ],
  },
  {
    title: 'Logical Operators',
    items: [
      { syntax: 'AND', description: 'Both conditions true', example: 'IF A EQ 1 AND B EQ 2' },
      { syntax: 'OR', description: 'Either condition true', example: 'IF A EQ 1 OR A EQ 2' },
      { syntax: 'NOT', description: 'Negate condition', example: 'IF NOT (A EQ B)' },
    ],
  },
  {
    title: 'Data Movement',
    items: [
      { syntax: 'MOVE src TO dest', description: 'Copy data', example: 'MOVE ACCT TO OUT-ACCT' },
      { syntax: 'MOVE SPACES TO field', description: 'Clear alpha field', example: 'MOVE SPACES TO NAME' },
      { syntax: 'MOVE ZEROS TO field', description: 'Clear numeric field', example: 'MOVE ZEROS TO TOTAL' },
      { syntax: 'MOVE CORRESPONDING', description: 'Move matching fields', example: 'MOVE CORRESPONDING IN TO OUT' },
    ],
  },
  {
    title: 'Arithmetic',
    items: [
      { syntax: 'ADD val TO field', description: 'Addition', example: 'ADD 1 TO COUNTER' },
      { syntax: 'SUBTRACT val FROM field', description: 'Subtraction', example: 'SUBTRACT AMT FROM BAL' },
      { syntax: 'MULTIPLY field BY val', description: 'Multiplication', example: 'MULTIPLY QTY BY PRICE' },
      { syntax: 'DIVIDE field BY val', description: 'Division', example: 'DIVIDE TOTAL BY COUNT' },
      { syntax: 'COMPUTE result = expr', description: 'Complex calculation', example: 'COMPUTE INT = BAL * RATE' },
    ],
  },
  {
    title: 'String Functions',
    items: [
      { syntax: 'SUBSTR(fld pos len)', description: 'Extract substring', example: 'SUBSTR(SSN 1 3)' },
      { syntax: 'LENGTH(field)', description: 'Get string length', example: 'LENGTH(NAME)' },
      { syntax: 'TRIM(field)', description: 'Remove spaces', example: 'TRIM(INPUT-NAME)' },
      { syntax: 'CONCAT(a b c)', description: 'Concatenate strings', example: 'CONCAT(FIRST \' \' LAST)' },
      { syntax: 'UPPER(field)', description: 'Convert to uppercase', example: 'UPPER(NAME)' },
      { syntax: 'INDEX(fld str)', description: 'Find position', example: 'INDEX(DESC \'FEE\')' },
    ],
  },
  {
    title: 'Date Functions',
    items: [
      { syntax: 'SYSDATE', description: 'System date YYYYMMDD', example: 'MOVE SYSDATE TO TODAY' },
      { syntax: 'SYSTIME', description: 'System time HHMMSS', example: 'MOVE SYSTIME TO NOW' },
      { syntax: 'DATE-FORMAT(dt in out)', description: 'Convert date format', example: 'DATE-FORMAT(DT \'YYYYMMDD\' \'MM/DD/YY\')' },
      { syntax: 'DAYS-BETWEEN(d1 d2 fmt)', description: 'Days between dates', example: 'DAYS-BETWEEN(START END \'YYYYMMDD\')' },
    ],
  },
  {
    title: 'Report Statements',
    items: [
      { syntax: 'REPORT name options', description: 'Define report', example: 'REPORT RPT LINESIZE 132' },
      { syntax: 'SEQUENCE fld [A|D]', description: 'Sort order', example: 'SEQUENCE REGION A BRANCH' },
      { syntax: 'CONTROL fld... FINAL', description: 'Control breaks', example: 'CONTROL REGION BRANCH FINAL' },
      { syntax: 'TITLE n text', description: 'Report title', example: 'TITLE 1 \'DAILY REPORT\'' },
      { syntax: 'HEADING fld text', description: 'Column heading', example: 'HEADING AMOUNT \'BALANCE\'' },
      { syntax: 'LINE fields', description: 'Detail line', example: 'LINE ACCT NAME BALANCE' },
      { syntax: 'SUM level fields', description: 'Summary line', example: 'SUM FINAL \'TOTAL:\' AMOUNT' },
    ],
  },
  {
    title: 'Summary Functions',
    items: [
      { syntax: 'TALLY', description: 'Mark for auto-sum', example: 'LINE AMOUNT TALLY' },
      { syntax: 'COUNT', description: 'Record count', example: 'SUM FINAL COUNT' },
      { syntax: 'AVERAGE field', description: 'Average value', example: 'SUM FINAL AVERAGE BALANCE' },
      { syntax: 'MIN field', description: 'Minimum value', example: 'SUM FINAL MIN AMOUNT' },
      { syntax: 'MAX field', description: 'Maximum value', example: 'SUM FINAL MAX AMOUNT' },
    ],
  },
]

export default function CheatSheet() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center border border-accent-cyan/30">
            <FileCode className="text-accent-cyan" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Cheat Sheet</h1>
            <p className="text-gray-400">Quick reference for EasyTrieve Plus R6.4 syntax</p>
          </div>
        </div>
      </div>

      {/* Cheat Sheet Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {cheatSheetData.map((section) => (
          <div key={section.title} className="card-highlight">
            <h2 className="text-lg font-display font-semibold text-mainframe-green mb-4 pb-2 border-b border-mainframe-green/20">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.items.map((item, idx) => {
                const itemId = `${section.title}-${idx}`
                return (
                  <div key={itemId} className="group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <code className="text-mainframe-green font-mono text-sm font-semibold">
                          {item.syntax}
                        </code>
                        <p className="text-gray-400 text-xs mt-0.5">{item.description}</p>
                      </div>
                      {item.example && (
                        <button
                          onClick={() => handleCopy(item.example!, itemId)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-mainframe-green transition-all"
                          title="Copy example"
                        >
                          {copiedItem === itemId ? (
                            <Check size={14} className="text-mainframe-green" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      )}
                    </div>
                    {item.example && (
                      <code className="block mt-1 text-xs text-gray-500 font-mono bg-mainframe-darker px-2 py-1 rounded">
                        {item.example}
                      </code>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-8 card-highlight">
        <h2 className="text-lg font-display font-semibold text-mainframe-amber mb-4">Quick Tips</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div>
            <h3 className="text-white font-semibold mb-2">Comments</h3>
            <p>Lines starting with <code className="text-mainframe-green">*</code> are comments. Use them to document your code.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Continuation</h3>
            <p>Use <code className="text-mainframe-green">+</code> at end of line to continue statement on next line.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Literals</h3>
            <p>String literals use single quotes: <code className="text-mainframe-amber">'text'</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
