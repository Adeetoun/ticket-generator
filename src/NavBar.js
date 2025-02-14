import React from "react";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo">
        <img src="/img/logo.png" alt="logo" />
      </div>
      <div className="nav">
        <ul>
          <li>Events</li>
          <li>My Tickets</li>
          <li>About Projects</li>
        </ul>
      </div>
      <div className="ticket-nav">
        <li>My Tickets➡️</li>
      </div>
    </div>
  );
}
