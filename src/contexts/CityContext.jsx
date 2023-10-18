/* eslint-disable react/prop-types */
import { createContext, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useReducer } from "react";
const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

CitiesContext.propTypes = {
  children: PropTypes.node.isRequired,
};
function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "cities/loading" });

      const res = await fetch(`${BASE_URL}/cities`);
      if (!res.ok) {
        // setError("Could not fetch data for that resource");
        // setIsLoading(() => false);
        dispatch({ type: "rejected", payload: "Could not fetch data" });
      }
      const data = await res.json();
      // setCities(data)
      dispatch({ type: "cities/loaded", payload: data });
      // setIsLoading(() => false);
    }
    try {
      fetchCities();
    } catch (error) {
      // setError(error.message);
      // setIsLoading(() => false);
    }
  }, []);
  async function getCity(id) {
    // setIsLoading(() => true);
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "cities/loading" });
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    if (!res.ok) {
      // setError("Could not fetch data for that resource");
      // setIsLoading(() => false);
      dispatch({ type: "rejected", payload: "Could not fetch data" });
    }
    const data = await res.json();
    // setCurrentCity(data);
    // setIsLoading(() => false);
    dispatch({ type: "city/loaded", payload: data });
  }
  async function createCity(newCity) {
    // setIsLoading(() => true)
    dispatch({ type: "cities/loading" });
    const res = await fetch(`${BASE_URL}/cities `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    });
    if (!res.ok) {
      // setError("error creating the city");
      // setIsLoading(() => false);
      dispatch({ type: "rejected", payload: "Could not create data" });
    }
    const data = await res.json();
    // setCurrentCity(data);
    console.log(data);
    // setCities((prevCities) => [...prevCities, data]);
    // setIsLoading(() => false);
    dispatch({ type: "city/created", payload: data });
  }

  async function deleteCity(id) {
    // setIsLoading(() => true);
    dispatch({ type: "cities/loading" });
    const res = await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      // setError("error deleting the city");
      // setIsLoading(() => false);
      dispatch({ type: "rejected", payload: "Could not delete data" });
    }
    const data = await res.json();
    // setCurrentCity(data);
    console.log(data);
    // setCities((cities) => cities.filter((city) => city.id != id));
    // setIsLoading(() => false);
    dispatch({ type: "city/deleted", payload: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
