import { Link } from 'react-router-dom'
import CodeBlock from '../../components/code/CodeBlock'
import FlowDiagram from '../../components/visualizations/FlowDiagram'
import { BookOpen, Lightbulb, AlertTriangle, Info } from 'lucide-react'

export default function Module1Fundamentals() {
  const programStructureDiagram = `
flowchart TB
    subgraph structure [EasyTrieve Program Structure]
        ENV[Environment Section] --> FILE[FILE Definitions]
        FILE --> DEFINE[DEFINE Statements]
        DEFINE --> JOB[JOB Statement]
        JOB --> LOGIC[Processing Logic]
        LOGIC --> STOP[STOP Statement]
    end
  `

  const dataTypesDiagram = `
flowchart LR
    subgraph types [EasyTrieve Data Types]
        A["A - Alpha"]
        N["N - Numeric Display"]
        P["P - Packed Decimal"]
        B["B - Binary"]
        U["U - Unsigned Packed"]
    end
    
    A --> TEXT[Text Data]
    N --> DISPLAY[Display Numbers]
    P --> COMPUTE[Computations]
    B --> FLAGS[Flags/Counters]
  `

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-mainframe-green/20 flex items-center justify-center border border-mainframe-green/30">
            <BookOpen className="text-mainframe-green" size={24} />
          </div>
          <div>
            <p className="text-sm font-mono text-gray-500">MODULE 1</p>
            <h1 className="text-3xl font-display font-bold text-white">EasyTrieve Plus Fundamentals</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Master the foundational concepts of EasyTrieve Plus R6.4—program structure, 
          data definitions, field types, and the essential building blocks of mainframe report generation.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card-highlight mb-8">
        <h3 className="text-lg font-display font-semibold text-mainframe-green mb-4">In This Module</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">1</span>
            What is EasyTrieve Plus?
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">2</span>
            Program Structure & Skeleton
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">3</span>
            FILE Definitions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">4</span>
            DEFINE Statements & Field Types
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">5</span>
            Working Storage (W Fields)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">6</span>
            PARM Options
          </li>
        </ul>
      </div>

      {/* Section 1: Introduction */}
      <section className="mb-12">
        <h2 className="section-title">1. What is EasyTrieve Plus?</h2>
        
        <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
          <p>
            <strong className="text-white">EasyTrieve Plus</strong> is a powerful, high-level programming language 
            designed specifically for <span className="text-mainframe-green">data extraction</span>, 
            <span className="text-accent-cyan"> report generation</span>, and 
            <span className="text-mainframe-amber"> batch file processing</span> on IBM mainframe systems.
          </p>
          
          <p>
            Developed by CA Technologies (now Broadcom), EasyTrieve Plus is the industry standard 
            for financial institutions that need to:
          </p>
          
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Extract data from multiple file types (sequential, VSAM, DB2)</li>
            <li>Generate formatted reports with control breaks and summaries</li>
            <li>Process batch transactions efficiently</li>
            <li>Create audit trails and regulatory compliance reports</li>
            <li>Perform file matching and reconciliation</li>
          </ul>
        </div>

        <div className="info-box tip mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-green mb-1">Why EasyTrieve?</h4>
              <p className="text-gray-300 text-sm">
                EasyTrieve programs are typically 10x shorter than equivalent COBOL programs 
                while maintaining the same functionality. This makes it ideal for rapid 
                development of reports and data extracts in production environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Program Structure */}
      <section className="mb-12">
        <h2 className="section-title">2. Program Structure & Skeleton</h2>
        
        <p className="text-gray-300 mb-6">
          Every EasyTrieve Plus program follows a hierarchical structure with distinct sections. 
          Understanding this structure is fundamental to writing effective programs.
        </p>

        <FlowDiagram chart={programStructureDiagram} title="Program Structure Flow" className="mb-6" />

        <h3 className="subsection-title mt-8">Basic Program Skeleton</h3>
        
        <CodeBlock
          title="BASIC_SKELETON.EZTV"
          code={`* ============================================
* EASYTRIEVE PLUS PROGRAM SKELETON
* FINANCIAL INSTITUTION STANDARD FORMAT
* ============================================
*
* ----- ENVIRONMENT SECTION -----
PARM DEBUG(SHORT)
*
* ----- FILE DEFINITIONS -----
FILE INFILE
  ACCT-NUM       1   10  A
  ACCT-NAME     11   30  A
  ACCT-BAL      41   15  P  2
  ACCT-STATUS   56    1  A
*
FILE OUTFILE
*
FILE SYSPRINT PRINTER
*
* ----- WORKING STORAGE -----
W TOTAL-RECS     W  7  N  0
W TOTAL-BAL      W 15  P  2
W PROC-DATE      W  8  A
*
* ----- JOB STATEMENT -----
JOB INPUT INFILE
*
* ----- PROCESSING LOGIC -----
  IF ACCT-STATUS EQ 'A'
    ADD 1 TO TOTAL-RECS
    ADD ACCT-BAL TO TOTAL-BAL
    PUT OUTFILE
  END-IF
*
STOP`}
          highlightLines={[9, 22, 28]}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="info-box note">
            <div className="flex items-start gap-3">
              <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-accent-cyan mb-1">Comments</h4>
                <p className="text-gray-300 text-sm">
                  Lines starting with <code className="text-mainframe-amber">*</code> are comments. 
                  Use them liberally to document your code.
                </p>
              </div>
            </div>
          </div>
          
          <div className="info-box warning">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-mainframe-amber mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-mainframe-amber mb-1">Column Positions</h4>
                <p className="text-gray-300 text-sm">
                  EasyTrieve is column-sensitive. Statements must start in specific columns 
                  (typically column 1 for statements, indented for continuation).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: FILE Definitions */}
      <section className="mb-12">
        <h2 className="section-title">3. FILE Definitions</h2>
        
        <p className="text-gray-300 mb-6">
          FILE statements define the input and output files your program will process. 
          Each file must be defined before it can be used in the JOB statement.
        </p>

        <h3 className="subsection-title">FILE Statement Syntax</h3>

        <CodeBlock
          title="FILE_SYNTAX.EZTV"
          code={`* FILE Syntax:
* FILE filename [file-type] [options]
*
* Common File Types:
*   (blank)  = Sequential file (default)
*   VSAM     = VSAM file
*   VS       = VSAM file (alternate)
*   PRINTER  = Print output file
*
* ---- SEQUENTIAL INPUT FILE ----
FILE CUSTMAST
  CUST-ID        1   10  A    * Customer ID
  CUST-NAME     11   40  A    * Customer Name
  CUST-TYPE     51    1  A    * Type: R=Retail, C=Commercial
  OPEN-DATE     52    8  N  0 * Account Open Date YYYYMMDD
  BALANCE       60   13  P  2 * Current Balance
  CREDIT-LIM    73   11  P  2 * Credit Limit
*
* ---- VSAM KSDS FILE ----
FILE ACCTVSAM VS
  ACCT-KEY       1   15  A    * Primary Key
  ACCT-DATA     16  200  A    * Account Data
*
* ---- PRINTER OUTPUT ----
FILE REPORT PRINTER
*
* ---- SEQUENTIAL OUTPUT ----
FILE EXTRACT`}
        />

        <h3 className="subsection-title mt-8">FILE Options for Financial Processing</h3>

        <div className="overflow-x-auto">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">VIRTUAL</td>
                <td>Creates virtual file for report processing</td>
                <td>FILE REPORT VIRTUAL</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">FB(lrecl)</td>
                <td>Fixed Block record length</td>
                <td>FILE TRANS FB(200)</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">VB(lrecl)</td>
                <td>Variable Block record length</td>
                <td>FILE LOG VB(500)</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">UPDATE</td>
                <td>File will be updated in place</td>
                <td>FILE MASTER UPDATE</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">PRINTER</td>
                <td>Output to printer/SYSPRINT</td>
                <td>FILE LISTING PRINTER</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: DEFINE Statements & Field Types */}
      <section className="mb-12">
        <h2 className="section-title">4. DEFINE Statements & Field Types</h2>
        
        <p className="text-gray-300 mb-6">
          DEFINE statements declare the fields within your files and working storage. 
          Understanding field types is crucial for proper data handling in financial applications.
        </p>

        <FlowDiagram chart={dataTypesDiagram} title="Data Types Overview" className="mb-6" />

        <h3 className="subsection-title">DEFINE Statement Syntax</h3>

        <CodeBlock
          title="DEFINE_SYNTAX.EZTV"
          code={`* DEFINE Syntax:
* field-name  start-pos  length  type  [decimals]
*
* Type Codes:
*   A = Alphanumeric (text)
*   N = Numeric Display (EBCDIC numbers)
*   P = Packed Decimal (computational)
*   B = Binary (halfword/fullword)
*   U = Unsigned Packed Decimal
*
* ----- FIELD DEFINITION EXAMPLES -----
FILE ACCOUNTS
* Field Name    Pos  Len Type Dec  Description
  ACCT-NUMBER    1   12   A       * Account Number (text)
  ACCT-TYPE      13   2   A       * Account Type Code
  CUST-NAME      15  35   A       * Customer Name
  SSN            50   9   N    0  * Social Security Number
  OPEN-DATE      59   8   N    0  * Open Date YYYYMMDD
  BALANCE        67  11   P    2  * Account Balance $$$$$$$$.cc
  INTEREST-RATE  78   5   P    4  * Interest Rate 0.0000
  TRANS-COUNT    83   4   B    0  * Transaction Count (binary)
  STATUS-FLAG    87   1   A       * Status: A=Active, I=Inactive`}
          highlightLines={[14, 18, 19, 21]}
        />

        <h3 className="subsection-title mt-8">Data Type Details</h3>

        <div className="space-y-4">
          {/* Alpha */}
          <div className="card-highlight">
            <h4 className="text-mainframe-green font-mono font-bold mb-2">A - Alphanumeric</h4>
            <p className="text-gray-300 text-sm mb-3">
              Used for text data including account numbers, names, addresses, and status codes.
              Can contain any character (letters, numbers, special characters).
            </p>
            <div className="bg-mainframe-darker rounded p-3 font-mono text-sm">
              <span className="text-gray-500">*</span> CUST-NAME 1 30 <span className="text-accent-cyan">A</span> <span className="text-gray-500">* 30-character customer name</span>
            </div>
          </div>

          {/* Numeric Display */}
          <div className="card-highlight">
            <h4 className="text-mainframe-green font-mono font-bold mb-2">N - Numeric Display</h4>
            <p className="text-gray-300 text-sm mb-3">
              EBCDIC numeric characters (0-9). Used for dates, IDs, and numbers that won't be 
              used in arithmetic. Each digit occupies one byte.
            </p>
            <div className="bg-mainframe-darker rounded p-3 font-mono text-sm">
              <span className="text-gray-500">*</span> TRANS-DATE 1 8 <span className="text-accent-cyan">N</span> 0 <span className="text-gray-500">* YYYYMMDD format</span>
            </div>
          </div>

          {/* Packed Decimal */}
          <div className="card-highlight">
            <h4 className="text-mainframe-green font-mono font-bold mb-2">P - Packed Decimal</h4>
            <p className="text-gray-300 text-sm mb-3">
              Most efficient format for arithmetic operations. Two digits per byte plus sign nibble.
              <strong className="text-white"> Essential for financial calculations</strong> (balances, amounts, rates).
            </p>
            <div className="bg-mainframe-darker rounded p-3 font-mono text-sm mb-2">
              <span className="text-gray-500">*</span> AMOUNT 1 9 <span className="text-accent-cyan">P</span> 2 <span className="text-gray-500">* 15 digits, 2 decimal places</span>
            </div>
            <p className="text-xs text-gray-500">
              Formula: Digits = (Length × 2) - 1 → 9 bytes = 17 digits storage
            </p>
          </div>

          {/* Binary */}
          <div className="card-highlight">
            <h4 className="text-mainframe-green font-mono font-bold mb-2">B - Binary</h4>
            <p className="text-gray-300 text-sm mb-3">
              Integer values in binary format. Common lengths: 2 bytes (halfword: -32768 to 32767) 
              or 4 bytes (fullword: -2B to 2B). Used for counters and flags.
            </p>
            <div className="bg-mainframe-darker rounded p-3 font-mono text-sm">
              <span className="text-gray-500">*</span> REC-COUNT 1 4 <span className="text-accent-cyan">B</span> 0 <span className="text-gray-500">* Fullword counter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Working Storage */}
      <section className="mb-12">
        <h2 className="section-title">5. Working Storage (W Fields)</h2>
        
        <p className="text-gray-300 mb-6">
          Working storage fields (W fields) are runtime variables not tied to any file. 
          They're essential for accumulators, counters, temporary storage, and intermediate calculations.
        </p>

        <CodeBlock
          title="WORKING_STORAGE.EZTV"
          code={`* ----- WORKING STORAGE DEFINITIONS -----
* Syntax: W field-name W length type [decimals]
*
* --- COUNTERS ---
W REC-READ       W  7  N  0   * Records read counter
W REC-WRITTEN    W  7  N  0   * Records written counter
W REC-REJECTED   W  7  N  0   * Rejected records counter
*
* --- ACCUMULATORS ---
W TOTAL-DEBITS   W 15  P  2   * Sum of all debits
W TOTAL-CREDITS  W 15  P  2   * Sum of all credits
W NET-BALANCE    W 15  P  2   * Net balance calculation
W GRAND-TOTAL    W 17  P  2   * Grand total accumulator
*
* --- DATE/TIME FIELDS ---
W CURRENT-DATE   W  8  N  0   * System date YYYYMMDD
W CURRENT-TIME   W  6  N  0   * System time HHMMSS
W REPORT-DATE    W 10  A      * Formatted date MM/DD/YYYY
*
* --- TEMPORARY STORAGE ---
W WORK-FIELD     W 50  A      * General work area
W SAVE-KEY       W 20  A      * Saved key for comparison
W PREV-ACCT      W 12  A      * Previous account number
*
* --- FLAGS ---
W FIRST-TIME     W  1  A      * First record flag
W EOF-FLAG       W  1  A      * End of file flag
*
* --- REPORT CONTROLS ---
W PAGE-NUM       W  5  N  0   * Page number
W LINE-COUNT     W  3  N  0   * Lines printed on page
W MAX-LINES      W  3  N  0   * Maximum lines per page`}
        />

        <div className="info-box tip mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-green mb-1">Initialization</h4>
              <p className="text-gray-300 text-sm">
                Working storage fields are automatically initialized: numeric fields to zeros, 
                alpha fields to spaces. Use MOVE statements in your JOB section to set initial values if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: PARM Options */}
      <section className="mb-12">
        <h2 className="section-title">6. PARM Options</h2>
        
        <p className="text-gray-300 mb-6">
          The PARM statement controls program execution options. It must appear before 
          any FILE definitions and affects how EasyTrieve processes your program.
        </p>

        <CodeBlock
          title="PARM_OPTIONS.EZTV"
          code={`* ----- COMMON PARM OPTIONS -----
*
* Debug options (use during development)
PARM DEBUG(SHORT)     * Short diagnostic messages
PARM DEBUG(LONG)      * Detailed diagnostic messages
PARM DEBUG(NONE)      * No debug output (production)
*
* Date format options
PARM DATE(MDY)        * Month/Day/Year format
PARM DATE(DMY)        * Day/Month/Year format
PARM DATE(YMD)        * Year/Month/Day format (ISO)
*
* Record count options
PARM NOADD            * Don't add record counts to listing
PARM NOLIMIT          * No limit on records processed
PARM LIMIT(10000)     * Limit processing to 10000 records
*
* ----- PRODUCTION EXAMPLE -----
PARM DEBUG(NONE) DATE(MDY)
*
* ----- DEVELOPMENT EXAMPLE -----
PARM DEBUG(SHORT) LIMIT(1000)`}
        />

        <h3 className="subsection-title mt-8">Essential PARM Options Reference</h3>

        <div className="overflow-x-auto">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Option</th>
                <th>Values</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">DEBUG</td>
                <td>SHORT, LONG, NONE</td>
                <td>Controls diagnostic output level</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">DATE</td>
                <td>MDY, DMY, YMD</td>
                <td>Sets date format for date functions</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">LIMIT</td>
                <td>(number)</td>
                <td>Maximum records to process</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">EXITON</td>
                <td>RC=n</td>
                <td>Exit on specified return code</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">NOADD</td>
                <td>-</td>
                <td>Suppress record counts in output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="section-title">Module Summary</h2>
        
        <div className="card-highlight">
          <h3 className="text-lg font-display font-semibold text-white mb-4">Key Takeaways</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
              <span>EasyTrieve programs have a structured hierarchy: PARM → FILE → DEFINE → JOB → Processing → STOP</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
              <span>FILE definitions describe both the file and its record layout</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
              <span>Use <strong className="text-mainframe-green">P (Packed Decimal)</strong> for all financial calculations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
              <span>Working storage (W fields) provide runtime variables for counters, accumulators, and temporary data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
              <span>PARM options control debugging, date formats, and processing limits</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Next Module Link */}
      <div className="flex justify-between items-center pt-8 border-t border-mainframe-green/20">
        <div />
        <Link
          to="/module/2"
          className="btn-primary flex items-center gap-2"
        >
          Next: File Processing
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
