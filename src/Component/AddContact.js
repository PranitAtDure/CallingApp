import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleToastClose = () => {
    navigate("/list");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const notify = () =>
    toast("Contact added", {
      autoClose: 2000,
      onClose: handleToastClose,
    });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    existingContacts.push(formData);
    localStorage.setItem("contacts", JSON.stringify(existingContacts));
    notify();
    setFormData({ name: "", phone: "" });
  };

  return (
    <div className="addContactPage">
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Contact
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="phone"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Add Contact
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default AddContact;
