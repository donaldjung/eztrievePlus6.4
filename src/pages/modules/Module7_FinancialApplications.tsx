import CodeBlock from '../../components/code/CodeBlock'
import FlowDiagram from '../../components/visualizations/FlowDiagram'
import { Building2, Lightbulb, Info, AlertTriangle } from 'lucide-react'

export default function Module7FinancialApplications() {
  const bankingFlowDiagram = `
flowchart TB
    subgraph data [Data Sources]
        CIF[Customer Info File]
        DDA[Demand Deposits]
        SAV[Savings Accounts]
        LOAN[Loan Portfolio]
        GL[General Ledger]
    end
    
    subgraph process [EasyTrieve Processing]
        EXTRACT[Data Extraction]
        RECON[Reconciliation]
        REPORT[Report Generation]
        AUDIT[Audit Trail]
    end
    
    subgraph output [Outputs]
        REG[Regulatory Reports]
        MGMT[Management Reports]
        STMT[Customer Statements]
        EXCEPT[Exception Reports]
    end
    
    data --> process --> output
  `

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-gold/20 flex items-center justify-center border border-accent-gold/30">
            <Building2 className="text-accent-gold" size={24} />
          </div>
          <div>
            <p className="text-sm font-mono text-gray-500">MODULE 7</p>
            <h1 className="text-3xl font-display font-bold text-white">Financial Applications</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Real-world banking and financial institution examples including account reconciliation, 
          regulatory reporting, customer statements, and audit trail processing.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card-highlight mb-8">
        <h3 className="text-lg font-display font-semibold text-accent-gold mb-4">In This Module</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-gold/20 text-accent-gold text-xs flex items-center justify-center font-mono">1</span>
            Account Reconciliation
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-gold/20 text-accent-gold text-xs flex items-center justify-center font-mono">2</span>
            Customer Statement Generation
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-gold/20 text-accent-gold text-xs flex items-center justify-center font-mono">3</span>
            Regulatory Compliance Reports
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-gold/20 text-accent-gold text-xs flex items-center justify-center font-mono">4</span>
            Transaction Audit Trail
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-gold/20 text-accent-gold text-xs flex items-center justify-center font-mono">5</span>
            Loan Delinquency Analysis
          </li>
        </ul>
      </div>

      <FlowDiagram chart={bankingFlowDiagram} title="Banking Data Flow" className="mb-8" />

      {/* Section 1: Account Reconciliation */}
      <section className="mb-12">
        <h2 className="section-title">1. Account Reconciliation</h2>
        
        <p className="text-gray-300 mb-6">
          Daily account reconciliation is critical in banking. This process matches 
          transaction postings to account balances and identifies discrepancies.
        </p>

        <CodeBlock
          title="ACCT_RECONCILIATION.EZTV"
          code={`* ============================================
* DAILY ACCOUNT RECONCILIATION
* Match DDA postings to account master
* ============================================
*
FILE ACCT-MASTER VS                      * VSAM Master File
  AM-ACCT-NUM    1   12  A               * Account Key
  AM-PREV-BAL   13   13  P  2            * Previous Day Balance
  AM-CURR-BAL   26   13  P  2            * Current Balance
  AM-LAST-POST  39    8  N  0            * Last Posting Date
*
FILE DAILY-TRANS                          * Daily Transactions
  DT-ACCT-NUM    1   12  A
  DT-TRANS-DATE 13    8  N  0
  DT-TRANS-TYPE 21    2  A               * DR=Debit CR=Credit
  DT-AMOUNT     23   11  P  2
  DT-SEQ-NUM    34    6  N  0
*
FILE RECON-RPT PRINTER
FILE EXCEPT-FILE                          * Exception output
*
W CALC-BAL      W   13  P  2
W VARIANCE      W   13  P  2
W TRANS-TOTAL   W   13  P  2
W MATCH-FLAG    W    1  A
*
* Process matched master/transaction pairs
JOB INPUT (ACCT-MASTER KEY AM-ACCT-NUM +
           DAILY-TRANS KEY DT-ACCT-NUM) SYNCHRONIZED
*
  MOVE 0 TO TRANS-TOTAL
*
  IF AM-ACCT-NUM EQ DT-ACCT-NUM
*   Match found - accumulate transaction total
    IF DT-TRANS-TYPE EQ 'CR'
      ADD DT-AMOUNT TO TRANS-TOTAL
    ELSE
      SUBTRACT DT-AMOUNT FROM TRANS-TOTAL
    END-IF
*
*   On last transaction for account, reconcile
    IF LAST DT-ACCT-NUM
      COMPUTE CALC-BAL = AM-PREV-BAL + TRANS-TOTAL
      COMPUTE VARIANCE = AM-CURR-BAL - CALC-BAL
*
      IF VARIANCE NE 0
*       Out of balance - write exception
        DISPLAY 'VARIANCE: ' AM-ACCT-NUM ' AMT: ' VARIANCE
        PUT EXCEPT-FILE
      END-IF
    END-IF
  ELSE
*   Unmatched records
    IF AM-ACCT-NUM NE SPACES AND DT-ACCT-NUM EQ SPACES
      DISPLAY 'NO TRANSACTIONS: ' AM-ACCT-NUM
    END-IF
    IF DT-ACCT-NUM NE SPACES AND AM-ACCT-NUM EQ SPACES
      DISPLAY 'ORPHAN TRANS: ' DT-ACCT-NUM
      PUT EXCEPT-FILE
    END-IF
  END-IF
*
STOP`}
          highlightLines={[29, 30, 44, 47]}
        />

        <div className="info-box warning mt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-mainframe-amber mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-amber mb-1">Reconciliation Best Practices</h4>
              <p className="text-gray-300 text-sm">
                Always capture exceptions for research. Include sequence numbers for 
                audit trail. Run reconciliation before and after posting cycles. 
                Set variance tolerance thresholds for known timing differences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Customer Statements */}
      <section className="mb-12">
        <h2 className="section-title">2. Customer Statement Generation</h2>
        
        <p className="text-gray-300 mb-6">
          Monthly customer statements consolidate account activity into a 
          formatted document for mailing or electronic delivery.
        </p>

        <CodeBlock
          title="CUSTOMER_STATEMENT.EZTV"
          code={`* ============================================
* MONTHLY CUSTOMER STATEMENT GENERATOR
* ============================================
*
FILE CUSTOMER                             * Customer Master
  CUST-ID        1   10  A
  CUST-NAME     11   30  A
  CUST-ADDR1    41   35  A
  CUST-ADDR2    76   35  A
  CUST-CITY    111   20  A
  CUST-STATE   131    2  A
  CUST-ZIP     133    9  A
*
FILE STMT-TRANS                           * Statement Transactions
  ST-CUST-ID     1   10  A
  ST-ACCT-NUM   11   12  A
  ST-DATE       23    8  N  0
  ST-DESC       31   30  A
  ST-AMOUNT     61   11  P  2
  ST-TYPE       72    2  A
*
FILE STMT-OUT PRINTER
*
W OPEN-BAL      W   13  P  2
W CLOSE-BAL     W   13  P  2
W TOTAL-DEBITS  W   13  P  2
W TOTAL-CREDITS W   13  P  2
W STMT-DATE     W   10  A
*
REPORT STATEMENT LINESIZE 80 PAGESIZE 66
  SEQUENCE ST-CUST-ID ST-ACCT-NUM ST-DATE
  CONTROL ST-CUST-ID ST-ACCT-NUM FINAL
*
* Customer name/address block
BEFORE ST-CUST-ID.
  NEWPAGE
  GET CUSTOMER KEY CUST-ID EQ ST-CUST-ID
  LINE ' '
  LINE CUST-NAME
  LINE CUST-ADDR1
  LINE CUST-ADDR2
  LINE CUST-CITY ', ' CUST-STATE '  ' CUST-ZIP
  LINE ' '
  MOVE DATE-FORMAT(SYSDATE 'YYYYMMDD' 'MM/DD/YYYY') TO STMT-DATE
  LINE 'STATEMENT DATE: ' STMT-DATE
  LINE '=' COL 79 '='
*
* Account header
BEFORE ST-ACCT-NUM.
  MOVE 0 TO TOTAL-DEBITS
  MOVE 0 TO TOTAL-CREDITS
  LINE ' '
  LINE 'ACCOUNT: ' ST-ACCT-NUM
  LINE '-' COL 60 '-'
  LINE 'DATE' +10 'DESCRIPTION' +25 'DEBITS' +10 'CREDITS' +10 'BALANCE'
  LINE '-' COL 60 '-'
*
* Transaction detail
  IF ST-TYPE EQ 'DR'
    ADD ST-AMOUNT TO TOTAL-DEBITS
    SUBTRACT ST-AMOUNT FROM CLOSE-BAL
    LINE ST-DATE ST-DESC ST-AMOUNT +10 ' ' +10 CLOSE-BAL
  ELSE
    ADD ST-AMOUNT TO TOTAL-CREDITS
    ADD ST-AMOUNT TO CLOSE-BAL
    LINE ST-DATE ST-DESC ' ' +10 ST-AMOUNT +10 CLOSE-BAL
  END-IF
*
* Account summary
AFTER ST-ACCT-NUM.
  LINE '-' COL 60 '-'
  LINE 'TOTALS:' +20 TOTAL-DEBITS +10 TOTAL-CREDITS
  LINE 'CLOSING BALANCE:' +35 CLOSE-BAL
*
JOB INPUT STMT-TRANS
  PRINT STATEMENT
STOP`}
          highlightLines={[36, 51, 60, 66, 72]}
        />
      </section>

      {/* Section 3: Regulatory Reports */}
      <section className="mb-12">
        <h2 className="section-title">3. Regulatory Compliance Reports</h2>
        
        <p className="text-gray-300 mb-6">
          Financial institutions must produce regulatory reports for FDIC, Federal Reserve, 
          and other agencies. These require precise formatting and data validation.
        </p>

        <CodeBlock
          title="CALL_REPORT_EXTRACT.EZTV"
          code={`* ============================================
* CALL REPORT DATA EXTRACT
* Schedule RC - Balance Sheet Extract
* ============================================
*
FILE GL-MASTER                            * General Ledger
  GL-ACCT        1    6  A               * GL Account Number
  GL-DESC       17   30  A               * Description
  GL-BALANCE    47   15  P  2            * Current Balance
  GL-TYPE       62    1  A               * A=Asset L=Liab E=Equity
*
FILE CALL-EXTRACT                         * Regulatory Extract File
  CE-LINE        1    4  A               * Call Report Line
  CE-AMOUNT     15   15  P  2            * Amount in thousands
*
FILE MAPPING                              * GL to Call Report mapping
  MAP-GL         1    6  A               * GL Account
  MAP-LINE      17    4  A               * Call Report Line
  MAP-SIGN      21    1  A               * + or - for sign
*
W CALL-LINE     W    4  A
W CALL-AMT      W   15  P  2
W ACCUM-AMT     W   15  P  2
*
* Process GL accounts with mapping
JOB INPUT (GL-MASTER KEY GL-ACCT +
           MAPPING   KEY MAP-GL) SYNCHRONIZED
*
  IF GL-ACCT EQ MAP-GL
*   Found mapping - calculate call report amount
    MOVE MAP-LINE TO CALL-LINE
*
*   Convert to thousands and apply sign
    COMPUTE CALL-AMT = GL-BALANCE / 1000
    IF MAP-SIGN EQ '-'
      MULTIPLY CALL-AMT BY -1
    END-IF
*
*   Output to extract
    MOVE CALL-LINE TO CE-LINE
    MOVE CALL-AMT TO CE-AMOUNT
    PUT CALL-EXTRACT
  ELSE
    IF GL-ACCT NE SPACES AND MAP-GL EQ SPACES
      DISPLAY 'UNMAPPED GL: ' GL-ACCT ' ' GL-DESC
    END-IF
  END-IF
*
STOP`}
          highlightLines={[28, 35, 38]}
        />

        <h3 className="subsection-title mt-8">Large Transaction Report (CTR/SAR)</h3>

        <CodeBlock
          title="LARGE_TRANS_RPT.EZTV"
          code={`* ============================================
* CURRENCY TRANSACTION REPORT (CTR)
* Identify transactions >= $10,000
* Bank Secrecy Act Compliance
* ============================================
*
FILE DAILY-TRANS
  TR-BRANCH      1    4  A
  TR-ACCT       15   12  A
  TR-DATE       27    8  N  0
  TR-TYPE       35    2  A
  TR-AMOUNT     37   11  P  2
  TR-CASH-IND   48    1  A               * Y=Cash transaction
  TR-TELLER     49    6  A
*
FILE CTR-REPORT PRINTER
FILE CTR-EXTRACT                          * For regulatory filing
*
W CTR-THRESHOLD W   11  P  2
*
REPORT CTR-RPT LINESIZE 132
  SEQUENCE TR-BRANCH TR-ACCT TR-DATE
  CONTROL TR-BRANCH FINAL
*
  TITLE 1 'CURRENCY TRANSACTION REPORT'
  TITLE 2 'TRANSACTIONS >= $10,000'
  TITLE 2 RIGHT 'DATE: ' SYSDATE
*
  HEADING TR-BRANCH 'BRANCH'
  HEADING TR-ACCT   'ACCOUNT'
  HEADING TR-DATE   'DATE'
  HEADING TR-AMOUNT 'AMOUNT'
  HEADING TR-TELLER 'TELLER'
*
JOB INPUT DAILY-TRANS
  MOVE 10000.00 TO CTR-THRESHOLD
*
* Select cash transactions at or above threshold
  IF TR-CASH-IND EQ 'Y' AND TR-AMOUNT GE CTR-THRESHOLD
    PRINT CTR-RPT
    PUT CTR-EXTRACT
  END-IF
*
STOP`}
          highlightLines={[40, 41, 42]}
        />

        <div className="info-box note mt-6">
          <div className="flex items-start gap-3">
            <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
            <div>
              <h4 className="font-semibold text-accent-cyan mb-1">BSA/AML Compliance</h4>
              <p className="text-gray-300 text-sm">
                Currency Transaction Reports (CTRs) are required for cash transactions 
                of $10,000 or more. Suspicious Activity Reports (SARs) have lower thresholds. 
                Structured transactions designed to avoid reporting are also flagged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Audit Trail */}
      <section className="mb-12">
        <h2 className="section-title">4. Transaction Audit Trail</h2>
        
        <p className="text-gray-300 mb-6">
          Audit trails capture before and after images of changes for regulatory 
          compliance, fraud detection, and operational review.
        </p>

        <CodeBlock
          title="AUDIT_TRAIL.EZTV"
          code={`* ============================================
* TRANSACTION AUDIT TRAIL GENERATOR
* Capture before/after images of changes
* ============================================
*
FILE MASTER-BEFORE                        * Before image (prior day)
  MB-KEY         1   12  A
  MB-NAME       13   30  A
  MB-BALANCE    43   13  P  2
  MB-STATUS     56    1  A
  MB-LIMIT      57   11  P  2
*
FILE MASTER-AFTER                         * After image (current)
  MA-KEY         1   12  A
  MA-NAME       13   30  A
  MA-BALANCE    43   13  P  2
  MA-STATUS     56    1  A
  MA-LIMIT      57   11  P  2
*
FILE AUDIT-LOG
  AL-TIMESTAMP   1   14  N  0            * YYYYMMDDHHMMSS
  AL-KEY        15   12  A
  AL-FIELD      27   15  A              * Changed field name
  AL-BEFORE     42   50  A              * Before value
  AL-AFTER      92   50  A              * After value
  AL-CHANGE-TYPE 142   1  A             * A=Add D=Delete C=Change
*
W AUDIT-TS      W   14  N  0
*
* Compare before and after files
JOB INPUT (MASTER-BEFORE KEY MB-KEY +
           MASTER-AFTER  KEY MA-KEY) SYNCHRONIZED
*
  MOVE CONCAT(SYSDATE SYSTIME) TO AUDIT-TS
  MOVE AUDIT-TS TO AL-TIMESTAMP
*
  IF MB-KEY EQ MA-KEY
*   Record exists in both - check for changes
    MOVE MA-KEY TO AL-KEY
    MOVE 'C' TO AL-CHANGE-TYPE
*
    IF MB-NAME NE MA-NAME
      MOVE 'NAME' TO AL-FIELD
      MOVE MB-NAME TO AL-BEFORE
      MOVE MA-NAME TO AL-AFTER
      PUT AUDIT-LOG
    END-IF
*
    IF MB-BALANCE NE MA-BALANCE
      MOVE 'BALANCE' TO AL-FIELD
      MOVE MB-BALANCE TO AL-BEFORE
      MOVE MA-BALANCE TO AL-AFTER
      PUT AUDIT-LOG
    END-IF
*
    IF MB-STATUS NE MA-STATUS
      MOVE 'STATUS' TO AL-FIELD
      MOVE MB-STATUS TO AL-BEFORE
      MOVE MA-STATUS TO AL-AFTER
      PUT AUDIT-LOG
    END-IF
*
  ELSE
    IF MB-KEY NE SPACES AND MA-KEY EQ SPACES
*     Record deleted
      MOVE MB-KEY TO AL-KEY
      MOVE 'D' TO AL-CHANGE-TYPE
      MOVE 'RECORD' TO AL-FIELD
      MOVE 'EXISTS' TO AL-BEFORE
      MOVE 'DELETED' TO AL-AFTER
      PUT AUDIT-LOG
    END-IF
*
    IF MA-KEY NE SPACES AND MB-KEY EQ SPACES
*     New record added
      MOVE MA-KEY TO AL-KEY
      MOVE 'A' TO AL-CHANGE-TYPE
      MOVE 'RECORD' TO AL-FIELD
      MOVE 'N/A' TO AL-BEFORE
      MOVE 'ADDED' TO AL-AFTER
      PUT AUDIT-LOG
    END-IF
  END-IF
*
STOP`}
          highlightLines={[32, 33, 44, 51, 58, 66, 76]}
        />
      </section>

      {/* Section 5: Loan Delinquency */}
      <section className="mb-12">
        <h2 className="section-title">5. Loan Delinquency Analysis</h2>
        
        <p className="text-gray-300 mb-6">
          Loan portfolio analysis identifies delinquent accounts and calculates 
          aging buckets for risk management and loss reserve calculations.
        </p>

        <CodeBlock
          title="LOAN_DELINQUENCY.EZTV"
          code={`* ============================================
* LOAN DELINQUENCY AND AGING REPORT
* ============================================
*
FILE LOAN-MASTER
  LM-LOAN-NUM    1   15  A
  LM-CUST-NAME  16   30  A
  LM-ORIG-AMT   46   13  P  2
  LM-CURR-BAL   59   13  P  2
  LM-PMT-AMT    72   11  P  2
  LM-DUE-DATE   83    8  N  0
  LM-LAST-PMT   91    8  N  0
  LM-LOAN-TYPE  99    2  A
*
FILE DELING-RPT PRINTER
*
W DAYS-DELQ     W    5  N  0
W AGING-BUCKET  W    1  A
W TOTAL-CURRENT W   15  P  2
W TOTAL-30      W   15  P  2
W TOTAL-60      W   15  P  2
W TOTAL-90      W   15  P  2
W TOTAL-120     W   15  P  2
*
REPORT DELINQUENCY LINESIZE 132
  SEQUENCE LM-LOAN-TYPE AGING-BUCKET LM-LOAN-NUM
  CONTROL LM-LOAN-TYPE AGING-BUCKET FINAL
*
  TITLE 1 'LOAN DELINQUENCY AGING REPORT'
  TITLE 2 'AS OF ' SYSDATE
*
JOB INPUT LOAN-MASTER
*
* Calculate days delinquent
  IF LM-DUE-DATE LT SYSDATE
    MOVE DAYS-BETWEEN(LM-DUE-DATE SYSDATE 'YYYYMMDD') TO DAYS-DELQ
  ELSE
    MOVE 0 TO DAYS-DELQ
  END-IF
*
* Assign aging bucket
  IF DAYS-DELQ EQ 0
    MOVE '0' TO AGING-BUCKET           * Current
    ADD LM-CURR-BAL TO TOTAL-CURRENT
  ELSE
    IF DAYS-DELQ LE 30
      MOVE '1' TO AGING-BUCKET         * 1-30 days
      ADD LM-CURR-BAL TO TOTAL-30
    ELSE
      IF DAYS-DELQ LE 60
        MOVE '2' TO AGING-BUCKET       * 31-60 days
        ADD LM-CURR-BAL TO TOTAL-60
      ELSE
        IF DAYS-DELQ LE 90
          MOVE '3' TO AGING-BUCKET     * 61-90 days
          ADD LM-CURR-BAL TO TOTAL-90
        ELSE
          MOVE '4' TO AGING-BUCKET     * 90+ days
          ADD LM-CURR-BAL TO TOTAL-120
        END-IF
      END-IF
    END-IF
  END-IF
*
  PRINT DELINQUENCY
*
AFTER-JOB.
* Summary by aging bucket
  DISPLAY '===== DELINQUENCY SUMMARY ====='
  DISPLAY 'CURRENT:    ' TOTAL-CURRENT
  DISPLAY '1-30 DAYS:  ' TOTAL-30
  DISPLAY '31-60 DAYS: ' TOTAL-60
  DISPLAY '61-90 DAYS: ' TOTAL-90
  DISPLAY '90+ DAYS:   ' TOTAL-120
*
STOP`}
          highlightLines={[35, 43, 46, 50, 54, 58]}
        />

        <div className="info-box tip mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-green mb-1">Delinquency Analysis Uses</h4>
              <p className="text-gray-300 text-sm">
                <strong>Collections:</strong> Prioritize outreach based on aging<br/>
                <strong>Reserves:</strong> Calculate allowance for loan losses<br/>
                <strong>Regulatory:</strong> Report non-performing asset ratios<br/>
                <strong>Risk:</strong> Monitor portfolio health trends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="section-title">Module Summary</h2>
        
        <div className="card-highlight">
          <h3 className="text-lg font-display font-semibold text-white mb-4">Financial Application Patterns</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
            <div>
              <h4 className="text-mainframe-green font-semibold mb-2">Data Processing</h4>
              <ul className="space-y-1">
                <li>• File matching for reconciliation</li>
                <li>• Before/after comparison for audits</li>
                <li>• Threshold detection for compliance</li>
                <li>• Aging calculations for risk</li>
              </ul>
            </div>
            <div>
              <h4 className="text-mainframe-green font-semibold mb-2">Output Types</h4>
              <ul className="space-y-1">
                <li>• Regulatory extracts (fixed format)</li>
                <li>• Customer statements (formatted)</li>
                <li>• Exception reports (actionable)</li>
                <li>• Audit logs (change tracking)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-mainframe-green/20">
        <a href="/module/6" className="btn-secondary flex items-center gap-2">
          <span>←</span>
          Previous: Sorting & Summarization
        </a>
        <a href="/playground" className="btn-primary flex items-center gap-2">
          Try the Playground
          <span>→</span>
        </a>
      </div>
    </div>
  )
}
