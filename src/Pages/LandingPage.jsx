import { Link } from 'react-router-dom';
import './landing.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Take Control of Your Financial Future</h1>
          <p className="subtitle">Track, visualize, and achieve your savings goals with our simple yet powerful tool</p>
          <Link to="/dashboard">
            <button className="cta-button">Start Saving Today</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Financial goals" />
        </div>
      </section>
      
      <section className="benefits">
        <h2>Why Choose Smart Goal Planner?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="icon"></div>
            <h3>Visual Progress Tracking</h3>
            <p>See your savings grow with intuitive progress bars and visual indicators</p>
          </div>
          <div className="benefit-card">
            <div className="icon"></div>
            <h3>Multiple Goal Management</h3>
            <p>Track all your financial goals in one place - from vacations to emergency funds</p>
          </div>
          <div className="benefit-card">
            <div className="icon"></div>
            <h3>Easy to Use</h3>
            <p>Simple interface makes managing your savings goals quick and hassle-free</p>
          </div>
          <div className="benefit-card">
            <div className="icon"></div>
            <h3>Deadline Tracking</h3>
            <p>Never miss a savings target with deadline reminders and notifications</p>
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create a Goal</h3>
            <p>Set up your savings goal with a target amount and deadline</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Make Deposits</h3>
            <p>Add to your savings whenever you can</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track Progress</h3>
            <p>Watch your progress and stay motivated</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Achieve Goals</h3>
            <p>Celebrate when you reach your targets!</p>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <h2>Ready to start saving?</h2>
        <p>Join thousands of users who are achieving their financial goals</p>
        <Link to="/dashboard">
          <button className="cta-button">Get Started Now</button>
        </Link>
      </section>
    </div>
  );
}