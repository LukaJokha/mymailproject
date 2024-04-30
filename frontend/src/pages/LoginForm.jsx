import { Formik, Form, Field, ErrorMessage } from "formik"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { string, object } from "yup"
import { axiosInstance } from "../axiosInstance"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthContext"

export const Login = () => {
  const formInitialValues = {
    email: "",
    password: "",
  }

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const login = async (loginValues, { setSubmitting }) => {
    const response = await axiosInstance.post("/user/login", loginValues)
    setUser(response.data.user)
    setSubmitting(false)
    navigate("/c/inbox")
  }

  const formSchema = object({
    email: string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: string()
      .min(4, "Password must be at least 4 characters")
      .max(12, "Password must be under 12 characters")
      .required("Password is required"),
  })

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={login}
      validationSchema={formSchema}
    >
      {(formik) => {
        return (
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
                <Col className="col-9 p-0 d-flex flex-row">
                  <p className="m-0 me-1">Don&apost have an account?</p>
                  <Link to="/register" className="text-decoration-none">
                    Register
                  </Link>
                </Col>
                <Col className="col-3 ps-2">
                  <button
                    type="submit"
                    className="bg-dark text-light border-0 rounded-3 px-3 py-2"
                    disabled={formik.isSubmitting}
                  >
                    Login
                  </button>
                </Col>
              </Row>
            </Container>
          </Form>
        )
      }}
    </Formik>
  )
}
