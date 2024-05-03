import { act, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Post from "./pages/Post";
import Edit from "./pages/Edit";
import NoPage from "./pages/NoPage"
import Users from "./pages/Users";
import { useEffect } from "react";
import { THIRD_BASE_URL } from "./services/api";
import { getUsersData } from "./services";
import { endPoints } from "./services/api";
import { getAllData } from "./services";
// import { getAllDataProducts } from "./services";
import { useReducer } from "react";
import "./index.css";
import "./App.css";

function App() {
  //   function reducer(state, action) {
  //     switch (action.type) {
  //       case "SetSuppliers":
  //         return {
  //           ...state,
  //           suppliers: action.suppliers,
  //         };
  //       case "SetProducts":
  //         return {
  //           ...state,
  //           products: action.products,
  //           filteredProd: action.products,
  //         };
  //       case "setAllProducts":
  //         return { ...state, AllProducts: action.Allprodutcs };
  //       default:
  //         break;
  //     }
  //   }

  //   const [state, dispatch] = useReducer(reducer, {
  //     suppliers: [],
  //     products: [],
  //     filteredProd: [],
  //   });

  //   useEffect(() => {
  //     getAllData(endPoints.suppliers).then((res) => {
  //       dispatch({
  //         type: "SetSuppliers",
  //         suppliers: res,
  //       });
  //     });
  //   }, []);
  //   useEffect(() => {
  //     getAllDataProducts(endPoints.products).then((response) => {
  //       dispatch({
  //         type: "setAllProducts",
  //         AllProducts: response,
  //       });
  //     });
  //   }, []);

  //   const { data, AllProducts } = state;

  function reducer(state, action) {
    switch (action.type) {
      case "setUsers":
        return {
          ...state,
          users: action.users,
        }
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    users: []
  });

  useEffect(() => {
    getUsersData(endPoints.users).then((response) => {
      dispatch({
        type: "setUsers",
        users: response,
      });
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Admin />} />
          <Route
            path="Home"
            element={
              <Home
              />
            }
          />
          <Route path="Users" element={<Users state={state} dispatch={dispatch} />} />
          <Route path="Post" element={<Post />} />
          <Route path="Edit" element={<Edit />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
