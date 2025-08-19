import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import Patients from "./views/Patients";
import Layout from "./layouts/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index/>
          <Route path="/patients" element={<Patients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
