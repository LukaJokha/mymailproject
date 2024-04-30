import { Navbar, Container, ListGroup, Placeholder } from "react-bootstrap"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { axiosInstance } from "../axiosInstance"

export const Layout = () => {
  const { user, setUser, initialLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = async () => {
    await axiosInstance.delete("/user/logout")
    setUser(null)
    navigate("/")
  }

  return (
    <>
      <header className="d-flex justify-content-center">
        <Nav expand="lg" className="w-75 border-bottom">
          <Container>
            <NavLink to="/" className="text-decoration-none text-dark">
              <h3>📬 Mail</h3>
            </NavLink>
            <Nav.Toggle aria-controls="basic-navbar-nav" />
            <Nav.Collapse id="basic-navbar-nav">
              {initialLoading ? (
                <Placeholder as="p" animation="glow" className="ms-5">
                  <Container className="ms-5 mt-4 d-flex flex-row">
                    <Placeholder
                      className="w-75 border rounded ms-5 mb-2 py-3"
                      bg="secondary"
                      xs={12}
                    />
                    <Placeholder
                      className="w-75 border rounded ms-5 mb-2 py-3"
                      bg="secondary"
                      xs={12}
                    />
                    <Placeholder
                      className="w-75 border rounded ms-5 mb-2 py-3"
                      bg="secondary"
                      xs={12}
                    />
                  </Container>
                </Placeholder>
              ) : (
                <Container className="d-flex justify-content-end">
                  {!user ? (
                    <>
                      <Nav horizontal>
                        <Nav.Item
                          action
                          active={window.location.pathname === "/login"}
                          bg={
                            window.location.pathname === "/login"
                              ? "info"
                              : "light"
                          }
                          className="rounded px-3 py-2 me-4"
                        >
                          <NavLink
                            to="/login"
                            className="text-decoration-none text-dark"
                          >
                            <h6>Login</h6>
                          </NavLink>
                        </Nav.Item>
                        <Nav.Item
                          action
                          active={window.location.pathname === "/register"}
                          bg={
                            window.location.pathname === "/register"
                              ? "info"
                              : "light"
                          }
                          className="border rounded px-3 py-2 me-4"
                        >
                          <NavLink
                            to="/register"
                            className="text-decoration-none text-dark"
                          >
                            <h6>Register</h6>
                          </NavLink>
                        </Nav.Item>
                      </Nav>
                    </>
                  ) : (
                    <>
                      <Nav horizontal>
                        <Nav.Item
                          action
                          active={window.location.pathname === "/c/inbox"}
                          bg={
                            window.location.pathname === "/c/inbox"
                              ? "info"
                              : "light"
                          }
                          className="border rounded px-3 py-2 me-4"
                        >
                          <NavLink
                            to="/c/inbox"
                            className="text-decoration-none text-dark"
                          >
                            <h6>Inbox</h6>
                          </NavLink>
                        </Nav.Item>
                        <Nav.Item
                          action
                          active={window.location.pathname === "/c/sent"}
                          bg={
                            window.location.pathname === "/c/sent"
                              ? "info"
                              : "light"
                          }
                          className="border rounded px-3 py-2 me-4"
                        >
                          <NavLink
                            to="/c/sent"
                            className="text-decoration-none text-dark"
                          >
                            <h6>Sent</h6>
                          </NavLink>
                        </Nav.Item>
                        <Nav.Item
                          action
                          active={window.location.pathname === "/c/archived"}
                          bg={
                            window.location.pathname === "/c/archived"
                              ? "info"
                              : "light"
                          }
                          className="border rounded px-3 py-2 me-4"
                        >
                          <NavLink
                            to="/c/archived"
                            className="text-decoration-none text-dark"
                          >
                            <h6>Archived</h6>
                          </NavLink>
                        </Nav.Item>
                        <Nav.Item
                          action
                          active={window.location.pathname === "/compose"}
                          bg={
                            window.location.pathname === "/compose"
                              ? "info"
                              : "light"
                          }
                          className="border rounded px-3 py-2 me-4"
                        >
                          <NavLink
                            to="/compose"
                            className="text-decoration-none text-dark"
                          >
                            <h6>Compose</h6>
                          </NavLink>
                        </Nav.Item>
                      </Nav>
                      <h5 className="me-4">{user.email}</h5>
                      <button
                        onClick={logout}
                        className="nav-button text-decoration-none text-dark border px-3 py-2 rounded"
                      >
                        <h6>Logout</h6>
                      </button>
                    </>
                  )}
                </Container>
              )}
            </Nav.Collapse>
          </Container>
        </Nav>
      </header>
      <main>
        {initialLoading ? (
          <Placeholder as="p" animation="glow" className="ms-5 ps-5">
            <Container className="ms-5 mt-4">
              <Placeholder
                className="w-75 border rounded ms-5 mb-2 py-5"
                bg="secondary"
                xs={12}
              />
              <Placeholder
                className="w-75 border rounded ms-5 mb-2 py-5"
                bg="secondary"
                xs={12}
              />
              <Placeholder
                className="w-75 border rounded ms-5 mb-2 py-5"
                bg="secondary"
                xs={12}
              />
            </Container>
          </Placeholder>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  )
}
