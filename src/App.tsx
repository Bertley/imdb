import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { NoMatch } from "./modules/Error";
import Home from "./modules/Home";
import Layout from "./modules/Layout";
import Liked from "./modules/Liked";
import { MoviesProvider } from "./hooks/Movies";

export default function App() {
  return (
    <MoviesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="liked" element={<Liked />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </MoviesProvider>
  );
}
