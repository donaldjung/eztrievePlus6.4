import CodeBlock from '../../components/code/CodeBlock'
import { Settings2, Lightbulb, Info } from 'lucide-react'

export default function Module4DataManipulation() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-magenta/20 flex items-center justify-center border border-accent-magenta/30">
            <Settings2 className="text-accent-magenta" size={24} />
          </div>
          <div>
            <p className="text-sm font-mono text-gray-500">MODULE 4</p>
            <h1 className="text-3xl font-display font-bold text-white">Data Manipulation</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Master string operations, arithmetic functions, date handling, and data type 
          conversions essential for financial data processing.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card-highlight mb-8">
        <h3 className="text-lg font-display font-semibold text-accent-magenta mb-4">In This Module</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-magenta/20 text-accent-magenta text-xs flex items-center justify-center font-mono">1</span>
            MOVE Statement & Data Transfer
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-magenta/20 text-accent-magenta text-xs flex items-center justify-center font-mono">2</span>
            Arithmetic Operations
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-magenta/20 text-accent-magenta text-xs flex items-center justify-center font-mono">3</span>
            String Functions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-magenta/20 text-accent-magenta text-xs flex items-center justify-center font-mono">4</span>
            Date/Time Functions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-magenta/20 text-accent-magenta text-xs flex items-center justify-center font-mono">5</span>
            Type Conversions
          </li>
        </ul>
      </div>

      {/* Section 1: MOVE Statement */}
      <section className="mb-12">
        <h2 className="section-title">1. MOVE Statement & Data Transfer</h2>
        
        <p className="text-gray-300 mb-6">
          The MOVE statement transfers data between fields. Understanding how data 
          is moved between different field types is crucial for correct results.
        </p>

        <CodeBlock
          title="MOVE_BASICS.EZTV"
          code={`* ============================================
* MOVE STATEMENT VARIATIONS
* ============================================
*
* Basic MOVE - field to field
  MOVE SOURCE-FIELD TO TARGET-FIELD
*
* MOVE literal value
  MOVE 'ACTIVE' TO STATUS-FIELD
  MOVE 0 TO COUNTER
  MOVE 1234.56 TO AMOUNT
*
* MOVE SPACES - clear alphanumeric field
  MOVE SPACES TO DESCRIPTION
  MOVE SPACES TO ERROR-MESSAGE
*
* MOVE ZEROS - clear numeric field
  MOVE ZEROS TO TOTAL-AMOUNT
  MOVE ZEROS TO RECORD-COUNT
*
* MOVE with implicit conversion
  MOVE PACKED-FIELD TO DISPLAY-FIELD
  MOVE NUMERIC-FIELD TO ALPHA-FIELD
*
* Multiple MOVEs with same source
  MOVE MASTER-ACCT TO OUT-ACCT
  MOVE MASTER-ACCT TO LOG-ACCT
  MOVE MASTER-ACCT TO PRINT-ACCT`}
          highlightLines={[6, 13, 17]}
        />

        <h3 className="subsection-title mt-8">MOVE CORRESPONDING</h3>

        <CodeBlock
          title="MOVE_CORRESPONDING.EZTV"
          code={`* ============================================
* MOVE CORRESPONDING - Move matching fields
* Fields with same names are moved automatically
* ============================================
*
FILE INFILE
  ACCT-NUM       1   12  A
  ACCT-NAME     13   30  A
  ACCT-BAL      43   11  P  2
  ACCT-STATUS   54    1  A
*
FILE OUTFILE
  ACCT-NUM       1   12  A
  ACCT-NAME     13   30  A
  ACCT-BAL      43   11  P  2
  ACCT-DATE     54    8  N  0
*
JOB INPUT INFILE
*
* Move all fields with matching names
  MOVE CORRESPONDING INFILE TO OUTFILE
  MOVE SYSDATE TO ACCT-DATE
  PUT OUTFILE
*
STOP`}
          highlightLines={[21]}
        />

        <div className="info-box tip mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-green mb-1">MOVE CORRESPONDING</h4>
              <p className="text-gray-300 text-sm">
                MOVE CORRESPONDING is powerful but use with caution. Ensure field names 
                that match are intended to be moved together. Different field lengths 
                or types may cause truncation or conversion issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Arithmetic */}
      <section className="mb-12">
        <h2 className="section-title">2. Arithmetic Operations</h2>
        
        <p className="text-gray-300 mb-6">
          EasyTrieve provides both simple arithmetic verbs and the powerful COMPUTE 
          statement for complex calculations essential in financial processing.
        </p>

        <h3 className="subsection-title">Simple Arithmetic Verbs</h3>

        <CodeBlock
          title="ARITHMETIC_SIMPLE.EZTV"
          code={`* ============================================
* SIMPLE ARITHMETIC OPERATIONS
* ============================================
*
W BALANCE       W  11  P  2
W AMOUNT        W  11  P  2
W COUNTER       W   7  N  0
W RATE          W   5  P  4
*
* ADD - Add to accumulator
  ADD TRANS-AMT TO BALANCE
  ADD 1 TO COUNTER
  ADD DEBIT CREDIT TO TOTAL    * Add multiple values
*
* SUBTRACT - Subtract from field
  SUBTRACT WITHDRAWAL FROM BALANCE
  SUBTRACT 1 FROM COUNTER
*
* MULTIPLY - Multiply fields
  MULTIPLY BALANCE BY RATE
  MULTIPLY QUANTITY BY PRICE GIVING TOTAL
*
* DIVIDE - Division
  DIVIDE TOTAL BY COUNT
  DIVIDE TOTAL BY 12 GIVING MONTHLY-AMT`}
          highlightLines={[11, 16, 20, 24]}
        />

        <h3 className="subsection-title mt-8">COMPUTE Statement</h3>

        <CodeBlock
          title="COMPUTE.EZTV"
          code={`* ============================================
* COMPUTE - Complex arithmetic expressions
* Operators: + - * / ** (exponent)
* ============================================
*
W PRINCIPAL     W  15  P  2
W RATE          W   5  P  6
W PERIODS       W   3  N  0
W INTEREST      W  15  P  2
W PAYMENT       W  15  P  2
W BALANCE       W  15  P  2
*
* Simple calculation
  COMPUTE INTEREST = PRINCIPAL * RATE
*
* Multiple operations (standard math precedence)
  COMPUTE BALANCE = BALANCE + DEPOSITS - WITHDRAWALS
*
* Financial calculations
* Simple interest
  COMPUTE INTEREST = PRINCIPAL * RATE * PERIODS / 12
*
* Compound interest formula
  COMPUTE INTEREST = PRINCIPAL * ((1 + RATE) ** PERIODS - 1)
*
* Monthly payment calculation (simplified)
  COMPUTE PAYMENT = PRINCIPAL * (RATE / 12) / +
                    (1 - (1 + RATE/12) ** (0 - PERIODS))
*
* Percentage calculation
  COMPUTE PCT-OF-TOTAL = (AMOUNT / TOTAL) * 100
*
* With ROUNDED option
  COMPUTE ROUNDED PAYMENT = PRINCIPAL / PERIODS`}
          highlightLines={[14, 24, 27, 33]}
        />

        <div className="info-box note mt-6">
          <div className="flex items-start gap-3">
            <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
            <div>
              <h4 className="font-semibold text-accent-cyan mb-1">Precision in Financial Calculations</h4>
              <p className="text-gray-300 text-sm">
                Always use <strong>Packed Decimal (P)</strong> fields for monetary calculations 
                to avoid floating-point rounding errors. Define sufficient decimal places 
                for intermediate calculations (4-6) even if final result only needs 2.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: String Functions */}
      <section className="mb-12">
        <h2 className="section-title">3. String Functions</h2>
        
        <p className="text-gray-300 mb-6">
          String manipulation functions handle text data—customer names, addresses, 
          descriptions, and formatted output.
        </p>

        <CodeBlock
          title="STRING_FUNCTIONS.EZTV"
          code={`* ============================================
* STRING MANIPULATION FUNCTIONS
* ============================================
*
W FULL-NAME     W  50  A
W FIRST-NAME    W  20  A
W LAST-NAME     W  25  A
W FORMATTED     W  60  A
W WORK-FIELD    W  30  A
*
* SUBSTR - Extract substring
* SUBSTR(field start length)
  MOVE SUBSTR(SSN 1 3) TO AREA-CODE
  MOVE SUBSTR(ACCT-NUM 5 6) TO BRANCH-CODE
*
* LENGTH - Get string length (excluding trailing spaces)
  MOVE LENGTH(CUSTOMER-NAME) TO NAME-LEN
*
* TRIM - Remove leading/trailing spaces
  MOVE TRIM(INPUT-NAME) TO WORK-FIELD
*
* JUSTIFY - Align text
  JUSTIFY AMOUNT-FIELD RIGHT  * Right justify
  JUSTIFY NAME-FIELD LEFT     * Left justify
*
* CONCAT - Concatenate strings
  MOVE CONCAT(FIRST-NAME ' ' LAST-NAME) TO FULL-NAME
*
* Build formatted output
  MOVE CONCAT(LAST-NAME ', ' FIRST-NAME) TO FORMATTED
*
* UPPER/LOWER case conversion
  MOVE UPPER(INPUT-NAME) TO OUTPUT-NAME
*
* INDEX - Find position of substring
  MOVE INDEX(DESCRIPTION 'FEE') TO FEE-POS
  IF FEE-POS GT 0
    DISPLAY 'FEE FOUND AT POSITION ' FEE-POS
  END-IF`}
          highlightLines={[13, 17, 20, 27, 32, 35]}
        />

        <h3 className="subsection-title mt-8">String Building for Reports</h3>

        <CodeBlock
          title="STRING_BUILDING.EZTV"
          code={`* ============================================
* STRING BUILDING FOR FORMATTED OUTPUT
* ============================================
*
W REPORT-LINE   W 132  A
W ACCT-DISPLAY  W  15  A
W AMT-DISPLAY   W  15  A
W DATE-DISPLAY  W  10  A
*
* Format account number with dashes
  MOVE CONCAT(SUBSTR(ACCT-NUM 1 4) '-' +
              SUBSTR(ACCT-NUM 5 4) '-' +
              SUBSTR(ACCT-NUM 9 4)) TO ACCT-DISPLAY
*
* Format date as MM/DD/YYYY
  MOVE CONCAT(SUBSTR(DATE-FIELD 5 2) '/' +
              SUBSTR(DATE-FIELD 7 2) '/' +
              SUBSTR(DATE-FIELD 1 4)) TO DATE-DISPLAY
*
* Build complete report line
  MOVE SPACES TO REPORT-LINE
  MOVE CONCAT(ACCT-DISPLAY '  ' +
              CUST-NAME '  ' +
              AMT-DISPLAY '  ' +
              DATE-DISPLAY) TO REPORT-LINE
*
  DISPLAY REPORT-LINE`}
        />
      </section>

      {/* Section 4: Date/Time Functions */}
      <section className="mb-12">
        <h2 className="section-title">4. Date/Time Functions</h2>
        
        <p className="text-gray-300 mb-6">
          Date calculations are critical in banking—interest accruals, payment due dates, 
          aging reports, and regulatory compliance all depend on accurate date handling.
        </p>

        <CodeBlock
          title="DATE_FUNCTIONS.EZTV"
          code={`* ============================================
* DATE AND TIME FUNCTIONS
* ============================================
*
W TODAY-DATE    W   8  N  0   * YYYYMMDD
W DUE-DATE      W   8  N  0
W OPEN-DATE     W   8  N  0
W DAYS-OPEN     W   5  N  0
W DAYS-TO-DUE   W   5  N  0
W FORMATTED-DT  W  10  A      * MM/DD/YYYY
*
* System date/time
  MOVE SYSDATE TO TODAY-DATE      * Current date YYYYMMDD
  MOVE SYSTIME TO CURRENT-TIME    * Current time HHMMSS
*
* DATE-FORMAT - Convert date formats
  MOVE DATE-FORMAT(TODAY-DATE 'YYYYMMDD' 'MM/DD/YYYY') +
       TO FORMATTED-DT
*
* DAYS-BETWEEN - Calculate days between dates
  MOVE DAYS-BETWEEN(OPEN-DATE TODAY-DATE 'YYYYMMDD') +
       TO DAYS-OPEN
*
* Calculate due date (30 days from today)
  MOVE TODAY-DATE TO DUE-DATE
  ADD 30 TO DUE-DATE    * Simple approach for same month
*
* DATE-VALUE - Convert date to Julian day number
  MOVE DATE-VALUE(TODAY-DATE 'YYYYMMDD') TO JULIAN-DAY
*
* Add days to date using Julian calculation
  ADD 30 TO JULIAN-DAY
  MOVE DATE-FORMAT(JULIAN-DAY 'J' 'YYYYMMDD') TO DUE-DATE`}
          highlightLines={[13, 17, 21, 28, 32]}
        />

        <h3 className="subsection-title mt-8">Date Calculations for Banking</h3>

        <CodeBlock
          title="DATE_BANKING.EZTV"
          code={`* ============================================
* BANKING DATE CALCULATIONS
* ============================================
*
W PAYMENT-DATE  W   8  N  0
W CURRENT-DATE  W   8  N  0
W DAYS-PAST-DUE W   5  N  0
W AGING-BUCKET  W   1  A
*
* Calculate days past due
  MOVE SYSDATE TO CURRENT-DATE
  IF PAYMENT-DATE LT CURRENT-DATE
    MOVE DAYS-BETWEEN(PAYMENT-DATE CURRENT-DATE 'YYYYMMDD') +
         TO DAYS-PAST-DUE
*
*   Assign aging bucket
    IF DAYS-PAST-DUE LE 30
      MOVE '1' TO AGING-BUCKET      * 1-30 days
    ELSE
      IF DAYS-PAST-DUE LE 60
        MOVE '2' TO AGING-BUCKET    * 31-60 days
      ELSE
        IF DAYS-PAST-DUE LE 90
          MOVE '3' TO AGING-BUCKET  * 61-90 days
        ELSE
          MOVE '4' TO AGING-BUCKET  * 90+ days
        END-IF
      END-IF
    END-IF
  ELSE
    MOVE '0' TO AGING-BUCKET        * Current (not past due)
  END-IF`}
        />

        <div className="overflow-x-auto mt-6">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Function</th>
                <th>Purpose</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">SYSDATE</td>
                <td>Current system date</td>
                <td>MOVE SYSDATE TO TODAY</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">SYSTIME</td>
                <td>Current system time</td>
                <td>MOVE SYSTIME TO NOW</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">DATE-FORMAT</td>
                <td>Convert between date formats</td>
                <td>DATE-FORMAT(DT 'YYYYMMDD' 'MM/DD/YY')</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">DAYS-BETWEEN</td>
                <td>Days between two dates</td>
                <td>DAYS-BETWEEN(START END 'YYYYMMDD')</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">DATE-VALUE</td>
                <td>Convert to Julian day</td>
                <td>DATE-VALUE(DT 'YYYYMMDD')</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Type Conversions */}
      <section className="mb-12">
        <h2 className="section-title">5. Type Conversions</h2>
        
        <p className="text-gray-300 mb-6">
          EasyTrieve performs many conversions automatically, but understanding 
          explicit conversions ensures accurate data handling.
        </p>

        <CodeBlock
          title="TYPE_CONVERSION.EZTV"
          code={`* ============================================
* DATA TYPE CONVERSIONS
* ============================================
*
W PACKED-AMT    W  11  P  2   * Packed decimal
W DISPLAY-AMT   W  15  N  2   * Display numeric
W ALPHA-AMT     W  15  A      * Alphanumeric
W BINARY-VAL    W   4  B  0   * Binary
*
* Packed to Display (automatic with MOVE)
  MOVE PACKED-AMT TO DISPLAY-AMT
*
* Numeric to Alpha (automatic)
  MOVE DISPLAY-AMT TO ALPHA-AMT
*
* Alpha to Numeric (when content is numeric)
  IF ALPHA-FIELD NUMERIC
    MOVE ALPHA-FIELD TO NUMERIC-FIELD
  END-IF
*
* Binary to Packed
  MOVE BINARY-VAL TO PACKED-AMT
*
* Formatted numeric output with MASK
  DEFINE FORMATTED-AMT W 18 N 2 MASK '$$$,$$$,$$9.99-'
  MOVE PACKED-AMT TO FORMATTED-AMT
*
* Common masks for financial display:
* '$$$,$$$,$$9.99'    - Standard currency
* '$$$,$$$,$$9.99-'   - Negative trailing
* '($$$,$$$,$$9.99)'  - Negative in parens
* 'ZZZ,ZZZ,ZZ9.99'    - Zero suppress leading
* '999-99-9999'       - SSN format`}
          highlightLines={[11, 17, 25]}
        />

        <h3 className="subsection-title mt-8">MASK Patterns for Financial Output</h3>

        <div className="overflow-x-auto">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Mask Character</th>
                <th>Meaning</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">9</td>
                <td>Digit (always displays)</td>
                <td>999 → 007</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">Z</td>
                <td>Zero suppress (blank if zero)</td>
                <td>ZZZ → ␢␢7</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">$</td>
                <td>Floating dollar sign</td>
                <td>$$$.99 → $7.50</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">,</td>
                <td>Comma (appears if needed)</td>
                <td>Z,ZZZ → 1,234</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">.</td>
                <td>Decimal point</td>
                <td>ZZZ.99 → 123.45</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">-</td>
                <td>Trailing minus if negative</td>
                <td>ZZZ- → 123-</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">CR/DB</td>
                <td>Credit/Debit indicator</td>
                <td>ZZZ CR → 123 CR</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-mainframe-green/20">
        <a href="/module/3" className="btn-secondary flex items-center gap-2">
          <span>←</span>
          Previous: Control Structures
        </a>
        <a href="/module/5" className="btn-primary flex items-center gap-2">
          Next: Report Generation
          <span>→</span>
        </a>
      </div>
    </div>
  )
}
