import {BrowserRouter, Routes, Route} from "react-router-dom"
import Pemesanan from "./pages/Pemesanan"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pemesanan" element={<Pemesanan />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
