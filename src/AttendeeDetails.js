import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AttendeeDetails({ setAttendeeDetails, setStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCloudinaryWidget = () => {
    setUploading(true);

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxqfiqhx5",
        uploadPreset: "ticket_generator",
        multiple: false,
        cropping: true,
        showAdvancedOptions: false,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setProfileImage(result.info.secure_url);
          setUploading(false);
        }
      }
    );
    widget.open();
  };

  const onSubmit = (data) => {
    const attendeeData = { ...data, profileImage };

    setAttendeeDetails(attendeeData);
    setStep(3);
  };

  return (
    <div className="container">
      <div className="details">
        <h2>
          Attendee Details <span>step 2/3</span>
        </h2>
        <hr className="hr" />
        <div className="photo-container">
          <h5>Upload Profile Photo</h5>
          <div className="profile-box" onClick={openCloudinaryWidget}>
            {uploading ? (
              <p className="profile-text">click to upload</p>
            ) : profileImage ? (
              <img
                src={profileImage}
                alt="Uploaded"
                className="profile-image"
              />
            ) : (
              <p className="profile-text">click to upload</p>
            )}
          </div>
        </div>

        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form">
            <label htmlFor="name">Enter your name</label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="form">
            <label htmlFor="email">Enter your email*</label>
            <input
              id="email"
              type="email"
              placeholder="✉ hello@dettyoflag.io"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form">
            <label htmlFor="about">Special Request?</label>
            <textarea
              id="about"
              {...register("about", { required: "About is required" })}
            />
            {errors.about && <p>{errors.about.message}</p>}
          </div>
          <div className="btn button">
            <button
              className="primary"
              type="button"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button className="secondary" type="submit">
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
