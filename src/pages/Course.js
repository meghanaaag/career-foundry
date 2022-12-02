import React, { useEffect, useState } from "react";
import { getCourses } from "../api";
import { CourseCard } from "../components/CourseCard";

export const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then((courseList) => {
      setCourses(courseList.data);
    });
  }, []);

  return (
    <div className="homepage">
      <div className="header-section">
        <div className="header-content">
          <h1 className="header-content__text">
            At Career Foundry, build a career you love
          </h1>
          <div className="header-content__subtext">
            Become a UX designer, UI designer, web developer, or data analyst
            from scratch
          </div>
        </div>
        <div className="img-display">
          <img
            src="https://images.careerfoundry.com/public/frontpages/homepage/Asena_hero_cut_out_744x588_v2.png"
            alt="hero"
          />
        </div>
      </div>
      <h1 className="title"> Choose a program and transform your career </h1>
      <h3 className="subtext">
        {" "}
        Our programs will teach you everything you need to get your first job in
        tech in as little as 5 months <br /> — even if you don’t have any
        previous experience.{" "}
      </h3>
      <div className="card-container">
        {courses.length &&
          courses.map((course) => (
            <CourseCard
              key={course.id}
              slug={course.slug}
              title={course.title}
            />
          ))}
      </div>
    </div>
  );
};
