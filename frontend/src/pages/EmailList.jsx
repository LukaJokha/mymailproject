import { useEffect, useState } from "react"
import { Container, Row, Col, Placeholder } from "react-bootstrap"
import { axiosInstance } from "../axiosInstance"
import { useNavigate } from "react-router-dom"

export const Category = () => {
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const emailCategory = window.location.pathname

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get(`/emails${emailCategory}`)
        if (response.data.emails && response.data.emails.length > 0) {
          setEmails(response.data.emails.reverse())
        } else {
          setEmails([])
        }
      } catch (error) {
        console.error("Error fetching emails:", error)
      }
      setLoading(false)
    }
    fetchEmails()
  }, [emailCategory])

  const openEmail = async (emailId) => {
    navigate(`${emailCategory}/${emailId}`, { state: { emailId } })
  }

  return (
    <Container className="ps-5">
      <h4 className="ms-5 mt-5 fw-bold mb-4">Inbox</h4>
      {loading && (
        <Placeholder as="p" animation="glow">
          <Container className="mt-4 ms-4">
            <Placeholder
              className="border rounded mb-2 py-4"
              bg="secondary"
              xs={12}
            />
            <Placeholder
              className="border rounded mb-2 py-4"
              bg="secondary"
              xs={12}
            />
            <Placeholder
              className="border rounded mb-2 py-4"
              bg="secondary"
              xs={12}
            />
          </Container>
        </Placeholder>
      )}
      {emails.length === 0 && !loading ? (
        <p className="fs-5 ms-5 mt-5">No emails</p>
      ) : (
        emails.map((email) => {
          return (
            <Row
              key={email._id}
              className="border-bottom py-3 fs-5"
              style={{ width: "92%", marginLeft: "2rem" }}
              onClick={() => openEmail(email._id)}
            >
              <Col className="col-5 fw-semibold">{email.sender.email}</Col>
              <Col className="col-5">{email.subject}</Col>
              <Col>{email.sentAt}</Col>
            </Row>
          )
        })
      )}
    </Container>
  )
}
