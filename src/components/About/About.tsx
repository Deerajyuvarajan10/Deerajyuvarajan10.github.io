import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="about" className="about-section section-container">
      <div className="section-header">
        <h2 className="text-gradient">About Me</h2>
        <p>A brief look into my professional mindset.</p>
      </div>

      <motion.div
        ref={ref}
        className="about-content"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="about-text-box">
          <p>
            I am a passionate AI Developer with a strong focus on Natural Language Processing (NLP) and Machine Learning. 
            Beyond building complex AI models, I specialize in crafting scalable, highly interactive web applications using React and 3D web technologies.
          </p>
          <p>
            My core philosophy revolves around a relentless problem-solving mindset—whether it's optimizing a backend architecture, 
            fine-tuning a language model, or engineering seamless cross-platform mobile experiences. 
            I thrive at the intersection of powerful algorithms and elegant user interfaces.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
