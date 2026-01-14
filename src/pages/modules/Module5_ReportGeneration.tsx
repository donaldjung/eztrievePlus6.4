import CodeBlock from '../../components/code/CodeBlock'
import FlowDiagram from '../../components/visualizations/FlowDiagram'
import { FileText, Lightbulb, Info } from 'lucide-react'

export default function Module5ReportGeneration() {
  const reportStructureDiagram = `
flowchart TB
    subgraph report [Report Structure]
        TITLE[TITLE Lines] --> HEADING[Column HEADINGS]
        HEADING --> DETAIL[Detail LINES]
        DETAIL --> CONTROL{Control Break?}
        CONTROL --> |Yes| SUBTOTAL[Subtotal Lines]
        CONTROL --> |No| DETAIL
        SUBTOTAL --> DETAIL
        DETAIL --> EOF{End of File?}
        EOF --> |No| DETAIL
        EOF --> |Yes| FINAL[FINAL Totals]
    end
  `

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-mainframe-green/20 flex items-center justify-center border border-mainframe-green/30">
            <FileText className="text-mainframe-green" size={24} />
          </div>
          <div>
            <p className="text-sm font-mono text-gray-500">MODULE 5</p>
            <h1 className="text-3xl font-display font-bold text-white">Report Generation</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Create professional formatted reports with titles, headings, control breaks, 
          subtotals, and final totals using EasyTrieve's powerful REPORT facility.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card-highlight mb-8">
        <h3 className="text-lg font-display font-semibold text-mainframe-green mb-4">In This Module</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">1</span>
            REPORT Statement Fundamentals
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">2</span>
            TITLE and HEADING Lines
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">3</span>
            Detail LINE Definitions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">4</span>
            Control Break Processing
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-green/20 text-mainframe-green text-xs flex items-center justify-center font-mono">5</span>
            Page Control and Formatting
          </li>
        </ul>
      </div>

      <FlowDiagram chart={reportStructureDiagram} title="Report Processing Flow" className="mb-8" />

      {/* Section 1: REPORT Statement */}
      <section className="mb-12">
        <h2 className="section-title">1. REPORT Statement Fundamentals</h2>
        
        <p className="text-gray-300 mb-6">
          The REPORT statement defines a complete report including its layout, 
          control breaks, and summary processing. It's the foundation of 
          EasyTrieve's reporting capability.
        </p>

        <CodeBlock
          title="REPORT_BASIC.EZTV"
          code={`* ============================================
* BASIC REPORT DEFINITION
* ============================================
*
FILE ACCOUNTS
  ACCT-NUM       1   12  A
  ACCT-NAME     13   30  A
  ACCT-TYPE     43    2  A
  ACCT-BAL      45   11  P  2
  BRANCH        56    4  A
*
FILE RPTFILE PRINTER
*
* Define the report
REPORT ACCT-REPORT LINESIZE 132 PAGESIZE 60
*
* Sequence (sort) the report data
  SEQUENCE BRANCH ACCT-TYPE
*
* Control breaks for subtotals
  CONTROL BRANCH ACCT-TYPE FINAL
*
* Report title
  TITLE 1 'ACCOUNT BALANCE REPORT'
  TITLE 2 'AS OF ' SYSDATE
*
* Column headings
  HEADING ACCT-NUM     'ACCOUNT'     'NUMBER'
  HEADING ACCT-NAME    'CUSTOMER'    'NAME'
  HEADING ACCT-TYPE    'TYPE'
  HEADING ACCT-BAL     'BALANCE'
*
* Detail line (each record)
  LINE ACCT-NUM ACCT-NAME ACCT-TYPE ACCT-BAL
*
JOB INPUT ACCOUNTS
  PRINT ACCT-REPORT
STOP`}
          highlightLines={[15, 18, 21, 24, 28, 34, 37]}
        />

        <h3 className="subsection-title mt-8">REPORT Statement Options</h3>

        <div className="overflow-x-auto">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Option</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">LINESIZE</td>
                <td>133</td>
                <td>Maximum characters per line</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">PAGESIZE</td>
                <td>60</td>
                <td>Lines per page</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">SUMCTL</td>
                <td>NONE</td>
                <td>Summary control: NONE, PAGE, REPORT</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">NOADJUST</td>
                <td>-</td>
                <td>Don't adjust column spacing</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">NOHEADING</td>
                <td>-</td>
                <td>Suppress automatic headings</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">SKIP</td>
                <td>1</td>
                <td>Lines to skip between details</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: TITLE and HEADING */}
      <section className="mb-12">
        <h2 className="section-title">2. TITLE and HEADING Lines</h2>
        
        <p className="text-gray-300 mb-6">
          TITLE lines appear at the top of each page. HEADING lines provide 
          column headers for your data. Both support positioning and multiple lines.
        </p>

        <CodeBlock
          title="TITLE_HEADING.EZTV"
          code={`* ============================================
* TITLE AND HEADING DEFINITIONS
* ============================================
*
REPORT FINANCIAL-STMT LINESIZE 132 PAGESIZE 55
  SEQUENCE REGION BRANCH
  CONTROL REGION BRANCH FINAL
*
* Multiple title lines with positioning
  TITLE 1  1 'FIRST NATIONAL BANK'
  TITLE 1 50 'DAILY TRANSACTION REPORT'
  TITLE 1 RIGHT 'PAGE: ' PAGE-NUMBER
*
  TITLE 2  1 'OPERATIONS DIVISION'
  TITLE 2 50 'RUN DATE: ' SYSDATE
  TITLE 2 RIGHT 'TIME: ' SYSTIME
*
  TITLE 3  1 '=' COL 131 '='   * Line of equals signs
*
* Column headings (can be multi-line)
  HEADING REGION       'REGION'
  HEADING BRANCH       'BRANCH'    'CODE'
  HEADING ACCT-NUM     'ACCOUNT'   'NUMBER'
  HEADING TRANS-TYPE   'TRANS'     'TYPE'
  HEADING TRANS-AMT    'TRANSACTION' 'AMOUNT'
  HEADING RUN-BAL      'RUNNING'   'BALANCE'
*
* Heading with custom position
  HEADING 1 100 'AUDIT'
  HEADING 2 100 'CODE'
*
  LINE REGION BRANCH ACCT-NUM TRANS-TYPE TRANS-AMT RUN-BAL`}
          highlightLines={[10, 11, 12, 22, 23]}
        />

        <div className="info-box note mt-6">
          <div className="flex items-start gap-3">
            <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
            <div>
              <h4 className="font-semibold text-accent-cyan mb-1">Title Positioning</h4>
              <p className="text-gray-300 text-sm">
                <strong>Numeric position:</strong> Column number (1-based)<br/>
                <strong>RIGHT:</strong> Right-justify on the line<br/>
                <strong>CENTER:</strong> Center on the line
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: LINE Definitions */}
      <section className="mb-12">
        <h2 className="section-title">3. Detail LINE Definitions</h2>
        
        <p className="text-gray-300 mb-6">
          LINE statements define what data appears on each detail line of the report.
          You can have multiple LINE types for different purposes.
        </p>

        <CodeBlock
          title="LINE_DEFINITIONS.EZTV"
          code={`* ============================================
* LINE STATEMENT VARIATIONS
* ============================================
*
REPORT TRANS-DETAIL
  SEQUENCE ACCT-NUM TRANS-DATE
  CONTROL ACCT-NUM FINAL
*
* Basic detail line
  LINE ACCT-NUM TRANS-DATE TRANS-TYPE TRANS-AMT
*
* Line with literal text
  LINE 'ACCOUNT: ' ACCT-NUM ' DATE: ' TRANS-DATE
*
* Line with column positions
  LINE 01 ACCT-NUM
  LINE 20 TRANS-DATE
  LINE 35 TRANS-TYPE
  LINE 45 TRANS-AMT
*
* Line with MASK for formatting
  LINE TRANS-AMT MASK '$$$,$$$,$$9.99CR'
*
* Multiple detail lines per record
  LINE 1 ACCT-NUM ACCT-NAME
  LINE 2 '  ADDRESS: ' STREET-ADDR
  LINE 3 '  CITY: ' CITY ', ' STATE ' ' ZIP
*
* Conditional line printing
  IF TRANS-AMT GT 10000.00
    LINE 'HIGH VALUE: ' ACCT-NUM TRANS-AMT
  ELSE
    LINE ACCT-NUM TRANS-AMT
  END-IF`}
          highlightLines={[10, 13, 16, 22, 25, 26, 27]}
        />

        <h3 className="subsection-title mt-8">Summary Lines</h3>

        <CodeBlock
          title="SUMMARY_LINES.EZTV"
          code={`* ============================================
* SUMMARY LINES FOR CONTROL BREAKS
* ============================================
*
REPORT BRANCH-SUMMARY
  SEQUENCE REGION BRANCH
  CONTROL REGION BRANCH FINAL
*
  TITLE 1 'BRANCH ACTIVITY SUMMARY'
  HEADING REGION 'REGION'
  HEADING BRANCH 'BRANCH'
  HEADING TRANS-AMT 'AMOUNT'
*
* Detail line with TALLY (auto-sum)
  LINE REGION BRANCH TRANS-AMT TALLY
*
* Control break summary lines
* REGION break - summarize by region
  SUM REGION 'REGION TOTAL:' TRANS-AMT
*
* BRANCH break - summarize by branch
  SUM BRANCH 'BRANCH TOTAL:' TRANS-AMT
*
* FINAL summary - grand total
  SUM FINAL 'GRAND TOTAL: ' TRANS-AMT
*
* With record count
  SUM FINAL 'TOTAL TRANSACTIONS: ' COUNT`}
          highlightLines={[15, 19, 22, 25, 28]}
        />
      </section>

      {/* Section 4: Control Breaks */}
      <section className="mb-12">
        <h2 className="section-title">4. Control Break Processing</h2>
        
        <p className="text-gray-300 mb-6">
          Control breaks trigger summary processing when key values change. 
          This is essential for creating hierarchical reports with subtotals at each level.
        </p>

        <CodeBlock
          title="CONTROL_BREAKS.EZTV"
          code={`* ============================================
* MULTI-LEVEL CONTROL BREAK REPORT
* Regional > Branch > Account Hierarchy
* ============================================
*
FILE TRANSACTIONS
  REGION         1    4  A
  BRANCH         5    4  A
  ACCT-NUM       9   12  A
  TRANS-DATE    21    8  N  0
  TRANS-TYPE    29    2  A
  TRANS-AMT     31   11  P  2
*
FILE RPTOUT PRINTER
*
REPORT HIERARCHY-RPT LINESIZE 132
* Must sequence by control fields in same order
  SEQUENCE REGION BRANCH ACCT-NUM
*
* Control fields in major to minor order
  CONTROL REGION BRANCH ACCT-NUM FINAL
*
  TITLE 1 'TRANSACTION HIERARCHY REPORT'
  TITLE 2 '=' COL 80 '='
*
  HEADING REGION    'REGION'
  HEADING BRANCH    'BRANCH'
  HEADING ACCT-NUM  'ACCOUNT'
  HEADING TRANS-AMT 'AMOUNT'
*
* Detail line
  LINE REGION BRANCH ACCT-NUM TRANS-AMT
*
* Account level break (most minor)
  SUM ACCT-NUM '  ACCOUNT TOTAL:' +18 TRANS-AMT
*
* Branch level break
  SUM BRANCH ' BRANCH ' BRANCH ' TOTAL:' +18 TRANS-AMT
*
* Region level break (most major)
  SUM REGION 'REGION ' REGION ' TOTAL:' +18 TRANS-AMT
*
* Final totals
  SUM FINAL '*** GRAND TOTAL ***' +14 TRANS-AMT
*
JOB INPUT TRANSACTIONS
  PRINT HIERARCHY-RPT
STOP`}
          highlightLines={[18, 21, 35, 38, 41, 44]}
        />

        <div className="info-box tip mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-green mb-1">Control Break Order</h4>
              <p className="text-gray-300 text-sm">
                CONTROL fields must be listed from <strong>major to minor</strong>. 
                When a major field changes, all minor breaks also trigger. 
                FINAL always processes at end of report.
              </p>
            </div>
          </div>
        </div>

        <h3 className="subsection-title mt-8">BEFORE and AFTER Procedures</h3>

        <CodeBlock
          title="BEFORE_AFTER.EZTV"
          code={`* ============================================
* BEFORE/AFTER CONTROL BREAK PROCEDURES
* Custom processing at break points
* ============================================
*
W BRANCH-COUNT  W   5  N  0
W REGION-COUNT  W   5  N  0
*
REPORT CUSTOM-BREAKS
  SEQUENCE REGION BRANCH
  CONTROL REGION BRANCH FINAL
*
* Before first record of new region
BEFORE REGION.
  MOVE 0 TO REGION-COUNT
  NEWPAGE
  LINE 'BEGINNING REGION: ' REGION
*
* After last record of branch
AFTER BRANCH.
  LINE 'BRANCH ' BRANCH ' RECORDS: ' BRANCH-COUNT
  MOVE 0 TO BRANCH-COUNT
*
* After last record of region
AFTER REGION.
  LINE 'REGION ' REGION ' BRANCHES: ' REGION-COUNT
*
* Called for each detail record
  LINE REGION BRANCH ACCT-NUM TRANS-AMT
  ADD 1 TO BRANCH-COUNT
  ADD 1 TO REGION-COUNT`}
          highlightLines={[14, 20, 25]}
        />
      </section>

      {/* Section 5: Page Control */}
      <section className="mb-12">
        <h2 className="section-title">5. Page Control and Formatting</h2>
        
        <p className="text-gray-300 mb-6">
          Professional reports require proper page handling including page breaks, 
          overflow detection, and consistent formatting across pages.
        </p>

        <CodeBlock
          title="PAGE_CONTROL.EZTV"
          code={`* ============================================
* PAGE CONTROL AND FORMATTING
* ============================================
*
REPORT PAGE-CONTROL-RPT LINESIZE 132 PAGESIZE 55
  SEQUENCE DEPT EMPLOYEE
  CONTROL DEPT FINAL
*
* Titles automatically repeat on each page
  TITLE 1 CENTER 'EMPLOYEE LISTING'
  TITLE 2 LEFT 'DEPARTMENT REPORT'
  TITLE 2 RIGHT 'PAGE ' PAGE-NUMBER
*
* Force new page at control break
BEFORE DEPT.
  NEWPAGE
*
* Manual page control in processing
JOB INPUT EMPLOYEES
  PRINT PAGE-CONTROL-RPT
*
* Check for page overflow
  IF LINE-COUNT GT 50
    NEWPAGE
    MOVE 1 TO LINE-COUNT
  END-IF
*
* Print detail and track lines
  LINE DEPT EMPLOYEE-NAME SALARY
  ADD 1 TO LINE-COUNT
*
STOP
*
* ============================================
* PAGE-NUMBER is automatic system variable
* LINE-COUNT must be managed manually
* NEWPAGE forces page break
* ============================================`}
          highlightLines={[12, 16, 24, 25]}
        />

        <h3 className="subsection-title mt-8">Report Formatting Options</h3>

        <CodeBlock
          title="FORMATTING_OPTIONS.EZTV"
          code={`* ============================================
* ADVANCED FORMATTING OPTIONS
* ============================================
*
REPORT FORMATTED-RPT
  LINESIZE 132
  PAGESIZE 60
  SKIP 1          * Blank line between details
  SUMCTL PAGE     * Summary on page break too
*
* Column spacing and alignment
  LINE ACCT-NUM              * Default left align
  LINE ACCT-NAME COL 20      * Start at column 20
  LINE BALANCE RIGHT         * Right align
  LINE STATUS CENTER         * Center
*
* Conditional formatting
  IF BALANCE LT 0
    LINE '** NEGATIVE **' ACCT-NUM BALANCE
  ELSE
    LINE ACCT-NUM BALANCE
  END-IF
*
* Blank lines for readability
  LINE ' '                   * Blank line
  LINE '=' COL 80 '='        * Separator line
*
* Underlines under totals
  SUM BRANCH TRANS-AMT
  LINE '-' COL 40 '-' COL 50 '-'`}
        />

        <div className="overflow-x-auto mt-6">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>System Variable</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">PAGE-NUMBER</td>
                <td>N 5</td>
                <td>Current page number</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">LINE-COUNT</td>
                <td>N 3</td>
                <td>Current line on page</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">SYSDATE</td>
                <td>N 8</td>
                <td>System date YYYYMMDD</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">SYSTIME</td>
                <td>N 6</td>
                <td>System time HHMMSS</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">RECORD-COUNT</td>
                <td>N 7</td>
                <td>Records processed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-mainframe-green/20">
        <a href="/module/4" className="btn-secondary flex items-center gap-2">
          <span>←</span>
          Previous: Data Manipulation
        </a>
        <a href="/module/6" className="btn-primary flex items-center gap-2">
          Next: Sorting & Summarization
          <span>→</span>
        </a>
      </div>
    </div>
  )
}
