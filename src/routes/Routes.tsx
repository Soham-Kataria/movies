import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Login from "../pages/Login";

import MovieDetails from "../pages/Movies/MovieDetails";
import MovieList from "../pages/Movies/MovieList";
import MovieCardPage from "../pages/Movies/MovieCardPage";
import AddMovies from "../pages/Movies/AddMovies";
import EditMovie from "../pages/Movies/EditMovie";

import PersonsList from "../pages/Persons/PersonsList";
import AddPerson from "../pages/Persons/AddPerson";
import EditPerson from "../pages/Persons/EditPerson";
import PersonDetails from "../pages/Persons/PersonDetails";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />

          <Route path="movie-cards/:id" element={<MovieDetails />} />
          <Route path="movie-list" element={<MovieList />} />
          <Route path="movie-card" element={<MovieCardPage />} />
          <Route path="movies-card/create" element={<AddMovies />} />
          <Route path="movies-card/:id/edit" element={<EditMovie />} />

          <Route path="person-list" element={<PersonsList />} />
          <Route path="person/:id" element={<PersonDetails />} />
          <Route path="person/create" element={<AddPerson />} />
          <Route path="person/:id/edit" element={<EditPerson />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default PageRoutes;
