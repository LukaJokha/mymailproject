import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { axiosInstance } from "../axiosInstance";
import { string, object, ref } from "yup";

export const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("");

  const registerUser = async (registerValues, { setSubmitting }) => {
    try {
      const response = await axiosInstance.post("/user/register", registerValues);
      setUser(response.data.user);
      navigate("/c/inbox");
    } catch (error) {
      setConfirmPasswordStatus("Registration failed. Please try again.");
      setSubmitting(false);
    }
  };

  const formInitialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formSchema = object({
    email: string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: string()
      .min(8, "Password must be at least 8 characters")
      .max(12, "Password must be under 12 characters")
      .required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={registerUser}
      validationSchema={formSchema}
    >
      {(formik) => (
        <Form>
          <Container className="d-flex flex-column align-items-center mt-5">
            <Row className="w-25 mt-3">
              <label htmlFor="email" className="fw-bold ps-0 pb-2">
                Email
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                className="border border-secondary-subtle border-2 rounded-3 p-2"
              />
              <ErrorMessage
                className="text-danger m-0 p-0"
                component="p"
                name="email"
              />
            </Row>
            <Row className="w-25 mt-3">
              <label htmlFor="password" className="fw-bold ps-0 pb-2">
                Password
              </label>
              <Field
                name="password"
                type="password"
                id="password"
                className="border border-secondary-subtle border-2 rounded-3 p-2"
              />
              <ErrorMessage
                className="text-danger m-0 p-0"
                component="p"
                name="password"
              />
            </Row>
            <Row className="w-25 mt-3">
              <label htmlFor="confirmPassword" className="fw-bold ps-0 pb-2">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                className="border border-secondary-subtle border-2 rounded-3 p-2"
              />
              <ErrorMessage
                className="text-danger m-0 p-0"
                component="p"
                name="confirmPassword"
              />
              {confirmPasswordStatus && (
                <p className="text-danger m-0 p-0">{confirmPasswordStatus}</p>
              )}
            </Row>
            <Row className="w-25 mt-3">
              <Col className="col-7 p-0 me-3">
                <p className="m-0">Already have an account?</p>
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </Col>
              <Col className="ps-1 pe-0">
                <button
                  type="submit"
                  className="bg-dark text-light border-0 rounded-3 px-3 py-2 ms-4"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Registering..." : "Register"}
                </button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};