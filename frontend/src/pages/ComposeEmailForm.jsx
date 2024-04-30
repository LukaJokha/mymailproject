import { Container, Row } from "react-bootstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { string, object } from "yup"
import { axiosInstance } from "../axiosInstance"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export const Compose = () => {
  const [newEmail, setNewEmail] = useState({})
  const [replyValues, setReplyValues] = useState(null)

  const location = useLocation()

  const navigate = useNavigate()

  const formInitialValues = {
    recipients: [],
    subject: "",
    body: "",
  }

  useEffect(() => {
    if (location.state.mailValues !== null) {
      const mailValues = location.state.mailValues
      const recipientEmails = mailValues.recipients.map(
        (recipient) => recipient.email
      )
      const newMailValues = {
        ...mailValues,
        recipients: recipientEmails.join(","),
      }
      setReplyValues(newMailValues)
    }
  }, [location])

  console.log(replyValues)

  const formSchema = object({
    recipients: string().required("Email is required"),
    subject: string()
      .min(3, "Subject must be at least 3 characters")
      .required("Subject is required"),
    body: string()
      .min(3, "Body must be at least 3 characters")
      .required("Body is required"),
  })

  const handleComposeEmail = async ({ recipients, subject, body }) => {
    const recipientsArray = recipients.split(",")
    const emailValues = {
      recipients: recipientsArray,
      subject,
      body,
    }
    const response = await axiosInstance.post("/emails", emailValues)
    // console.log(response.data)
    if (!response.data.message) {
      navigate(`/c/sent/${response.data.newEmail._id}`, {
        state: { emailId: response.data.newEmail._id },
      })
    }
    setNewEmail(response.data)
  }
  return (
    <Formik
      initialValues={replyValues || formInitialValues}
      onSubmit={handleComposeEmail}
      validationSchema={formSchema}
    >
      {(formik) => {
        return (
          <Form>
            <Container className="d-flex flex-column align-items-center mt-5">
              {newEmail.message && (
                <p className="border border-danger rounded py-2 w-25 text-danger text-center">
                  {newEmail.message}
                </p>
              )}
              <Row className="w-50 mt-3">
                <label htmlFor="recipients" className="fw-bold ps-0 pb-2">
                  Recipients
                </label>
                <Field
                  name="recipients"
                  type="input"
                  id="recipients"
                  className="border
            border-secondary-subtle border-2 rounded-3 p-2"
                />
                <ErrorMessage
                  className="text-danger m-0 p-0"
                  component="p"
                  name="recipients"
                />
              </Row>
              <Row className="w-50 mt-3">
                <label htmlFor="subject" className="fw-bold ps-0 pb-2">
                  Subject
                </label>
                <Field
                  name="subject"
                  type="input"
                  id="subject"
                  className="border
            border-secondary-subtle border-2 rounded-3 p-2"
                />
                <ErrorMessage
                  className="text-danger m-0 p-0"
                  component="p"
                  name="subject"
                />
              </Row>
              <Row className="w-50 mt-3">
                <label htmlFor="body" className="fw-bold ps-0 pb-2">
                  Body
                </label>
                <Field
                  name="body"
                  component="textarea"
                  id="body"
                  rows="10"
                  className="border
            border-secondary-subtle border-2 rounded-3 p-2"
                />
                <ErrorMessage
                  className="text-danger m-0 p-0"
                  component="p"
                  name="body"
                />
              </Row>
            </Container>
            <Container className="w-50 mt-3 d-flex justify-content-end align-items-center">
              <button
                type="submit"
                className="bg-dark text-light border-0 rounded-3 px-3 py-2 me-5"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Sending..." : "Send"}
              </button>
            </Container>
          </Form>
        )
      }}
    </Formik>
  )
}
