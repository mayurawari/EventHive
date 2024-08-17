import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { Nav } from './pages/Nav'


function App() {

  return (
  <>
  <AuthProvider>

  </AuthProvider>
  <Nav/>
  </>
  )
}

export default App
