import CodeBlock from '../../components/code/CodeBlock'
import FlowDiagram from '../../components/visualizations/FlowDiagram'
import { BarChart3, Lightbulb, Info, AlertTriangle } from 'lucide-react'

export default function Module6SortingSummarization() {
  const sortDiagram = `
flowchart LR
    subgraph sort [Sorting Options]
        EXTERNAL[External SORT] --> |JCL SORT| SORTED1[Pre-sorted Input]
        INTERNAL[Internal SORT] --> |SORT Statement| SORTED2[Runtime Sort]
        SEQBY[SEQUENCE BY] --> |Report Order| SORTED3[Report Sequence]
    end
  `

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center border border-accent-cyan/30">
            <BarChart3 className="text-accent-cyan" size={24} />
          </div>
          <div>
            <p className="text-sm font-mono text-gray-500">MODULE 6</p>
            <h1 className="text-3xl font-display font-bold text-white">Sorting & Summarization</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Learn to sort data, create summaries, and aggregate information using 
          SORT, SEQUENCE BY, and summary functions essential for financial reporting.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card-highlight mb-8">
        <h3 className="text-lg font-display font-semibold text-accent-cyan mb-4">In This Module</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">1</span>
            SORT Statement (Internal Sorting)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">2</span>
            SEQUENCE BY (Report Ordering)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">3</span>
            Summary Functions (SUM, COUNT, AVERAGE)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">4</span>
            FIRST/LAST Record Detection
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">5</span>
            Summary Reports Without Detail
          </li>
        </ul>
      </div>

      <FlowDiagram chart={sortDiagram} title="Sorting Options" className="mb-8" />

      {/* Section 1: SORT Statement */}
      <section className="mb-12">
        <h2 className="section-title">1. SORT Statement (Internal Sorting)</h2>
        
        <p className="text-gray-300 mb-6">
          The SORT statement performs runtime sorting of input data without requiring 
          external JCL SORT utilities. Useful for small to medium datasets.
        </p>

        <CodeBlock
          title="SORT_BASIC.EZTV"
          code={`* ============================================
* INTERNAL SORT EXAMPLES
* ============================================
*
FILE UNSORTED
  ACCT-NUM       1   12  A
  ACCT-NAME     13   30  A
  REGION        43    4  A
  BALANCE       47   11  P  2
  OPEN-DATE     58    8  N  0
*
FILE SORTED
*
* Simple ascending sort
JOB INPUT UNSORTED
  SORT ACCT-NUM
  PUT SORTED
STOP
*
* Descending sort
JOB INPUT UNSORTED
  SORT BALANCE D    * D = Descending
  PUT SORTED
STOP
*
* Multi-key sort
JOB INPUT UNSORTED
  SORT REGION A BALANCE D   * Region asc, Balance desc
  PUT SORTED
STOP
*
* Sort with selection
JOB INPUT UNSORTED
  IF BALANCE GT 0
    SORT REGION ACCT-NUM
    PUT SORTED
  END-IF
STOP`}
          highlightLines={[16, 22, 28, 34]}
        />

        <div className="info-box warning mt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-mainframe-amber mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-amber mb-1">Memory Considerations</h4>
              <p className="text-gray-300 text-sm">
                Internal SORT loads data into memory. For large files (millions of records), 
                use external JCL SORT before your EasyTrieve program for better performance 
                and reliability.
              </p>
            </div>
          </div>
        </div>

        <h3 className="subsection-title mt-8">SORT with USING and GIVING</h3>

        <CodeBlock
          title="SORT_USING_GIVING.EZTV"
          code={`* ============================================
* SORT WITH EXPLICIT FILE SPECIFICATION
* ============================================
*
FILE INFILE1
  KEY-FIELD      1   10  A
  DATA          11   50  A
*
FILE INFILE2
  KEY-FIELD      1   10  A
  DATA          11   50  A
*
FILE SORTWORK
FILE OUTFILE
*
* Sort single file to output
  SORT USING INFILE1 GIVING OUTFILE +
       KEY-FIELD A
*
* Sort and merge multiple input files
JOB INPUT (INFILE1 INFILE2)
  SORT KEY-FIELD
  PUT OUTFILE
STOP`}
        />
      </section>

      {/* Section 2: SEQUENCE BY */}
      <section className="mb-12">
        <h2 className="section-title">2. SEQUENCE BY (Report Ordering)</h2>
        
        <p className="text-gray-300 mb-6">
          SEQUENCE BY orders data within a REPORT definition. Unlike SORT, it works 
          with the automatic report facility and integrates with CONTROL breaks.
        </p>

        <CodeBlock
          title="SEQUENCE_BY.EZTV"
          code={`* ============================================
* SEQUENCE BY IN REPORTS
* ============================================
*
FILE TRANSACTIONS
  REGION         1    4  A
  BRANCH         5    4  A
  TRANS-DATE     9    8  N  0
  TRANS-TYPE    17    2  A
  TRANS-AMT     19   11  P  2
*
FILE RPTFILE PRINTER
*
REPORT TRANS-RPT
* Order data for the report
  SEQUENCE REGION A BRANCH A TRANS-DATE D
*
* Control breaks follow sequence order
  CONTROL REGION BRANCH FINAL
*
  TITLE 1 'TRANSACTION REPORT BY REGION/BRANCH'
  HEADING REGION    'REGION'
  HEADING BRANCH    'BRANCH'
  HEADING TRANS-DATE 'DATE'
  HEADING TRANS-AMT  'AMOUNT'
*
  LINE REGION BRANCH TRANS-DATE TRANS-AMT
*
  SUM BRANCH  '  BRANCH TOTAL:' TRANS-AMT
  SUM REGION  ' REGION TOTAL:' TRANS-AMT
  SUM FINAL   'GRAND TOTAL:' TRANS-AMT
*
JOB INPUT TRANSACTIONS
  PRINT TRANS-RPT
STOP`}
          highlightLines={[16, 19]}
        />

        <div className="info-box note mt-6">
          <div className="flex items-start gap-3">
            <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
            <div>
              <h4 className="font-semibold text-accent-cyan mb-1">SEQUENCE vs SORT</h4>
              <p className="text-gray-300 text-sm">
                <strong>SORT:</strong> Processes all records, outputs sorted file<br/>
                <strong>SEQUENCE:</strong> Orders records for report display only, used with REPORT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Summary Functions */}
      <section className="mb-12">
        <h2 className="section-title">3. Summary Functions (SUM, COUNT, AVERAGE)</h2>
        
        <p className="text-gray-300 mb-6">
          EasyTrieve provides powerful aggregation functions for calculating 
          totals, counts, and averages—essential for financial reports.
        </p>

        <CodeBlock
          title="SUMMARY_FUNCTIONS.EZTV"
          code={`* ============================================
* SUMMARY FUNCTIONS IN REPORTS
* ============================================
*
FILE ACCOUNTS
  ACCT-TYPE      1    2  A
  ACCT-BAL      13   11  P  2
  ACCT-LIMIT    24   11  P  2
  TRANS-COUNT   35    5  N  0
*
REPORT ACCT-SUMMARY
  SEQUENCE ACCT-TYPE
  CONTROL ACCT-TYPE FINAL
*
  TITLE 1 'ACCOUNT SUMMARY BY TYPE'
  HEADING ACCT-TYPE 'TYPE'
  HEADING ACCT-BAL  'BALANCE'
*
* TALLY marks fields for automatic summarization
  LINE ACCT-TYPE ACCT-BAL TALLY
*
* SUM - Total of field values
  SUM ACCT-TYPE 'TYPE TOTAL:' ACCT-BAL
  SUM FINAL 'GRAND TOTAL:' ACCT-BAL
*
* COUNT - Number of records
  SUM ACCT-TYPE 'TYPE COUNT:' COUNT
  SUM FINAL 'TOTAL ACCOUNTS:' COUNT
*
* AVERAGE - Mean value
  SUM ACCT-TYPE 'TYPE AVERAGE:' AVERAGE ACCT-BAL
  SUM FINAL 'OVERALL AVERAGE:' AVERAGE ACCT-BAL
*
* MIN and MAX
  SUM ACCT-TYPE 'MINIMUM BAL:' MIN ACCT-BAL
  SUM ACCT-TYPE 'MAXIMUM BAL:' MAX ACCT-BAL
*
JOB INPUT ACCOUNTS
  PRINT ACCT-SUMMARY
STOP`}
          highlightLines={[20, 23, 27, 31, 35, 36]}
        />

        <h3 className="subsection-title mt-8">Manual Accumulation</h3>

        <CodeBlock
          title="MANUAL_ACCUMULATION.EZTV"
          code={`* ============================================
* MANUAL SUMMARY ACCUMULATION
* For complex calculations not supported by TALLY
* ============================================
*
W TOTAL-BALANCE   W  15  P  2
W TOTAL-OVERLIMIT W  15  P  2
W ACCT-COUNT      W   7  N  0
W OVERLIMIT-COUNT W   7  N  0
W AVG-BALANCE     W  15  P  2
W PCT-OVERLIMIT   W   5  P  2
*
JOB INPUT ACCOUNTS
*
* Accumulate totals
  ADD ACCT-BAL TO TOTAL-BALANCE
  ADD 1 TO ACCT-COUNT
*
* Conditional accumulation
  IF ACCT-BAL GT ACCT-LIMIT
    ADD ACCT-BAL TO TOTAL-OVERLIMIT
    ADD 1 TO OVERLIMIT-COUNT
  END-IF
*
AFTER-JOB.
* Calculate derived values
  IF ACCT-COUNT GT 0
    COMPUTE AVG-BALANCE = TOTAL-BALANCE / ACCT-COUNT
    COMPUTE PCT-OVERLIMIT = (OVERLIMIT-COUNT / ACCT-COUNT) * 100
  END-IF
*
  DISPLAY 'TOTAL ACCOUNTS:     ' ACCT-COUNT
  DISPLAY 'TOTAL BALANCE:      ' TOTAL-BALANCE
  DISPLAY 'AVERAGE BALANCE:    ' AVG-BALANCE
  DISPLAY 'OVERLIMIT ACCOUNTS: ' OVERLIMIT-COUNT
  DISPLAY 'PERCENT OVERLIMIT:  ' PCT-OVERLIMIT '%'
*
STOP`}
          highlightLines={[16, 17, 20, 21, 28, 29]}
        />
      </section>

      {/* Section 4: FIRST/LAST Detection */}
      <section className="mb-12">
        <h2 className="section-title">4. FIRST/LAST Record Detection</h2>
        
        <p className="text-gray-300 mb-6">
          FIRST and LAST keywords detect the first and last records within a control 
          group—useful for special processing at boundaries.
        </p>

        <CodeBlock
          title="FIRST_LAST.EZTV"
          code={`* ============================================
* FIRST AND LAST RECORD DETECTION
* ============================================
*
FILE TRANSACTIONS
  ACCT-NUM       1   12  A
  TRANS-SEQ      13   5  N  0
  TRANS-AMT     18   11  P  2
*
W FIRST-AMT     W  11  P  2
W LAST-AMT      W  11  P  2
W OPEN-BAL      W  11  P  2
W CLOSE-BAL     W  11  P  2
*
REPORT ACCT-ACTIVITY
  SEQUENCE ACCT-NUM TRANS-SEQ
  CONTROL ACCT-NUM FINAL
*
* Detect first record in account group
  IF FIRST ACCT-NUM
    MOVE TRANS-AMT TO FIRST-AMT
    MOVE TRANS-AMT TO OPEN-BAL
    LINE 'OPENING: ' ACCT-NUM OPEN-BAL
  END-IF
*
* Process all records
  LINE ACCT-NUM TRANS-SEQ TRANS-AMT
  ADD TRANS-AMT TO CLOSE-BAL
*
* Detect last record in account group
  IF LAST ACCT-NUM
    MOVE TRANS-AMT TO LAST-AMT
    LINE 'CLOSING: ' ACCT-NUM CLOSE-BAL
    MOVE 0 TO CLOSE-BAL
  END-IF
*
JOB INPUT TRANSACTIONS
  PRINT ACCT-ACTIVITY
STOP`}
          highlightLines={[19, 30]}
        />

        <div className="info-box tip mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-green mb-1">Common Use Cases</h4>
              <p className="text-gray-300 text-sm">
                <strong>FIRST:</strong> Initialize accumulators, print group headers, capture opening balance<br/>
                <strong>LAST:</strong> Print group trailers, output final calculations, reset for next group
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Summary Reports */}
      <section className="mb-12">
        <h2 className="section-title">5. Summary Reports Without Detail</h2>
        
        <p className="text-gray-300 mb-6">
          Sometimes you need only summary information without individual record details.
          Use SUMCTL and SUMMARY options to create compact summary reports.
        </p>

        <CodeBlock
          title="SUMMARY_ONLY.EZTV"
          code={`* ============================================
* SUMMARY-ONLY REPORT (NO DETAIL LINES)
* ============================================
*
FILE TRANSACTIONS
  REGION         1    4  A
  BRANCH         5    4  A
  TRANS-TYPE     9    2  A
  TRANS-AMT     11   11  P  2
*
* SUMCTL REPORT suppresses detail lines
REPORT SUMMARY-ONLY SUMCTL REPORT
  SEQUENCE REGION BRANCH
  CONTROL REGION BRANCH FINAL
*
  TITLE 1 'SUMMARY REPORT - NO DETAIL'
  TITLE 2 'REGION/BRANCH TOTALS ONLY'
*
  HEADING REGION    'REGION'
  HEADING BRANCH    'BRANCH'
  HEADING TRANS-AMT 'AMOUNT'
*
* LINE with TALLY accumulates but doesn't print
  LINE REGION BRANCH TRANS-AMT TALLY
*
* Only SUM lines print
  SUM BRANCH  REGION BRANCH 'TOTAL:' TRANS-AMT COUNT
  SUM REGION  REGION '*** REGION TOTAL:' TRANS-AMT COUNT
  SUM FINAL   '***** GRAND TOTAL:' TRANS-AMT COUNT
*
JOB INPUT TRANSACTIONS
  PRINT SUMMARY-ONLY
STOP`}
          highlightLines={[12, 24, 27, 28, 29]}
        />

        <h3 className="subsection-title mt-8">Summary with Percentage Calculations</h3>

        <CodeBlock
          title="SUMMARY_PERCENT.EZTV"
          code={`* ============================================
* SUMMARY WITH PERCENTAGES
* ============================================
*
W GRAND-TOTAL   W  15  P  2
W GROUP-TOTAL   W  15  P  2
W PCT-OF-TOTAL  W   5  P  2
*
FILE SALES
  REGION         1    4  A
  SALES-AMT     15   11  P  2
*
* First pass - calculate grand total
JOB INPUT SALES NAME PASS1
  ADD SALES-AMT TO GRAND-TOTAL
STOP
*
* Second pass - calculate percentages
JOB INPUT SALES NAME PASS2
  SORT REGION
*
  IF FIRST REGION
    MOVE 0 TO GROUP-TOTAL
  END-IF
*
  ADD SALES-AMT TO GROUP-TOTAL
*
  IF LAST REGION
    IF GRAND-TOTAL GT 0
      COMPUTE PCT-OF-TOTAL = (GROUP-TOTAL / GRAND-TOTAL) * 100
    END-IF
    DISPLAY REGION ' TOTAL: ' GROUP-TOTAL ' PCT: ' PCT-OF-TOTAL '%'
  END-IF
*
STOP`}
          highlightLines={[14, 19, 30]}
        />

        <div className="overflow-x-auto mt-6">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Summary Function</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">SUM / TALLY</td>
                <td>Total of field values</td>
                <td>SUM FINAL TRANS-AMT</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">COUNT</td>
                <td>Number of records</td>
                <td>SUM FINAL COUNT</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">AVERAGE</td>
                <td>Mean value</td>
                <td>SUM FINAL AVERAGE BALANCE</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">MIN</td>
                <td>Minimum value</td>
                <td>SUM FINAL MIN AMOUNT</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">MAX</td>
                <td>Maximum value</td>
                <td>SUM FINAL MAX AMOUNT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-mainframe-green/20">
        <a href="/module/5" className="btn-secondary flex items-center gap-2">
          <span>←</span>
          Previous: Report Generation
        </a>
        <a href="/module/7" className="btn-primary flex items-center gap-2">
          Next: Financial Applications
          <span>→</span>
        </a>
      </div>
    </div>
  )
}
