import './Header.css'

function Header() {
    return (
        <nav className="header">
            <section className="header-title">
                <h1>Integration Hub</h1>
            </section>
            <section className="header-caption">
                <p>A full-stack API designed to simulate an integration
                hub connecting common business resources.</p>
                <p>Kwooby</p>
            </section>
        </nav>
    )
}

export default Header