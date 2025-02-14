import React from "react";

export default function TicketsSelection({
  selectedTicket,
  setSelectedTicket,
  setTicketCount,
  ticketCount,
  ticketError,
  handleNextClick,
}) {
  const handleTicketSelection = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  return (
    <div className="container">
      <div className="about">
        <h2>
          Ticket Selection <span>step 1/3</span>
        </h2>
        <hr className="hr" />
        <div className="about-container">
          <div className="header">
            <h1>Techember Fest "25</h1>
            <p>
              Join us for an unforgettable experience at Techember Fest "25!
              Secure your spot now.
            </p>
            <p>📍04 Rumens road, Ikoyi, Lagos || March 15, 2025| 7:00 PM</p>
          </div>
          <hr />
          <h5>Select Ticket Type:</h5>
          <div className="tickets">
            {["Regular", "VIP", "VVIP"].map((type, index) => (
              <div
                key={index}
                className={`ticket ${
                  selectedTicket === type ? "selected" : ""
                }`}
                onClick={() => handleTicketSelection(type)}
              >
                <h3>
                  {type} Access
                  <span>
                    {type === "Regular"
                      ? "Free"
                      : type === "VIP"
                      ? "$50"
                      : "$150"}
                  </span>
                </h3>
                <p>20/52</p>
              </div>
            ))}
          </div>
          {ticketError && <p className="error-message">{ticketError}</p>}
          <h5>Number of Tickets</h5>
          <select
            value={ticketCount}
            onChange={(e) => setTicketCount(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <div className="btn">
            <button
              className="primary"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
            <button className="secondary" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
