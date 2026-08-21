import lmmLogo from "../assets/lmm-logo.png";

function Footer({ t, navLinks }) {
  return (
    <footer className="site-footer">
      <div className="sf-main">
        <div className="sf-brand-block">
          <div className="sf-brand">
            <img
              src={lmmLogo}
              alt="LMM Logo"
              className="sf-brand-mark"
            />

            <div className="sf-brand-copy">
              <strong>LMM</strong>
              <span>LEGENDS OF MINIMILITIA</span>
            </div>
          </div>

          <p className="sf-description">
            {t.ftDescription}
          </p>

          <div className="sf-record">
            <span className="sf-record-label">
              LMM / ESTABLISHED
            </span>

            <strong>2019</strong>

            <span className="sf-record-divider" />

            <span className="sf-record-label">
              CLAN RECORD
            </span>

            <strong>125+</strong>
          </div>
        </div>

        <div className="sf-column">
          <span className="sf-column-heading">
            {t.ftNav}
          </span>

          <nav className="sf-nav">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={link.href}
                className="sf-nav-link"
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{link.label}</strong>

                <i aria-hidden="true">↗</i>
              </a>
            ))}

            <a
              href="https://discord.gg/Vf4F3bneB"
              target="_blank"
              rel="noreferrer"
              className="sf-nav-link sf-nav-link-accent"
            >
              <span>07</span>
              <strong>{t.join}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          </nav>
        </div>

        <div className="sf-column">
          <span className="sf-column-heading">
            {t.ftConnect}
          </span>

          <nav className="sf-nav">
            <a
              href="https://discord.gg/QYBgSgBM"
              target="_blank"
              rel="noreferrer"
              className="sf-nav-link"
            >
              <span>01</span>
              <strong>DISCORD</strong>
              <i aria-hidden="true">↗</i>
            </a>

            <a
              href="https://www.tiktok.com/@zerxda2"
              target="_blank"
              rel="noreferrer"
              className="sf-nav-link"
            >
              <span>02</span>
              <strong>TIKTOK</strong>
              <i aria-hidden="true">↗</i>
            </a>

            <a
              href="https://youtube.com/@lmmoficial"
              target="_blank"
              rel="noreferrer"
              className="sf-nav-link"
            >
              <span>03</span>
              <strong>YOUTUBE</strong>
              <i aria-hidden="true">↗</i>
            </a>
          </nav>
        </div>
      </div>

      <div className="sf-bottom">
        <div className="sf-bottom-left">
          <span>{t.footer}</span>
          <span>LMM / LEGENDS OF MINIMILITIA</span>
        </div>

        <div className="sf-bottom-right">
          <span>{t.establishedShort} 2019</span>
          <span>125+ {t.victories}</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;