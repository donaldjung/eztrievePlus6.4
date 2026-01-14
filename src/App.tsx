import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Module1Fundamentals from './pages/modules/Module1_Fundamentals'
import Module2FileProcessing from './pages/modules/Module2_FileProcessing'
import Module3ControlStructures from './pages/modules/Module3_ControlStructures'
import Module4DataManipulation from './pages/modules/Module4_DataManipulation'
import Module5ReportGeneration from './pages/modules/Module5_ReportGeneration'
import Module6SortingSummarization from './pages/modules/Module6_SortingSummarization'
import Module7FinancialApplications from './pages/modules/Module7_FinancialApplications'
import Playground from './pages/Playground'
import CheatSheet from './pages/CheatSheet'
import Glossary from './pages/Glossary'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/1" element={<Module1Fundamentals />} />
        <Route path="/module/2" element={<Module2FileProcessing />} />
        <Route path="/module/3" element={<Module3ControlStructures />} />
        <Route path="/module/4" element={<Module4DataManipulation />} />
        <Route path="/module/5" element={<Module5ReportGeneration />} />
        <Route path="/module/6" element={<Module6SortingSummarization />} />
        <Route path="/module/7" element={<Module7FinancialApplications />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/cheatsheet" element={<CheatSheet />} />
        <Route path="/glossary" element={<Glossary />} />
      </Routes>
    </Layout>
  )
}

export default App
