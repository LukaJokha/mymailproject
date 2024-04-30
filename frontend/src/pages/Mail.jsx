import { useEffect, useState, useContext } from "react"
import { axiosInstance } from "../axiosInstance"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Placeholder } from "react-bootstrap"
import { AuthContext } from "../AuthContext"

export const Mail = () => {
  const [mail, setMail] = useState({})
  const [archiveStatus, setArchiveStatus] = useState(null)
  const { user } = useContext(AuthContext)
  const [emailCategory, setEmailCategory] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const getEmail = async () => {
      const response = await axiosInstance.get(
        `/emails/${location.state.emailId}`
      )
      setMail(response.data.email)
      setArchiveStatus(response.data.email.archived)
      const emailCategory = window.location.pathname.split("/")
      setEmailCategory(emailCategory[2])
    }
    getEmail()
  }, [location])

  const replyMail = () => {
    navigate("/compose", { state: { mailValues: mail } })
  }

  const archiveMail = async () => {
    const response = await axiosInstance.patch(
      `/emails/${location.state.emailId}`,
      { archived: !archiveStatus }
    )
    setArchiveStatus(response.data.archived)
    if (response.data.archived) {
      navigate(`/c/inbox/${mail._id}`, {
        state: { emailId: mail._id },
      })
    }
    if (!response.data.archived) {
      navigate(`/c/archived/${mail._id}`, {
        state: { emailId: mail._id },
      })
    }
  }

  return (
    <Container className="fs-5 mt-5" style={{ paddingLeft: "6rem" }}>
      <h1>{mail.subject || <Placeholder xs={12} bg="secondary" />}</h1>
      <span className="bg-black text-white rounded-pill fs-6 px-3 pb-1">
        {emailCategory}
      </span>
      <p className="mt-2">
        <b>From: </b>
        {mail.sender && mail.sender.email}
      </p>
      <p>
        <b>To: </b>
        {mail.recipients}
      </p>
      <p className="border-bottom pb-3" style={{ width: "94%" }}>
        {mail.sentAt || <Placeholder xs={12} bg="secondary" />}
      </p>
      <p>{mail.body || <Placeholder xs={12} bg="secondary" />}</p>

      <button
        onClick={replyMail}
        className="bg-white fw-medium border rounded me-3 px-3 py-2 mt-2"
      >
        Reply
      </button>
      {mail.sender && mail.sender._id !== user._id && (
        <button
          className="bg-white fw-medium border rounded px-3 py-2 mt-2"
          onClick={archiveMail}
        >
          {archiveStatus ? "Unarchive" : "Archive"}
        </button>
      )}
    </Container>
  )
}
