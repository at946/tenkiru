import { NextPage } from "next";

const Header: NextPage = () => {
  return (
    <nav className="navbar" role="navigation" aria-label='main navigation'>
      <div className="container">
        <div className="navbar-brand">
          <span className="navbar-item">テンキル</span>
        </div>
      </div>
    </nav>
  )
}

export default Header