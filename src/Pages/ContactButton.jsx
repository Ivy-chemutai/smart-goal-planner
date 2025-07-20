import { Link } from 'react-router-dom';
import './contactButton.css';

export default function ContactButton() {
  return (
    <div>
      <Link to="/contact" className="contact-button">
      
        <span className="contact-text">Contact Us</span>
      </Link>
    </div>
  );
}