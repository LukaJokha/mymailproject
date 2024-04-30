import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <Container className="mt-5 ps-5">
      <h3 className="my-4 ms-5">The requested resource was not found</h3>
      <span className="ms-5">
        Go back
        <Link to="/c/inbox" className="ms-4 text-decoration-none text-dark fw-bold">Home</Link>
      </span>
    </Container>
  )
}
    