import React, { useState, useEffect } from "react";
import './profile-view.scss';
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import UserInfo from "./user-info";

export function ProfileView({ movies, onUpdatesUserInfo }) {

  return (
    <div>
      <UserInfo name={user.Username} email={user.Email} />
      <FavoriteMovies favoriteMoviesList={favoriteMoviesList} />
      <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </div>
  )
}