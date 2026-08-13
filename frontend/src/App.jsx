import './App.css'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import MainContent from './components/MainContent.jsx'

function App() {
  return (
    <>
      <Header />
      
      <div className="app-layout">
        <Sidebar />
        <MainContent />
      </div>
    </>
  )
}

export default App