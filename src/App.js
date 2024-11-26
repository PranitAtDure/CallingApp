import logo from "./logo.svg";
import "./App.css";
import PhoneList from "./Component/PhoneList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./Component/AddContact";
import MobileLayout from "./Component/MobileLayout";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<AddContact />}></Route>
          <Route path="/list" element={<PhoneList></PhoneList>}></Route>
          <Route path="/addcontact" element={<AddContact />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
