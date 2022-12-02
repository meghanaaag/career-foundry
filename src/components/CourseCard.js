import React, { useCallback, useState } from "react";
import { CareerFoundryModal } from "./CareerFoundryModal";
import { getCourseDetails, getGeolocation } from "../api";
import { publicIp } from "public-ip";

export const CourseCard = ({ slug, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationCode, setLocationCode] = useState();

  const fetchCourseDetails = useCallback(async () => {
    setLoading(true);

    const ipAddress = await publicIp();
    const location = await getGeolocation(ipAddress);
    setLocationCode(location.data.continent_code);

    getCourseDetails(slug).then((response) => {
      setLoading(false);
      const price = fetchLocationSpecificPrice(locationCode, response.data);
      const nextAvailableDate = fetchNextAvailableStartDate(response.data);
      const otherDates = response.data.start_dates
        .filter((date) => date !== nextAvailableDate)
        .join(",");
      setCourseDetail({
        ...response.data,
        locationSpecificPrice: price,
        nextAvailableDate: nextAvailableDate,
        otherDates: otherDates,
      });
    });
  }, [slug, locationCode]);

  const fetchLocationSpecificPrice = (locationCode, courseDetail) => {
    if (locationCode !== "EU") {
      return courseDetail.prices.filter((x) => x.currency === "usd")[0].amount;
    } else
      return courseDetail.prices.filter((x) => x.currency !== "usd")[0].amount;
  };

  const fetchNextAvailableStartDate = (courseDetail) => {
    const startDates = courseDetail.start_dates;
    startDates.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    return startDates[0];
  };

  return (
    <div>
      <CareerFoundryModal
        courseSlug={slug}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <div className="course-detail-modal d-flex flex-row w-100 h-100">
          {loading ? (
            <div className="fw-bold">Loading Course Details...</div>
          ) : (
            courseDetail !== null && (
              <div>
                <h2>{title}</h2>
                <h6 className="mb-4">
                  {courseDetail && courseDetail.description}
                </h6>
                <h6>
                  <span className="fw-bold">Price:</span>{" "}
                  {courseDetail && courseDetail.locationSpecificPrice}
                </h6>
                <h6>
                  <span className="fw-bold">Next available start date: </span>
                  {courseDetail && courseDetail.nextAvailableDate}
                </h6>
                <h6>
                  <span className="fw-bold"> Other Dates: </span>
                  {courseDetail && courseDetail.otherDates}
                </h6>
              </div>
            )
          )}
        </div>
      </CareerFoundryModal>
      <div
        className="card-custom d-flex justify-content-center align-items-center"
        key={slug}
      >
        <div className="fs-4 mb-4 card-text">{title}</div>
        <div
          onClick={() => {
            fetchCourseDetails();
            setIsOpen(true);
          }}
          className="seemore-btn"
        >
          See more
        </div>
      </div>
    </div>
  );
};
