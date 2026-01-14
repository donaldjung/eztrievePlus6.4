import { Library, Search } from 'lucide-react'
import { useState, useMemo } from 'react'

interface GlossaryTerm {
  term: string
  definition: string
  category: 'mainframe' | 'easytrieve' | 'financial' | 'data'
  related?: string[]
}

const glossaryData: GlossaryTerm[] = [
  // Mainframe Terms
  { term: 'Batch Processing', definition: 'Processing of data in groups without user interaction, typically run during off-peak hours. Common for end-of-day processing in banks.', category: 'mainframe' },
  { term: 'JCL', definition: 'Job Control Language. The scripting language used to run programs on IBM mainframes. Defines input/output files, program execution, and job flow.', category: 'mainframe' },
  { term: 'DD Statement', definition: 'Data Definition statement in JCL. Associates a logical file name (DDNAME) with a physical dataset.', category: 'mainframe' },
  { term: 'EBCDIC', definition: 'Extended Binary Coded Decimal Interchange Code. Character encoding used on IBM mainframes, different from ASCII used on PCs.', category: 'mainframe' },
  { term: 'QSAM', definition: 'Queued Sequential Access Method. Buffered I/O method for sequential file processing on z/OS.', category: 'mainframe' },
  { term: 'VSAM', definition: 'Virtual Storage Access Method. IBM file system supporting keyed, sequential, and relative record access. Includes KSDS, ESDS, and RRDS.', category: 'mainframe' },
  { term: 'KSDS', definition: 'Key-Sequenced Data Set. VSAM file organized by a primary key, supporting both sequential and random access.', category: 'mainframe' },
  { term: 'ESDS', definition: 'Entry-Sequenced Data Set. VSAM file where records are stored in the order they are added, like a sequential file.', category: 'mainframe' },
  { term: 'RRDS', definition: 'Relative Record Data Set. VSAM file accessed by relative record number (slot position).', category: 'mainframe' },
  { term: 'DB2', definition: 'IBM\'s relational database management system for mainframes. Supports SQL for data access.', category: 'mainframe' },
  { term: 'SYSPRINT', definition: 'Standard print output dataset. Default destination for DISPLAY statements and reports.', category: 'mainframe' },
  { term: 'Return Code', definition: 'Numeric value set by a program to indicate success (0), warning (4), error (8), or severe error (12, 16).', category: 'mainframe' },
  { term: 'Abend', definition: 'Abnormal End. Program crash due to errors like invalid data, missing files, or logic errors.', category: 'mainframe' },
  { term: 'LRECL', definition: 'Logical Record Length. The size of each record in a file, in bytes.', category: 'mainframe' },
  { term: 'RECFM', definition: 'Record Format. Defines whether records are Fixed (F), Variable (V), or Undefined (U).', category: 'mainframe' },
  
  // EasyTrieve Terms
  { term: 'FILE Statement', definition: 'EasyTrieve statement that defines an input or output file and its record layout.', category: 'easytrieve', related: ['DEFINE', 'PRINTER'] },
  { term: 'DEFINE', definition: 'Statement to declare a field within a file or working storage, specifying position, length, and type.', category: 'easytrieve' },
  { term: 'JOB Statement', definition: 'Marks the beginning of EasyTrieve processing logic. Specifies the primary input file.', category: 'easytrieve' },
  { term: 'Working Storage', definition: 'Runtime variables (W fields) not tied to any file. Used for counters, accumulators, and temporary data.', category: 'easytrieve', related: ['W Field'] },
  { term: 'W Field', definition: 'Working storage field. Defined with W prefix and exists only during program execution.', category: 'easytrieve' },
  { term: 'Packed Decimal', definition: 'Efficient numeric storage format (P type). Two digits per byte plus sign nibble. Essential for financial calculations.', category: 'easytrieve' },
  { term: 'PROC', definition: 'Procedure definition. Reusable code block called with PERFORM statement.', category: 'easytrieve', related: ['PERFORM', 'END-PROC'] },
  { term: 'PERFORM', definition: 'Statement to call a procedure (PROC). Control returns after END-PROC.', category: 'easytrieve' },
  { term: 'Control Break', definition: 'Automatic processing triggered when a control field value changes. Used for subtotals in reports.', category: 'easytrieve', related: ['CONTROL', 'SUM'] },
  { term: 'SEQUENCE BY', definition: 'Report statement specifying the order of data. Used with CONTROL for proper break processing.', category: 'easytrieve' },
  { term: 'TALLY', definition: 'Report keyword marking a field for automatic summarization at control breaks.', category: 'easytrieve' },
  { term: 'SYNCHRONIZED', definition: 'JOB option for processing multiple files matched by key. Files must be pre-sorted.', category: 'easytrieve' },
  { term: 'MASK', definition: 'Format pattern for displaying numeric values. Controls signs, decimals, and zero suppression.', category: 'easytrieve' },
  { term: 'PARM', definition: 'Program parameter statement. Controls debug output, date format, and processing options.', category: 'easytrieve' },
  
  // Financial Terms
  { term: 'Reconciliation', definition: 'Process of matching transactions between systems to ensure accuracy. Critical for daily balancing.', category: 'financial' },
  { term: 'Control Total', definition: 'Sum of key amounts used to verify data integrity during processing.', category: 'financial' },
  { term: 'Audit Trail', definition: 'Record of changes including before/after values, timestamps, and user IDs for compliance and research.', category: 'financial' },
  { term: 'Aging Report', definition: 'Report showing items grouped by time elapsed (30/60/90+ days). Common for receivables and delinquency.', category: 'financial' },
  { term: 'General Ledger (GL)', definition: 'Master accounting record containing all financial transactions organized by account.', category: 'financial' },
  { term: 'Chart of Accounts', definition: 'Organized list of all GL accounts used by an organization.', category: 'financial' },
  { term: 'CTR', definition: 'Currency Transaction Report. Required filing for cash transactions of $10,000 or more (BSA compliance).', category: 'financial' },
  { term: 'SAR', definition: 'Suspicious Activity Report. Required filing when suspicious transactions are detected.', category: 'financial' },
  { term: 'Call Report', definition: 'Quarterly regulatory report filed by banks with FDIC/Federal Reserve containing financial data.', category: 'financial' },
  { term: 'Delinquency', definition: 'Loan or payment that is past due. Measured in days past due and categorized into aging buckets.', category: 'financial' },
  { term: 'CIF', definition: 'Customer Information File. Master file containing customer demographic and relationship data.', category: 'financial' },
  { term: 'DDA', definition: 'Demand Deposit Account. Checking account that allows withdrawals on demand.', category: 'financial' },
  { term: 'End of Day (EOD)', definition: 'Batch processing cycle that runs after business hours to post transactions and update balances.', category: 'financial' },
  { term: 'Float', definition: 'Time between when a transaction is initiated and when funds are available. Important for cash management.', category: 'financial' },
  
  // Data Processing Terms
  { term: 'Master File', definition: 'Primary data file containing current state of entities (customers, accounts). Updated by transactions.', category: 'data' },
  { term: 'Transaction File', definition: 'File containing changes to be applied to master file. Typically generated from daily activity.', category: 'data' },
  { term: 'Extract', definition: 'Subset of data pulled from one or more sources for reporting or processing.', category: 'data' },
  { term: 'Match/Merge', definition: 'Process of combining records from multiple files based on common key fields.', category: 'data' },
  { term: 'Exception Report', definition: 'Report showing only items that fail validation or meet alert criteria.', category: 'data' },
  { term: 'Before Image', definition: 'Copy of a record before changes are applied. Used in audit trails.', category: 'data' },
  { term: 'After Image', definition: 'Copy of a record after changes are applied. Compared with before image for audits.', category: 'data' },
  { term: 'Hash Total', definition: 'Sum of field values used for validation. May not have business meaning (e.g., sum of account numbers).', category: 'data' },
]

