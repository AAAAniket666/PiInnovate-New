import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Hero from '../ui/Hero';
import TeamMemberCard from './TeamMemberCard';
import api from '../../app/api';
import '../../assets/css/team.css';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await api.get('/team');
        setTeamMembers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Hero
        title="Our Team"
        subtitle="Meet the talented experts behind our innovative solutions"
        image="/images/team-hero.jpg"
        primaryBtn={{ text: 'Join Our Team', url: '/contact' }}
        fullHeight={false}
      />

      <section className="team-section py-5">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              Meet Our Experts
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={itemVariants}
            >
              We're a diverse team of talented professionals passionate about innovation
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-5">
              <p>Loading team members...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger">
              <p>{error}</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-5">
              <p>No team members found.</p>
            </div>
          ) : (
            <Row className="g-4">
              {teamMembers.map((member, index) => (
                <Col key={member._id} md={6} lg={4}>
                  <TeamMemberCard member={member} index={index} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      <section className="team-values-section py-5 bg-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              Our Core Values
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={itemVariants}
            >
              The principles that guide our team and shape our culture
            </motion.p>
          </motion.div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <motion.div 
                className="value-card text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="value-icon">
                  <span>🌟</span>
                </div>
                <h3 className="value-title">Excellence</h3>
                <p className="value-description">
                  We strive for excellence in everything we do, maintaining the highest standards in our work.
                </p>
              </motion.div>
            </Col>
            
            <Col md={6} lg={3}>
              <motion.div 
                className="value-card text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="value-icon">
                  <span>🤝</span>
                </div>
                <h3 className="value-title">Collaboration</h3>
                <p className="value-description">
                  We believe in the power of teamwork and collaborative problem-solving.
                </p>
              </motion.div>
            </Col>
            
            <Col md={6} lg={3}>
              <motion.div 
                className="value-card text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="value-icon">
                  <span>💡</span>
                </div>
                <h3 className="value-title">Innovation</h3>
                <p className="value-description">
                  We constantly explore new ideas and approaches to drive meaningful innovation.
                </p>
              </motion.div>
            </Col>
            
            <Col md={6} lg={3}>
              <motion.div 
                className="value-card text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="value-icon">
                  <span>🔍</span>
                </div>
                <h3 className="value-title">Integrity</h3>
                <p className="value-description">
                  We act with honesty, transparency, and ethical responsibility in all our dealings.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="team-join-section py-5">
        <Container>
          <motion.div
            className="join-content text-center p-5 rounded"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 
              className="join-title mb-4" 
              variants={itemVariants}
            >
              Want to Join Our Team?
            </motion.h2>
            <motion.p 
              className="join-text mb-4" 
              variants={itemVariants}
            >
              We're always looking for talented individuals who are passionate about technology and innovation.
            </motion.p>
            <motion.div variants={itemVariants}>
              <a 
                href="/contact" 
                className="btn btn-primary btn-lg px-4 py-2"
              >
                View Open Positions
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default TeamPage;
