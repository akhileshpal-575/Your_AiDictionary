import React from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {/* Main content */}
      </div>

      <Footer />
    </div>
  );
}


export default App