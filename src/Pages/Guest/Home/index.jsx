import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-info">
        <h2 className="hero-title">YOUR API</h2>
        <p className="hero-paragraph">
          Free API for Learning provides a great resource for developers and
          students looking to improve their skills. The YOUR API provides a
          platform for experimentation, testing code, and integrating API
          services into projects. The API is usually comprehensive,
          user-friendly, and well-documented, making it an ideal starting point
          for those new to API development. The free API also offers a chance
          for developers to practice and hone their coding abilities and come up
          with innovative solutions to real-world problems. Whether you're just
          starting out or have years of experience, a site with a free API for
          learning is a valuable asset for advancing your skills and staying
          current with technological advancements.
        </p>
        <Link to="/dashboard/" className="btn-hero">
          CREATE AN ACCOUNT
        </Link>
      </div>
      <img
        src="/assets/images/hero.png"
        className="hero-img"
        alt="hero background"
      />

      <ul className="circles">
        <li>01010</li>
        <li>10101</li>
        <li>01010</li>
        <li>10101</li>
        <li>01010</li>
        <li>10101</li>
        <li>01010</li>
        <li>10101</li>
        <li>01010</li>
        <li>10101</li>
      </ul>
    </div>
  );
};

export default Home;
