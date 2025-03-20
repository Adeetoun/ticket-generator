import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TicketsSelection from "./TicketsSelection";
import AttendeeDetails from "./AttendeeDetails";
import Ready from "./Ready";

export default function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [attendeeDetails, setAttendeeDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState("ticketSelection");
  const [ticketError, setTicketError] = useState("");
  const [step, setStep] = useState(() => {
    return Number(localStorage.getItem("currentStep")) || 1;
  });

  const updateStep = (newStep) => {
    setStep(newStep);
    localStorage.setItem("currentStep", newStep);
  };

  useEffect(() => {
    localStorage.setItem("currentStep", step);
  }, [step]);

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

    const savedStep = Number(localStorage.getItem("currentStep"));
    if (savedStep) {
      setStep(savedStep);
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
      setTicketError("Please choose a ticket to proceed!");
      return;
    }
    setTicketError("");
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
          ticketError={ticketError}
          setStep={setStep}
          updateStep={updateStep}
          step={step}
        />
      )}
      {step === 2 && (
        <AttendeeDetails
          setAttendeeDetails={setAttendeeDetails}
          setStep={setStep}
          updateStep={updateStep}
          step={step}
          selectedTicket={selectedTicket}
        />
      )}
      {step === 3 && (
        <Ready
          selectedTicket={selectedTicket}
          ticketCount={ticketCount}
          attendeeDetails={attendeeDetails}
          onSaveTicketData={onSaveTicketData}
          handleBookTicket={handleBookTicket}
          updateStep={updateStep}
          step={step}
        />
      )}
    </div>
  );
}
