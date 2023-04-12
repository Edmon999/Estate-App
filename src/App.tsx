import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./features/RealEstate/components/MainPage/MainPage";
import PropertyDetailPage from "./features/RealEstate/components/PropertyDetailPage/PropertyDetailPage";

function App() {
  return (
    <>
      {" "}
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
