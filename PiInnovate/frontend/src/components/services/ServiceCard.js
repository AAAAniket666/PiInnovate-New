import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import '../../assets/css/serviceCard.css';

const ServiceCard = ({ service, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    },
    hover: {
      y: -10,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <Card className="service-card h-100">
        <Card.Img
          variant="top"
          src={service.image}
          alt={service.title}
          className="service-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/services/default-service.jpg';
          }}
        />
        {service.icon && (
          <div className="service-icon">
            <i className={service.icon}></i>
          </div>
        )}
        
        <Card.Body>
          <Card.Title className="service-title">{service.title}</Card.Title>
          <Card.Text className="service-description">{service.description}</Card.Text>
          
          <Link 
            to={`/services/${service.slug}`} 
            className="service-link"
          >
            Learn More <FaArrowRight className="ms-1" />
          </Link>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
