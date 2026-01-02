// pages/About.tsx
import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About MovieApp</h1>
      <p className="text-gray-700 mb-4">
        MovieApp is a platform for browsing, discovering, and managing movies. 
        You can explore a wide range of movies, view detailed information, 
        and keep track of your favorites.
      </p>
      <p className="text-gray-700 mb-4">
        Built using React, TypeScript, GraphQL, and TailwindCSS, MovieApp provides 
        a modern and responsive interface for seamless movie exploration.
      </p>
      <p className="text-gray-700">
        Enjoy exploring movies, discovering new favorites, and managing your collection efficiently!
      </p>
    </div>
  );
};

export default About;
