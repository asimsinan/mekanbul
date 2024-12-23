import Venue from "./Venue";;
import React from "react";
const VenueList = ({ venues}) => {
  return (
    <div>
      {venues? (venues.map((venue, index) => (
        <Venue key={index} venue={venue} />
      ))):("")
    }
    </div>
  );
};
export default VenueList;
