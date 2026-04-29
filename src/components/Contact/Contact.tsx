import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Rocket } from 'lucide-react';
import './Contact.css';

const GithubIcon = ({ color, size }: { color?: string, size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = ({ color, size }: { color?: string, size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

const Contact = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  const socials = [
    { icon: LinkedinIcon, link: 'https://www.linkedin.com/in/deeraj-yuvarajan', label: 'LinkedIn', color: '#0077b5' },
    { icon: GithubIcon, link: 'https://github.com/Deerajyuvarajan10', label: 'GitHub', color: '#fff' },
    { icon: Mail, link: 'mailto:deeraj2004yuvarajan@gmail.com', label: 'Email', color: '#ea4335' }
  ];

  return (
    <section id="contact" className="contact-section section-container">
      <div className="section-header">
        <h2 className="text-gradient">Initiate Contact</h2>
        <p>Ping my server. I usually respond within O(1) time.</p>
        <p className="contact-cta" style={{ marginTop: '15px', color: '#00F5FF', fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Open to internships and opportunities!
        </p>
      </div>

      <div className="contact-container">
        {/* Envelope Animation Side */}
        <div 
          className="envelope-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`envelope ${isHovered ? 'open' : ''}`}>
            <div className="envelope-flap"></div>
            <div className="envelope-paper">
              <div className="paper-content">
                <h4>To: Deeraj</h4>
                <p>Let's build something amazing together!</p>
                <div className="signature">__</div>
              </div>
            </div>
            <div className="envelope-front"></div>
          </div>

          <div className="social-links-3d">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-3d"
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 15,
                    rotateX: -10,
                    boxShadow: `0 10px 20px ${social.color}40`
                  }}
                >
                  <Icon size={24} color={social.color} />
                  <span>{social.label}</span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" required placeholder=" " id="name" />
            <label htmlFor="name">Your Name</label>
            <div className="glow-line"></div>
          </div>
          
          <div className="input-group">
            <input type="email" required placeholder=" " id="email" />
            <label htmlFor="email">Your Email</label>
            <div className="glow-line"></div>
          </div>
          
          <div className="input-group">
            <textarea required placeholder=" " id="message" rows={4}></textarea>
            <label htmlFor="message">Your Message</label>
            <div className="glow-line"></div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${isSent ? 'sent' : ''}`}
            disabled={isSubmitting || isSent}
          >
            {isSent ? (
              <span className="success-text">Transmission Sent!</span>
            ) : (
              <>
                <span>{isSubmitting ? 'Launching...' : 'Send Message'}</span>
                {isSubmitting ? <Rocket className="rocket-icon launching" size={20} /> : <Send className="send-icon" size={20} />}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