const categories = [
  { id: 'all', label: 'All Terms' },
  { id: 'mainframe', label: 'Mainframe' },
  { id: 'easytrieve', label: 'EasyTrieve' },
  { id: 'financial', label: 'Financial' },
  { id: 'data', label: 'Data Processing' },
]

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTerms = useMemo(() => {
    return glossaryData
      .filter((term) => {
        const matchesSearch = 
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => a.term.localeCompare(b.term))
  }, [searchQuery, selectedCategory])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mainframe': return 'bg-mainframe-green/20 text-mainframe-green border-mainframe-green/30'
      case 'easytrieve': return 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30'
      case 'financial': return 'bg-accent-gold/20 text-accent-gold border-accent-gold/30'
      case 'data': return 'bg-accent-magenta/20 text-accent-magenta border-accent-magenta/30'
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-mainframe-green/20 flex items-center justify-center border border-mainframe-green/30">
            <Library className="text-mainframe-green" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Glossary</h1>
            <p className="text-gray-400">Mainframe, EasyTrieve, and financial terminology</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-mainframe-terminal border border-mainframe-green/20 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-mainframe-green/50 focus:ring-1 focus:ring-mainframe-green/30 transition-all font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-mainframe-green/20 text-mainframe-green border border-mainframe-green/50'
                  : 'bg-mainframe-terminal text-gray-400 border border-mainframe-green/20 hover:border-mainframe-green/40 hover:text-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredTerms.length} of {glossaryData.length} terms
      </p>

      {/* Terms List */}
      <div className="space-y-4">
        {filteredTerms.map((item) => (
          <div key={item.term} className="card-highlight">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-display font-semibold text-white">
                    {item.term}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs font-mono rounded border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.definition}
                </p>
                {item.related && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Related:</span>
                    {item.related.map((rel) => (
                      <button
                        key={rel}
                        onClick={() => setSearchQuery(rel)}
                        className="text-xs text-mainframe-green hover:underline"
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Library size={48} className="mx-auto mb-4 opacity-30" />
            <p>No terms found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="mt-2 text-mainframe-green hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
