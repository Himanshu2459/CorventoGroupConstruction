import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'house', label: 'Houses' },
    { id: 'villa', label: 'Villas' },
    { id: 'kothi', label: 'Kothis' },
    { id: 'commercial', label: 'Commercial' }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [activeFilter, projects]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const filterProjects = () => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter));
    }
  };

  return (
    <div className="projects-page">
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Projects</h1>
            <p>Showcasing excellence in construction across houses, villas, and kothis</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loader"></div>
          ) : (
            <motion.div 
              className="projects-grid grid grid-3"
              layout
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="project-card card"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="project-image-wrapper">
                    <img 
                      src={project.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=Project'} 
                      alt={project.title} 
                      className="card-image"
                    />
                    <div className="project-status">{project.status}</div>
                    <div className="project-category">{project.category}</div>
                  </div>
                  <div className="card-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-details">
                      <div className="detail-item">
                        <strong>Location:</strong> {project.location}
                      </div>
                      <div className="detail-item">
                        <strong>Area:</strong> {project.area.value} {project.area.unit}
                      </div>
                      {project.duration && (
                        <div className="detail-item">
                          <strong>Duration:</strong> {project.duration.value} {project.duration.unit}
                        </div>
                      )}
                    </div>
                    {project.features && project.features.length > 0 && (
                      <div className="project-features">
                        <strong>Features:</strong>
                        <ul>
                          {project.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
