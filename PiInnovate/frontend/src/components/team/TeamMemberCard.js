import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../../assets/css/team.css';

const TeamMemberCard = ({ member, index }) => {
  // Animation variants
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
      transition: {
        duration: 0.3
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
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
      className="team-member-item"
    >
      <Card className="team-member-card">
        <div className="team-member-image-wrapper">
          <motion.div
            className="team-member-image"
            variants={imageVariants}
          >
            <img 
              src={member.image || '/images/default-avatar.jpg'} 
              alt={member.name} 
              className="img-fluid"
            />
          </motion.div>
          
          <motion.div
            className="team-member-social"
            variants={socialVariants}
          >
            {member.socialMedia?.facebook && (
              <a href={member.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            )}
            {member.socialMedia?.twitter && (
              <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {member.socialMedia?.linkedin && (
              <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            )}
            {member.socialMedia?.instagram && (
              <a href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
          </motion.div>
        </div>
        
        <Card.Body>
          <Card.Title className="team-member-name">
            <Link to={`/team/${member._id}`}>{member.name}</Link>
          </Card.Title>
          
          {member.position && (
            <Card.Subtitle className="team-member-position mb-3">
              {member.position}
            </Card.Subtitle>
          )}
          
          {member.bio && (
            <Card.Text className="team-member-bio">
              {member.bio.length > 100 
                ? `${member.bio.substring(0, 100)}...` 
                : member.bio
              }
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;
