import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import City from "./components/City.jsx";
import CountryList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx";
// import PageNav from "./components/PageNav.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import { CitiesProvider } from "./contexts/CityContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* <PageNav /> */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  // <CityList cities={cities} isLoading={isLoading} error={error} />
                  <Navigate replace to="cities" />
                  // here we can use the Navigate component to redirect to another route
                  // we add tis so that when we click on back it will go back to the home page
                  // and use the replace prop to replace the current route in the history stack
                  // i.e so we can click in the backword arrow
                }
              />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />}></Route>
            </Route>

            {/* <Route path="app" element={<AppLayout />} /> */}
            <Route path="*">404 Not Found</Route>
            {/* // This is a fallback route, */}
            {/* which will be displayed if the user navigates to a path that doesn't */}
            {/* match any of the other routes. The asterisk (*) is a wildcard that */}
            {/* matches any path. */}
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
