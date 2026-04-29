import React from 'react'
import { facultyStyles } from '../assets/dummyStyles'
import sampleTeachers from '../assets/dummyFaculty';
import { Star, Mail } from "lucide-react"; 

// CUSTOM INSTAGRAM
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm5.25-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z"/>
  </svg>
);

// CUSTOM LINKEDIN
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.94 6.5A2.44 2.44 0 114.5 4.06 2.44 2.44 0 016.94 6.5zM4.75 8.75h4.38V20H4.75zm7.13 0h4.2v1.54h.06a4.6 4.6 0 014.14-2.28c4.43 0 5.24 2.91 5.24 6.7V20h-4.38v-5.44c0-1.3 0-2.98-1.82-2.98s-2.1 1.42-2.1 2.88V20h-4.38z"/>
  </svg>
);

// motion mock
const motion = {
  div: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
};

const FacultyPage = () => {
  return (
    <div className={facultyStyles.container}>
      <div className={facultyStyles.header}>
        <div className={facultyStyles.headerContent}>
          <h1 className={facultyStyles.title}>Meet Our Faculty</h1>
          <div className={facultyStyles.titleDivider}></div>
          <p className={facultyStyles.subtitle}>
            Learn from industry experts and academic pioneers dedicated to your success
          </p>
        </div>
      </div>

      <div className={facultyStyles.facultySection}>
        <div className={facultyStyles.animations}>
          <div className={facultyStyles.facultyGrid}>

            {sampleTeachers.map((teacher, index) => (

              <motion.div key={teacher.id} className={facultyStyles.card}>

                <div className={facultyStyles.teacherCard}>
                  
                  {/* IMAGE */}
                  <div className={facultyStyles.imageContainer}>
                    <div className={facultyStyles.imageWrapper}>
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className={facultyStyles.image}
                      />
                    </div>

                    <div className={facultyStyles.experienceBadge}>
                      <div className={facultyStyles.experienceBadgeContent}>
                        {teacher.experience} Exp
                      </div>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className={facultyStyles.teacherInfo}>
                    <h3 className={facultyStyles.teacherName}>
                      {teacher.name}
                    </h3>
                    <p className={facultyStyles.teacherQualification}>
                      {teacher.qualification}
                    </p>
                    <p className={facultyStyles.teacherBio}>
                      {teacher.bio}
                    </p>
                  </div>

                  {/* RATING */}
                  <div className={facultyStyles.ratingContainer}>
                    <div className={facultyStyles.starRating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`${facultyStyles.starIcon} ${
                            i < Math.round(teacher.initialRating)
                              ? facultyStyles.starButtonActive
                              : facultyStyles.starButtonInactive
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* SOCIAL */}
                  <div className={facultyStyles.socialContainer}>

                    <a
                      href={`mailto:${teacher.email}`}
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconEmail}`}
                    >
                      <Mail className={facultyStyles.socialIconSvg} />
                    </a>

                    <a
                      href={teacher.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconLinkedin}`}
                    >
                      <Linkedin className={facultyStyles.socialIconSvg} />
                    </a>

                    <a
                      href={teacher.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconInstagram}`}
                    >
                      <Instagram className={facultyStyles.socialIconSvg} />
                    </a>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>
        </div>
      </div>

      <style>{facultyStyles.animations}</style>
    </div>
  );
};

export default FacultyPage;