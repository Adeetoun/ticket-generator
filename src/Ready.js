import React, { useEffect } from "react";

export default function Ready({
  selectedTicket,
  ticketCount,
  attendeeDetails,
  onSaveTicketData,
  handleBookTicket,
}) {
  useEffect(() => {
    onSaveTicketData();
  }, [selectedTicket, ticketCount, attendeeDetails, onSaveTicketData]);

  const handleBookNewTicket = () => {
    handleBookTicket();
  };

  return (
    <div className="ticket-container">
      <div className="details">
        <h2>
          Ready <span>step 3/3</span>
        </h2>
        <hr className="hr" />
        <div className="header-booked">
          <h1>Your Ticket is Booked!</h1>
          <p>You can download or check your email for a copy</p>
        </div>
        <div className="ticket-background">
          <div className="ticket-page">
            <div className="ticket-details">
              <h3>Techember Fest "25</h3>
              <p>📍04 Rumens road, Ikoyi, Lagos</p>
              <p> 📅 March 15, 2025| 7:00 PM</p>
            </div>
            <div className="profile">
              {attendeeDetails?.profileImage ? (
                <img src={attendeeDetails.profileImage} alt="profile" />
              ) : (
                "No image uploaded"
              )}
            </div>
            <div className="pnrofile-details">
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>
                      Enter your name
                      <br />
                      <span>{attendeeDetails?.name}</span>
                    </td>
                    <td>
                      Enter your email *
                      <br />
                      <span>{attendeeDetails?.email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Ticket Type
                      <br />
                      <span>{selectedTicket}</span>
                    </td>
                    <td>
                      Ticket for
                      <br /> <span>{ticketCount}</span>
                    </td>
                  </tr>
                  <td colSpan="2">
                    Special Request? <br />
                    <span>{attendeeDetails?.about || "None"}</span>
                  </td>
                </tbody>
              </table>
              <div className="barcode">
                <img src="public\img\Bar Code.svg" alt="barcode" />
              </div>
            </div>
          </div>
        </div>
        <div className="btn">
          <button className="primary" onClick={handleBookNewTicket}>
            Book Another Ticket
          </button>
          <button className="secondary">Download Ticket</button>
        </div>
      </div>
    </div>
  );
}
