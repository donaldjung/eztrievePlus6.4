import { Link } from 'react-router-dom'
import CodeBlock from '../../components/code/CodeBlock'
import FlowDiagram from '../../components/visualizations/FlowDiagram'
import { Database, Lightbulb, AlertTriangle, Info } from 'lucide-react'

export default function Module2FileProcessing() {
  const fileTypeDiagram = `
flowchart TB
    subgraph files [File Types in EasyTrieve]
        SEQ[Sequential QSAM]
        KSDS[VSAM KSDS]
        ESDS[VSAM ESDS]
        RRDS[VSAM RRDS]
        DB2[DB2 Tables]
    end
    
    SEQ --> |GET/PUT| BATCH[Batch Processing]
    KSDS --> |KEY Access| RANDOM[Random Access]
    ESDS --> |Sequential| LOGGING[Logging/Audit]
    RRDS --> |Relative Rec| DIRECT[Direct Access]
    DB2 --> |SQL| RELATIONAL[Relational Queries]
  `

  const matchingDiagram = `
flowchart TB
    subgraph matching [File Matching Logic]
        START[Start] --> READ1[Read Master]
        READ1 --> READ2[Read Trans]
        READ2 --> COMPARE{Compare Keys}
        COMPARE --> |Master LT Trans| NOMATCH1[No Match - Master]
        COMPARE --> |Master EQ Trans| MATCH[Match Found]
        COMPARE --> |Master GT Trans| NOMATCH2[No Match - Trans]
        NOMATCH1 --> READ1
        MATCH --> PROCESS[Process Match]
        PROCESS --> READ2
        NOMATCH2 --> READ2
    end
  `

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center border border-accent-cyan/30">
            <Database className="text-accent-cyan" size={24} />
          </div>
          <div>
            <p className="text-sm font-mono text-gray-500">MODULE 2</p>
            <h1 className="text-3xl font-display font-bold text-white">File Processing</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Master file I/O operations including sequential files (QSAM), VSAM access methods 
          (KSDS, ESDS, RRDS), and DB2 integration for comprehensive data processing.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card-highlight mb-8">
        <h3 className="text-lg font-display font-semibold text-accent-cyan mb-4">In This Module</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">1</span>
            Sequential File Processing (QSAM)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">2</span>
            VSAM Access Methods
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">3</span>
            DB2 Integration
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">4</span>
            Synchronized File Processing
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-cyan/20 text-accent-cyan text-xs flex items-center justify-center font-mono">5</span>
            File Status & Error Handling
          </li>
        </ul>
      </div>

      <FlowDiagram chart={fileTypeDiagram} title="EasyTrieve File Types" className="mb-8" />

      {/* Section 1: Sequential Files */}
      <section className="mb-12">
        <h2 className="section-title">1. Sequential File Processing (QSAM)</h2>
        
        <p className="text-gray-300 mb-6">
          Sequential files are the most common file type in batch processing. Records are 
          read and written in order, from first to last. QSAM (Queued Sequential Access Method) 
          provides efficient buffered I/O for these files.
        </p>

        <h3 className="subsection-title">Basic GET/PUT Operations</h3>

        <CodeBlock
          title="SEQUENTIAL_IO.EZTV"
          code={`* ============================================
* SEQUENTIAL FILE PROCESSING EXAMPLE
* Process transactions and create extract file
* ============================================
*
FILE TRANSIN
  TRANS-ACCT     1   12  A    * Account Number
  TRANS-TYPE    13    2  A    * DR=Debit, CR=Credit
  TRANS-AMT     15   11  P  2 * Transaction Amount
  TRANS-DATE    26    8  N  0 * Transaction Date
  TRANS-DESC    34   30  A    * Description
*
FILE TRANSOUT
  OUT-ACCT       1   12  A
  OUT-AMT       13   11  P  2
  OUT-DATE      24    8  N  0
*
FILE SYSPRINT PRINTER
*
W REC-IN        W  7  N  0
W REC-OUT       W  7  N  0
W TOTAL-AMT     W 15  P  2
*
JOB INPUT TRANSIN
*
* Processing logic executes for each record
  ADD 1 TO REC-IN
*
* Select only debit transactions over $1000
  IF TRANS-TYPE EQ 'DR' AND TRANS-AMT GT 1000.00
    MOVE TRANS-ACCT TO OUT-ACCT
    MOVE TRANS-AMT  TO OUT-AMT
    MOVE TRANS-DATE TO OUT-DATE
    PUT TRANSOUT
    ADD 1 TO REC-OUT
    ADD TRANS-AMT TO TOTAL-AMT
  END-IF
*
AFTER-JOB.
  DISPLAY 'RECORDS READ:    ' REC-IN
  DISPLAY 'RECORDS WRITTEN: ' REC-OUT
  DISPLAY 'TOTAL AMOUNT:    ' TOTAL-AMT
*
STOP`}
          highlightLines={[26, 34, 39]}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="info-box note">
            <div className="flex items-start gap-3">
              <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-accent-cyan mb-1">Automatic GET</h4>
                <p className="text-gray-300 text-sm">
                  The <code className="text-mainframe-green">JOB INPUT filename</code> automatically 
                  reads records. The processing logic executes once per record until EOF.
                </p>
              </div>
            </div>
          </div>
          
          <div className="info-box tip">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-mainframe-green mb-1">AFTER-JOB</h4>
                <p className="text-gray-300 text-sm">
                  The <code className="text-mainframe-green">AFTER-JOB</code> procedure executes 
                  once after all records are processed—perfect for final totals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="subsection-title mt-8">File Copy with Selection</h3>

        <CodeBlock
          title="FILE_COPY_SELECT.EZTV"
          code={`* ============================================
* FILE COPY WITH SELECTION CRITERIA
* Select active accounts from master file
* ============================================
*
FILE CUSTMAST
  CUST-NUM       1   10  A
  CUST-NAME     11   30  A
  CUST-STATUS   41    1  A    * A=Active, I=Inactive, C=Closed
  CUST-BAL      42   11  P  2
  CUST-REGION   53    3  A
*
FILE ACTIVEOUT
*
FILE SYSPRINT PRINTER
*
JOB INPUT CUSTMAST
*
* Multiple selection criteria
  IF CUST-STATUS EQ 'A'
    IF CUST-BAL GT 0
      IF CUST-REGION EQ 'NYC' OR CUST-REGION EQ 'LAX'
        PUT ACTIVEOUT
      END-IF
    END-IF
  END-IF
*
STOP`}
        />
      </section>

      {/* Section 2: VSAM */}
      <section className="mb-12">
        <h2 className="section-title">2. VSAM Access Methods</h2>
        
        <p className="text-gray-300 mb-6">
          VSAM (Virtual Storage Access Method) provides powerful indexed and direct access 
          capabilities essential for financial applications requiring random lookups.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Type</th>
                <th>Full Name</th>
                <th>Access Method</th>
                <th>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green font-bold">KSDS</td>
                <td>Key-Sequenced Data Set</td>
                <td>By primary/alternate key</td>
                <td>Customer master, Account lookup</td>
              </tr>
              <tr>
                <td className="text-mainframe-green font-bold">ESDS</td>
                <td>Entry-Sequenced Data Set</td>
                <td>Sequential by entry order</td>
                <td>Audit logs, Transaction history</td>
              </tr>
              <tr>
                <td className="text-mainframe-green font-bold">RRDS</td>
                <td>Relative Record Data Set</td>
                <td>By relative record number</td>
                <td>Fixed-slot data, Quick lookup tables</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="subsection-title">VSAM KSDS Random Access</h3>

        <CodeBlock
          title="VSAM_KSDS.EZTV"
          code={`* ============================================
* VSAM KSDS RANDOM ACCESS EXAMPLE
* Lookup customer info by account number
* ============================================
*
* Define VSAM KSDS file with key
FILE CUSTVSAM VS
  CUST-KEY       1   12  A    * Primary Key
  CUST-NAME     13   30  A
  CUST-ADDR     43   50  A
  CUST-CITY     93   20  A
  CUST-STATE   113    2  A
  CUST-BAL     115   11  P  2
  CUST-LIMIT   126   11  P  2
*
* Transaction file to process
FILE TRANSIN
  TRANS-ACCT     1   12  A    * Account to lookup
  TRANS-AMT     13   11  P  2
*
FILE REPORT PRINTER
*
W LOOKUP-KEY    W  12  A
W FOUND-FLAG    W   1  A
*
JOB INPUT TRANSIN
*
* Set lookup key from transaction
  MOVE TRANS-ACCT TO LOOKUP-KEY
  MOVE LOOKUP-KEY TO CUST-KEY
*
* Read VSAM record by key
  GET CUSTVSAM KEY CUST-KEY STATUS FOUND-FLAG
*
  IF FOUND-FLAG EQ '0'
*   Record found - process it
    DISPLAY 'FOUND: ' CUST-NAME ' BAL: ' CUST-BAL
    IF TRANS-AMT GT CUST-LIMIT
      DISPLAY '*** OVER LIMIT ***'
    END-IF
  ELSE
*   Record not found
    DISPLAY 'NOT FOUND: ' LOOKUP-KEY
  END-IF
*
STOP`}
          highlightLines={[7, 32, 34]}
        />

        <h3 className="subsection-title mt-8">VSAM Update Operations</h3>

        <CodeBlock
          title="VSAM_UPDATE.EZTV"
          code={`* ============================================
* VSAM UPDATE EXAMPLE
* Update account balances from transactions
* ============================================
*
FILE ACCTVSAM VS UPDATE
  ACCT-KEY       1   12  A
  ACCT-BAL      13   11  P  2
  ACCT-LAST-UPD 24    8  N  0
*
FILE TRANSIN
  TRANS-ACCT     1   12  A
  TRANS-AMT     13   11  P  2
  TRANS-DATE    24    8  N  0
*
W STATUS-CODE   W   1  A
*
JOB INPUT TRANSIN
*
  MOVE TRANS-ACCT TO ACCT-KEY
  GET ACCTVSAM KEY ACCT-KEY STATUS STATUS-CODE UPDATE
*
  IF STATUS-CODE EQ '0'
*   Update the balance
    ADD TRANS-AMT TO ACCT-BAL
    MOVE TRANS-DATE TO ACCT-LAST-UPD
*   Write back the updated record
    PUT ACCTVSAM UPDATE
    DISPLAY 'UPDATED: ' ACCT-KEY ' NEW BAL: ' ACCT-BAL
  ELSE
    DISPLAY 'ACCOUNT NOT FOUND: ' TRANS-ACCT
  END-IF
*
STOP`}
          highlightLines={[6, 21, 28]}
        />

        <div className="info-box warning mt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-mainframe-amber mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-amber mb-1">VSAM Update Locking</h4>
              <p className="text-gray-300 text-sm">
                When you GET with UPDATE, the record is locked until you PUT UPDATE or 
                read another record. Always ensure proper record release in production code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: DB2 */}
      <section className="mb-12">
        <h2 className="section-title">3. DB2 Integration</h2>
        
        <p className="text-gray-300 mb-6">
          EasyTrieve Plus can directly execute SQL statements against DB2 tables, 
          enabling powerful relational data processing within your batch programs.
        </p>

        <CodeBlock
          title="DB2_SELECT.EZTV"
          code={`* ============================================
* DB2 SQL INTEGRATION EXAMPLE
* Extract customer data with SQL SELECT
* ============================================
*
FILE CUSTOUT
  OUT-ACCT       1   12  A
  OUT-NAME      13   30  A
  OUT-BAL       43   11  P  2
  OUT-STATUS    54    1  A
*
* Define host variables for DB2
W DB-ACCT       W  12  A
W DB-NAME       W  30  A
W DB-BAL        W  11  P  2
W DB-STATUS     W   1  A
W SQL-CODE      W   4  B  0
*
JOB INPUT NULL
*
* Execute SQL SELECT with cursor
  SQL
    DECLARE CUST_CURSOR CURSOR FOR
    SELECT ACCOUNT_NUM,
           CUSTOMER_NAME,
           BALANCE,
           STATUS
    FROM   CUSTOMER_MASTER
    WHERE  STATUS = 'A'
      AND  BALANCE > 0
    ORDER BY ACCOUNT_NUM
  END-SQL
*
  SQL OPEN CUST_CURSOR END-SQL
*
* Fetch and process each row
  DO WHILE SQL-CODE EQ 0
    SQL
      FETCH CUST_CURSOR
      INTO :DB-ACCT,
           :DB-NAME,
           :DB-BAL,
           :DB-STATUS
    END-SQL
*
    IF SQL-CODE EQ 0
      MOVE DB-ACCT   TO OUT-ACCT
      MOVE DB-NAME   TO OUT-NAME
      MOVE DB-BAL    TO OUT-BAL
      MOVE DB-STATUS TO OUT-STATUS
      PUT CUSTOUT
    END-IF
  END-DO
*
  SQL CLOSE CUST_CURSOR END-SQL
*
STOP`}
          highlightLines={[22, 34, 37, 55]}
        />

        <div className="info-box note mt-6">
          <div className="flex items-start gap-3">
            <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
            <div>
              <h4 className="font-semibold text-accent-cyan mb-1">Host Variables</h4>
              <p className="text-gray-300 text-sm">
                DB2 host variables are prefixed with <code className="text-mainframe-amber">:</code> (colon) 
                in SQL statements. They map to your W fields for data transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Synchronized Files */}
      <section className="mb-12">
        <h2 className="section-title">4. Synchronized File Processing</h2>
        
        <p className="text-gray-300 mb-6">
          Synchronized file processing is essential for matching master files with 
          transaction files—a fundamental operation in banking batch processing.
        </p>

        <FlowDiagram chart={matchingDiagram} title="File Matching Algorithm" className="mb-6" />

        <CodeBlock
          title="FILE_MATCHING.EZTV"
          code={`* ============================================
* SYNCHRONIZED FILE MATCHING
* Match transactions to customer master
* ============================================
*
FILE CUSTMAST
  MAST-ACCT      1   12  A    * Key field
  MAST-NAME     13   30  A
  MAST-BAL      43   11  P  2
*
FILE TRANSIN
  TRANS-ACCT     1   12  A    * Key field
  TRANS-AMT     13   11  P  2
  TRANS-TYPE    24    2  A
*
FILE MATCHED
FILE UNMATCHED
FILE SYSPRINT PRINTER
*
W MATCH-COUNT   W   7  N  0
W NOMATCH-COUNT W   7  N  0
*
* JOB with SYNCHRONIZED - both files sorted by key
JOB INPUT (CUSTMAST KEY MAST-ACCT +
           TRANSIN  KEY TRANS-ACCT) SYNCHRONIZED
*
* Check match condition
  IF MAST-ACCT EQ TRANS-ACCT
*   Match found - process transaction
    ADD TRANS-AMT TO MAST-BAL
    PUT MATCHED
    ADD 1 TO MATCH-COUNT
  ELSE
    IF MAST-ACCT NE SPACES
*     Master record with no transaction
      PUT CUSTMAST
    END-IF
    IF TRANS-ACCT NE SPACES
*     Transaction with no master
      PUT UNMATCHED
      ADD 1 TO NOMATCH-COUNT
    END-IF
  END-IF
*
AFTER-JOB.
  DISPLAY 'MATCHED RECORDS:   ' MATCH-COUNT
  DISPLAY 'UNMATCHED RECORDS: ' NOMATCH-COUNT
*
STOP`}
          highlightLines={[24, 25, 28]}
        />

        <div className="info-box warning mt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-mainframe-amber mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-amber mb-1">Pre-Sorted Requirement</h4>
              <p className="text-gray-300 text-sm">
                SYNCHRONIZED processing requires both files to be sorted by the key field 
                in the same sequence. Use JCL SORT or EasyTrieve SORT before matching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Error Handling */}
      <section className="mb-12">
        <h2 className="section-title">5. File Status & Error Handling</h2>
        
        <p className="text-gray-300 mb-6">
          Proper error handling is critical in production financial systems. 
          EasyTrieve provides status codes for all file operations.
        </p>

        <CodeBlock
          title="ERROR_HANDLING.EZTV"
          code={`* ============================================
* FILE STATUS AND ERROR HANDLING
* ============================================
*
FILE CUSTVSAM VS
  CUST-KEY       1   12  A
  CUST-DATA     13  100  A
*
W FILE-STATUS   W   2  A
W ERROR-MSG     W  50  A
*
JOB INPUT NULL
*
  MOVE '123456789012' TO CUST-KEY
  GET CUSTVSAM KEY CUST-KEY STATUS FILE-STATUS
*
* Check status code
  IF FILE-STATUS EQ '00'
    DISPLAY 'RECORD FOUND'
  ELSE
    IF FILE-STATUS EQ '23'
      DISPLAY 'RECORD NOT FOUND'
    ELSE
      IF FILE-STATUS EQ '35'
        DISPLAY 'FILE NOT OPEN'
      ELSE
        MOVE 'UNEXPECTED ERROR: ' TO ERROR-MSG
        DISPLAY ERROR-MSG FILE-STATUS
      END-IF
    END-IF
  END-IF
*
STOP`}
        />

        <h3 className="subsection-title mt-8">Common VSAM Status Codes</h3>

        <div className="overflow-x-auto">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Code</th>
                <th>Meaning</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">00</td>
                <td>Successful operation</td>
                <td>Continue processing</td>
              </tr>
              <tr>
                <td className="text-mainframe-amber">02</td>
                <td>Duplicate key on alternate index</td>
                <td>May be acceptable</td>
              </tr>
              <tr>
                <td className="text-mainframe-amber">10</td>
                <td>End of file reached</td>
                <td>Normal completion</td>
              </tr>
              <tr>
                <td className="text-red-400">21</td>
                <td>Invalid key sequence</td>
                <td>Check sort order</td>
              </tr>
              <tr>
                <td className="text-red-400">22</td>
                <td>Duplicate primary key</td>
                <td>Record exists</td>
              </tr>
              <tr>
                <td className="text-red-400">23</td>
                <td>Record not found</td>
                <td>Key doesn't exist</td>
              </tr>
              <tr>
                <td className="text-red-400">35</td>
                <td>File not defined/open</td>
                <td>Check JCL DD statement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-mainframe-green/20">
        <Link to="/module/1" className="btn-secondary flex items-center gap-2">
          <span>←</span>
          Previous: Fundamentals
        </Link>
        <Link to="/module/3" className="btn-primary flex items-center gap-2">
          Next: Control Structures
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
