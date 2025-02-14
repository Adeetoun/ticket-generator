import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TicketsSelection from "./TicketsSelection";
import AttendeeDetails from "./AttendeeDetails";
import Ready from "./Ready";

export default function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [attendeeDetails, setAttendeeDetails] = useState(null);
  const [step, setStep] = useState(1);
  const [currentPage, setCurrentPage] = useState("ticketSelection");

  const onSaveTicketData = () => {
    if (selectedTicket && ticketCount && attendeeDetails) {
      const ticketData = {
        selectedTicket,
        ticketCount,
        attendeeDetails,
        step,
        currentPage,
      };
      localStorage.setItem("ticketData", JSON.stringify(ticketData));
    }
  };

  useEffect(() => {
    const savedTicket = JSON.parse(localStorage.getItem("ticketData"));
    if (savedTicket) {
      setSelectedTicket(savedTicket.selectedTicket);
      setTicketCount(savedTicket.ticketCount);
      setAttendeeDetails(savedTicket.attendeeDetails);
      setStep(savedTicket.step);
      setCurrentPage("Ready");
    }
  }, []);

  const handleBookTicket = () => {
    localStorage.removeItem("ticketData");
    setSelectedTicket(null);
    setTicketCount(1);
    setAttendeeDetails(null);
    setStep(1);
    setCurrentPage("ticketSelection");
  };

  const handleNextClick = () => {
    if (!selectedTicket) {
      alert("Please select a ticket before proceeding!");
      return;
    }
    setStep(2);
  };
  return (
    <div className="app">
      <NavBar />
      {step === 1 && (
        <TicketsSelection
          selectedTicket={setSelectedTicket}
          setSelectedTicket={setSelectedTicket}
          setTicketCount={setTicketCount}
          ticketCount={ticketCount}
          handleNextClick={handleNextClick}
        />
      )}
      {step === 2 && (
        <AttendeeDetails
          setAttendeeDetails={setAttendeeDetails}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <Ready
          selectedTicket={selectedTicket}
          ticketCount={ticketCount}
          attendeeDetails={attendeeDetails}
          onSaveTicketData={onSaveTicketData}
          handleBookTicket={handleBookTicket}
        />
      )}
    </div>
  );
}
