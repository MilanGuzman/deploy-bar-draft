import { Routes, Route } from "react-router-dom"
import SportsApi from "./pages/SportsApi"
import Layout from "./layouts/Layout"
import Index from "./pages/Index"
import Chat from "./pages/Chat"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/sportsapi" element={<SportsApi />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  )
}

export default App;
