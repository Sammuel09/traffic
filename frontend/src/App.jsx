import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CountForm from "./components/CountForm";
import CountTable from "./components/CountTable";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col justify-center items-center min-h-screen">
                <CountForm />
              </div>
            }
          />
          <Route path="/counts" element={<CountTable />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
