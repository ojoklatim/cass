import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Contact */}
        <div>
          <h3 className="footer-section-title">Contact Us</h3>
          <p className="footer-text">
            Order Line:{' '}
            <a href="tel:+254700000000" className="footer-link">
              +254 700 000 000
            </a>
          </p>
          <p className="footer-text">
            Email:{' '}
            <a href="mailto:orders@cassshoes.co.ke" className="footer-link">
              orders@cassshoes.co.ke
            </a>
          </p>
        </div>

        {/* Business Hours */}
        <div>
          <h3 className="footer-section-title">Business Hours</h3>
          <p className="footer-text">Monday – Saturday</p>
          <p className="footer-text">8:00 AM – 6:00 PM EAT</p>
        </div>

        {/* Payments */}
        <div>
          <h3 className="footer-section-title">Payments</h3>
          <p className="footer-text">
            We accept M-Pesa, bank transfer, and card payments via{' '}
            <a
              href="https://www.pesapal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-purple"
            >
              Pesapal
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} CASS — Chantal All Seasons Shoes. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
