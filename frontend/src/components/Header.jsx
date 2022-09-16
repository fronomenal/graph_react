import logo from "../assets/logo.png"

export default function Header() {
  return (
    <nav className="bg-light mb-4 p-0">
      <div className="container">
        <a href="" className="navbar-brand">
          <div className="d-flex align-items-center">
            <img src={logo} alt="" className="mr-2" />
            <div>Graph Management</div>
          </div>
        </a>
      </div>
    </nav>
  )
}
