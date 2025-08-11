"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addContactFormSubmission } from "@/service/user.service";

const Support = () => {
  const userSelector = useSelector((state: RootState) => state.profileSlice);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Handle form submission
        const submission = {
          userId: userSelector._id || null,
          name: values.name,
          email: values.email,
          message: values.message,
        };
        await addContactFormSubmission(submission);
        setLoading(false);
        formik.resetForm();
        alert("Your message has been sent successfully!. We will get back to you soon.");
      } catch (error) {
        console.error("Error submitting contact form:", error);
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        p: 4,
        gap: 2,
      }}
    >
      {/* Header */}
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mb={4}>
        <HeadsetMicIcon
          sx={{
            fontSize: 80,
            color: "#FFCC00", // Yellowish color for the headset icon
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#FFCC00",
              zIndex: -1,
            },
          }}
        />
        <Typography variant="h4" fontWeight="medium" sx={{ mt: 2 }}>
          How we can help?
        </Typography>
      </Box>

      {/* Contact Cards */}
      <Box component={"form"} onSubmit={formik.handleSubmit} width={"100%"}>
        <Typography variant="subtitle1" mb={2}>
          Send us a message
        </Typography>
        <Box>
          <Typography variant="body2" mb={1}>
            Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size="small"
            margin="dense"
          />
        </Box>
        <Box>
          <Typography variant="body2" mb={1}>
            Email
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            size="small"
            margin="dense"
          />
        </Box>
        <Box>
          <Typography variant="body2" mb={1}>
            Message
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            size="small"
            margin="dense"
            multiline
            rows={4}
          />
        </Box>
        <Box mt={1}>
          <Button type="submit" variant="contained" color="primary" fullWidth loading={loading}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Support;
