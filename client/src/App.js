import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import {
  AllProducts,
  Profile,
  SharedLayout,
  Stats,
  AddProduct,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="all-products" element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
