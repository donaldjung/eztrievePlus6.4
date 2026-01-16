import { Link } from 'react-router-dom'
import CodeBlock from '../../components/code/CodeBlock'
import FlowDiagram from '../../components/visualizations/FlowDiagram'
import { GitBranch, Lightbulb, AlertTriangle, Info } from 'lucide-react'

export default function Module3ControlStructures() {
  const conditionalDiagram = `
flowchart TB
    subgraph cond [Conditional Logic]
        IF{IF Condition}
        IF --> |True| THEN[Execute THEN Block]
        IF --> |False| ELSE[Execute ELSE Block]
        THEN --> ENDIF[END-IF]
        ELSE --> ENDIF
    end
  `

  const loopDiagram = `
flowchart TB
    subgraph loops [Loop Structures]
        DOWHILE[DO WHILE] --> CHECK1{Condition?}
        CHECK1 --> |True| BODY1[Loop Body]
        BODY1 --> CHECK1
        CHECK1 --> |False| EXIT1[Continue]
        
        DOUNTIL[DO UNTIL] --> BODY2[Loop Body]
        BODY2 --> CHECK2{Condition?}
        CHECK2 --> |False| BODY2
        CHECK2 --> |True| EXIT2[Continue]
    end
  `

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-mainframe-amber/20 flex items-center justify-center border border-mainframe-amber/30">
            <GitBranch className="text-mainframe-amber" size={24} />
          </div>
          <div>
            <p className="text-sm font-mono text-gray-500">MODULE 3</p>
            <h1 className="text-3xl font-display font-bold text-white">Control Structures</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Master conditional logic, loops, procedures, and program flow control to build 
          sophisticated data processing logic for financial applications.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card-highlight mb-8">
        <h3 className="text-lg font-display font-semibold text-mainframe-amber mb-4">In This Module</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-amber/20 text-mainframe-amber text-xs flex items-center justify-center font-mono">1</span>
            IF/ELSE/END-IF Conditional Logic
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-amber/20 text-mainframe-amber text-xs flex items-center justify-center font-mono">2</span>
            Comparison Operators
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-amber/20 text-mainframe-amber text-xs flex items-center justify-center font-mono">3</span>
            DO WHILE and DO UNTIL Loops
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-amber/20 text-mainframe-amber text-xs flex items-center justify-center font-mono">4</span>
            PROC/END-PROC Procedures
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-amber/20 text-mainframe-amber text-xs flex items-center justify-center font-mono">5</span>
            CASE Statements
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-mainframe-amber/20 text-mainframe-amber text-xs flex items-center justify-center font-mono">6</span>
            STOP and GOTO Statements
          </li>
        </ul>
      </div>

      {/* Section 1: Conditional Logic */}
      <section className="mb-12">
        <h2 className="section-title">1. IF/ELSE/END-IF Conditional Logic</h2>
        
        <p className="text-gray-300 mb-6">
          The IF statement is the foundation of decision-making in EasyTrieve. 
          It evaluates conditions and executes different code blocks based on the result.
        </p>

        <FlowDiagram chart={conditionalDiagram} title="IF/ELSE Flow" className="mb-6" />

        <h3 className="subsection-title">Basic IF Statement</h3>

        <CodeBlock
          title="IF_BASIC.EZTV"
          code={`* ============================================
* BASIC IF STATEMENT EXAMPLES
* ============================================
*
* Simple IF
  IF ACCT-STATUS EQ 'A'
    DISPLAY 'ACTIVE ACCOUNT'
  END-IF
*
* IF with ELSE
  IF BALANCE GT 0
    DISPLAY 'POSITIVE BALANCE'
  ELSE
    DISPLAY 'ZERO OR NEGATIVE BALANCE'
  END-IF
*
* Nested IF statements
  IF ACCT-TYPE EQ 'SAV'
    IF BALANCE GE 1000.00
      MOVE 0.02 TO INTEREST-RATE
    ELSE
      MOVE 0.01 TO INTEREST-RATE
    END-IF
  ELSE
    IF ACCT-TYPE EQ 'CHK'
      MOVE 0.001 TO INTEREST-RATE
    ELSE
      MOVE 0 TO INTEREST-RATE
    END-IF
  END-IF`}
          highlightLines={[6, 11, 18]}
        />

        <h3 className="subsection-title mt-8">Compound Conditions</h3>

        <CodeBlock
          title="IF_COMPOUND.EZTV"
          code={`* ============================================
* COMPOUND CONDITIONS WITH AND/OR/NOT
* ============================================
*
* AND - Both conditions must be true
  IF ACCT-STATUS EQ 'A' AND BALANCE GT 1000.00
    PERFORM PROCESS-PREMIUM-ACCT
  END-IF
*
* OR - Either condition must be true
  IF REGION EQ 'EAST' OR REGION EQ 'WEST'
    ADD 1 TO DOMESTIC-COUNT
  END-IF
*
* NOT - Negates the condition
  IF NOT (STATUS EQ 'CLOSED')
    PERFORM PROCESS-OPEN-ACCT
  END-IF
*
* Complex compound condition
  IF (ACCT-TYPE EQ 'SAV' OR ACCT-TYPE EQ 'MMA') +
     AND (BALANCE GE 10000.00) +
     AND NOT (STATUS EQ 'DORMANT')
    PERFORM QUALIFY-FOR-BONUS
  END-IF`}
          highlightLines={[6, 11, 16, 21]}
        />

        <div className="info-box tip mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-mainframe-green mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-green mb-1">Line Continuation</h4>
              <p className="text-gray-300 text-sm">
                Use the <code className="text-mainframe-amber">+</code> character at the end of a line 
                to continue a statement on the next line. This improves readability for complex conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Comparison Operators */}
      <section className="mb-12">
        <h2 className="section-title">2. Comparison Operators</h2>
        
        <p className="text-gray-300 mb-6">
          EasyTrieve provides a comprehensive set of comparison operators for 
          evaluating conditions in your programs.
        </p>

        <div className="overflow-x-auto">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Meaning</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">EQ</td>
                <td>Equal to</td>
                <td>IF STATUS EQ 'A'</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">NE</td>
                <td>Not equal to</td>
                <td>IF BALANCE NE 0</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">GT</td>
                <td>Greater than</td>
                <td>IF AMOUNT GT 1000</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">LT</td>
                <td>Less than</td>
                <td>IF RATE LT 0.05</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">GE</td>
                <td>Greater than or equal</td>
                <td>IF BALANCE GE 500</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">LE</td>
                <td>Less than or equal</td>
                <td>IF COUNT LE 100</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">LIKE</td>
                <td>Pattern matching</td>
                <td>IF NAME LIKE 'SMITH%'</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">CONTAINS</td>
                <td>Contains substring</td>
                <td>IF DESC CONTAINS 'FEE'</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="subsection-title mt-8">Special Comparisons</h3>

        <CodeBlock
          title="SPECIAL_COMPARISONS.EZTV"
          code={`* ============================================
* SPECIAL COMPARISON OPERATIONS
* ============================================
*
* SPACES - Check for blank field
  IF CUST-NAME EQ SPACES
    DISPLAY 'NAME IS BLANK'
  END-IF
*
* ZEROS - Check for zero value
  IF BALANCE EQ ZEROS
    DISPLAY 'ZERO BALANCE'
  END-IF
*
* LIKE - Pattern matching with wildcards
* % matches any characters, _ matches single char
  IF ACCT-NUM LIKE '123%'
    DISPLAY 'ACCOUNT STARTS WITH 123'
  END-IF
*
  IF PHONE LIKE '___-___-____'
    DISPLAY 'VALID PHONE FORMAT'
  END-IF
*
* CONTAINS - Substring search
  IF DESCRIPTION CONTAINS 'OVERDRAFT'
    PERFORM OVERDRAFT-PROCESSING
  END-IF
*
* NUMERIC - Check if field contains numbers
  IF SSN NUMERIC
    DISPLAY 'VALID SSN FORMAT'
  END-IF`}
        />
      </section>

      {/* Section 3: Loops */}
      <section className="mb-12">
        <h2 className="section-title">3. DO WHILE and DO UNTIL Loops</h2>
        
        <p className="text-gray-300 mb-6">
          Loop structures allow repeated execution of code blocks. Understanding the 
          difference between WHILE and UNTIL is crucial for correct logic.
        </p>

        <FlowDiagram chart={loopDiagram} title="Loop Structures" className="mb-6" />

        <h3 className="subsection-title">DO WHILE Loop</h3>

        <CodeBlock
          title="DO_WHILE.EZTV"
          code={`* ============================================
* DO WHILE - Test condition BEFORE each iteration
* Loop continues WHILE condition is TRUE
* ============================================
*
W COUNTER       W   3  N  0
W MAX-ITER      W   3  N  0
W RUNNING-TOTAL W  11  P  2
*
* Simple counter loop
  MOVE 1 TO COUNTER
  MOVE 10 TO MAX-ITER
*
  DO WHILE COUNTER LE MAX-ITER
    DISPLAY 'ITERATION: ' COUNTER
    ADD 1 TO COUNTER
  END-DO
*
* Process until end of data
  MOVE 'N' TO EOF-FLAG
  DO WHILE EOF-FLAG NE 'Y'
    GET INPUTFILE STATUS EOF-FLAG
    IF EOF-FLAG NE 'Y'
      PERFORM PROCESS-RECORD
    END-IF
  END-DO`}
          highlightLines={[14, 21]}
        />

        <h3 className="subsection-title mt-8">DO UNTIL Loop</h3>

        <CodeBlock
          title="DO_UNTIL.EZTV"
          code={`* ============================================
* DO UNTIL - Test condition AFTER each iteration
* Loop continues UNTIL condition becomes TRUE
* Executes at least once
* ============================================
*
W INPUT-VALUE   W  10  A
W VALID-FLAG    W   1  A
*
* Validate input until correct
  DO UNTIL VALID-FLAG EQ 'Y'
    MOVE 'Y' TO VALID-FLAG
    IF INPUT-VALUE EQ SPACES
      MOVE 'N' TO VALID-FLAG
      DISPLAY 'ERROR: VALUE REQUIRED'
    END-IF
    IF INPUT-VALUE NUMERIC
      IF INPUT-VALUE GT 0
*       Valid input
      ELSE
        MOVE 'N' TO VALID-FLAG
        DISPLAY 'ERROR: MUST BE POSITIVE'
      END-IF
    ELSE
      MOVE 'N' TO VALID-FLAG
      DISPLAY 'ERROR: MUST BE NUMERIC'
    END-IF
  END-DO`}
          highlightLines={[11]}
        />

        <div className="info-box note mt-6">
          <div className="flex items-start gap-3">
            <Info className="text-accent-cyan mt-1 flex-shrink-0" size={18} />
            <div>
              <h4 className="font-semibold text-accent-cyan mb-1">WHILE vs UNTIL</h4>
              <p className="text-gray-300 text-sm">
                <strong>DO WHILE:</strong> Condition checked first—may execute zero times.<br/>
                <strong>DO UNTIL:</strong> Condition checked after—always executes at least once.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Procedures */}
      <section className="mb-12">
        <h2 className="section-title">4. PROC/END-PROC Procedures</h2>
        
        <p className="text-gray-300 mb-6">
          Procedures (PROC) allow you to organize code into reusable, named blocks. 
          This improves readability and reduces code duplication.
        </p>

        <CodeBlock
          title="PROCEDURES.EZTV"
          code={`* ============================================
* PROCEDURES AND PERFORM STATEMENTS
* ============================================
*
FILE ACCOUNTS
  ACCT-NUM       1   12  A
  ACCT-TYPE     13    2  A
  ACCT-BAL      15   11  P  2
*
W CALC-INTEREST W  11  P  2
W INTEREST-RATE W   5  P  4
*
JOB INPUT ACCOUNTS
*
* Main processing - call procedures with PERFORM
  PERFORM DETERMINE-RATE
  PERFORM CALCULATE-INTEREST
  PERFORM PRINT-RESULTS
*
STOP
*
* ============================================
* PROCEDURE DEFINITIONS
* ============================================
*
DETERMINE-RATE. PROC
* Determine interest rate based on account type
  IF ACCT-TYPE EQ 'SV'
    MOVE 0.0250 TO INTEREST-RATE
  ELSE
    IF ACCT-TYPE EQ 'MM'
      MOVE 0.0350 TO INTEREST-RATE
    ELSE
      IF ACCT-TYPE EQ 'CD'
        MOVE 0.0450 TO INTEREST-RATE
      ELSE
        MOVE 0.0100 TO INTEREST-RATE
      END-IF
    END-IF
  END-IF
END-PROC
*
CALCULATE-INTEREST. PROC
* Calculate interest amount
  COMPUTE CALC-INTEREST = ACCT-BAL * INTEREST-RATE
END-PROC
*
PRINT-RESULTS. PROC
* Display account information
  DISPLAY 'ACCOUNT: ' ACCT-NUM
  DISPLAY 'TYPE:    ' ACCT-TYPE
  DISPLAY 'BALANCE: ' ACCT-BAL
  DISPLAY 'RATE:    ' INTEREST-RATE
  DISPLAY 'INTEREST:' CALC-INTEREST
  DISPLAY ' '
END-PROC`}
          highlightLines={[16, 17, 18, 26, 44, 49]}
        />

        <h3 className="subsection-title mt-8">Procedures with Parameters</h3>

        <CodeBlock
          title="PROC_PARAMETERS.EZTV"
          code={`* ============================================
* PROCEDURES WITH PARAMETERS
* ============================================
*
W RESULT        W  11  P  2
W RATE-PARAM    W   5  P  4
W AMOUNT-PARAM  W  11  P  2
*
* Call procedure with arguments
  MOVE 10000.00 TO AMOUNT-PARAM
  MOVE 0.05 TO RATE-PARAM
  PERFORM CALC-COMPOUND-INTEREST (AMOUNT-PARAM RATE-PARAM RESULT)
  DISPLAY 'RESULT: ' RESULT
*
* Procedure definition with parameters
CALC-COMPOUND-INTEREST. PROC (P-AMOUNT P-RATE P-RESULT)
* Parameters are local to the procedure
  W P-AMOUNT    W  11  P  2
  W P-RATE      W   5  P  4
  W P-RESULT    W  11  P  2
*
  COMPUTE P-RESULT = P-AMOUNT * (1 + P-RATE)
END-PROC`}
        />
      </section>

      {/* Section 5: CASE Statements */}
      <section className="mb-12">
        <h2 className="section-title">5. CASE Statements</h2>
        
        <p className="text-gray-300 mb-6">
          CASE statements provide a cleaner alternative to nested IF statements 
          when checking a single field against multiple values.
        </p>

        <CodeBlock
          title="CASE_STATEMENT.EZTV"
          code={`* ============================================
* CASE STATEMENT FOR MULTI-WAY BRANCHING
* ============================================
*
W TRANS-CODE    W   2  A
W DESCRIPTION   W  30  A
*
* CASE based on transaction code
  CASE TRANS-CODE
    WHEN 'DP'
      MOVE 'DEPOSIT'         TO DESCRIPTION
      PERFORM PROCESS-DEPOSIT
    WHEN 'WD'
      MOVE 'WITHDRAWAL'      TO DESCRIPTION
      PERFORM PROCESS-WITHDRAWAL
    WHEN 'TF'
      MOVE 'TRANSFER'        TO DESCRIPTION
      PERFORM PROCESS-TRANSFER
    WHEN 'PY'
      MOVE 'PAYMENT'         TO DESCRIPTION
      PERFORM PROCESS-PAYMENT
    WHEN 'FE'
      MOVE 'SERVICE FEE'     TO DESCRIPTION
      PERFORM PROCESS-FEE
    WHEN OTHER
      MOVE 'UNKNOWN'         TO DESCRIPTION
      PERFORM LOG-ERROR
  END-CASE
*
* Equivalent nested IF (less readable)
  IF TRANS-CODE EQ 'DP'
    MOVE 'DEPOSIT' TO DESCRIPTION
  ELSE
    IF TRANS-CODE EQ 'WD'
      MOVE 'WITHDRAWAL' TO DESCRIPTION
    ELSE
*     ... continues for each value
    END-IF
  END-IF`}
          highlightLines={[9, 10, 26]}
        />
      </section>

      {/* Section 6: STOP and GOTO */}
      <section className="mb-12">
        <h2 className="section-title">6. STOP and GOTO Statements</h2>
        
        <p className="text-gray-300 mb-6">
          STOP terminates program execution, while GOTO transfers control to a labeled statement.
          Use GOTO sparingly to maintain readable code.
        </p>

        <CodeBlock
          title="STOP_GOTO.EZTV"
          code={`* ============================================
* STOP AND GOTO STATEMENTS
* ============================================
*
FILE INPUTFILE
  REC-TYPE       1    1  A
  REC-DATA       2  100  A
*
W ERROR-COUNT   W   5  N  0
W MAX-ERRORS    W   5  N  0
*
JOB INPUT INPUTFILE
*
  MOVE 100 TO MAX-ERRORS
*
* Validate record
  IF REC-TYPE EQ SPACES
    ADD 1 TO ERROR-COUNT
    GOTO SKIP-RECORD
  END-IF
*
  IF REC-DATA EQ SPACES
    ADD 1 TO ERROR-COUNT
    GOTO SKIP-RECORD
  END-IF
*
* Process valid record
  PERFORM PROCESS-RECORD
*
SKIP-RECORD.
* Check error threshold
  IF ERROR-COUNT GE MAX-ERRORS
    DISPLAY '*** TOO MANY ERRORS - ABORTING ***'
    STOP 16
  END-IF
*
STOP`}
          highlightLines={[19, 24, 30, 33]}
        />

        <div className="info-box warning mt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-mainframe-amber mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-mainframe-amber mb-1">GOTO Best Practices</h4>
              <p className="text-gray-300 text-sm">
                Excessive GOTO usage creates "spaghetti code" that's hard to maintain. 
                Prefer structured constructs (IF, DO, PROC). Use GOTO only for error handling 
                or early exit scenarios.
              </p>
            </div>
          </div>
        </div>

        <h3 className="subsection-title mt-8">STOP Return Codes</h3>

        <div className="overflow-x-auto">
          <table className="table-mainframe">
            <thead>
              <tr>
                <th>Statement</th>
                <th>Return Code</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-mainframe-green">STOP</td>
                <td>0</td>
                <td>Normal completion</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">STOP 4</td>
                <td>4</td>
                <td>Warning condition</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">STOP 8</td>
                <td>8</td>
                <td>Error condition</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">STOP 12</td>
                <td>12</td>
                <td>Severe error</td>
              </tr>
              <tr>
                <td className="text-mainframe-green">STOP 16</td>
                <td>16</td>
                <td>Critical error - abort</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-mainframe-green/20">
        <Link to="/module/2" className="btn-secondary flex items-center gap-2">
          <span>←</span>
          Previous: File Processing
        </Link>
        <Link to="/module/4" className="btn-primary flex items-center gap-2">
          Next: Data Manipulation
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
