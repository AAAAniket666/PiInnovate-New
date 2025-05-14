import React from 'react';
import { Card } from 'react-bootstrap';
import { FaQuoteLeft, FaStar, FaStarHalf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../../assets/css/testimonial.css';

const TestimonialCard = ({ testimonial, index }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star-icon" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="star-icon" />);
    }

    return stars;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="testimonial-item"
    >
      <Card className="testimonial-card">
        <Card.Body>
          <div className="quote-icon">
            <FaQuoteLeft />
          </div>
          
          <div className="testimonial-rating mb-3">
            {renderStars(testimonial.rating)}
          </div>
          
          <Card.Text className="testimonial-content">
            {testimonial.content}
          </Card.Text>
          
          <div className="testimonial-author mt-4">
            {testimonial.image && (
              <div className="author-image">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="rounded-circle"
                />
              </div>
            )}
            
            <div className="author-info">
              <h5 className="author-name">{testimonial.name}</h5>
              {(testimonial.position || testimonial.company) && (
                <p className="author-title">
                  {testimonial.position}
                  {testimonial.position && testimonial.company ? ', ' : ''}
                  {testimonial.company}
                </p>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
