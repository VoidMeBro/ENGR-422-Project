const { useState } = React;

function HamburgerComponent() {
    const [open, setOpen] = useState(false);

    return (
        <div className="hamburger-inner">
            <button
                type="button"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                {open ? "✕" : "☰"}
            </button>

            {open ? (
                <div className="hamburger-menu">
                    <a href="chickenDashboard.html">Dashboard</a>
                    <a href="coop.html">Coop management</a>
                    <a href="chicken.html">Chickens</a>
                </div>
            ) : null}
        </div>
    );
}

const root = document.getElementById("hamburger");

if (root) {
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(<HamburgerComponent />);
}
