import { NavLink } from "react-router-dom";
import Rating from "./Rating";
import FoodAndDrinkList from "./FoodAndDrinkList";
import React from "react";
import { formatDistance } from "../services/Utils";
const Venue = ({ venue}) => {
  return (
    <div className="list-group">
      <div className="col-xs-12 col-sm-12">
        <div className="col-xs-12 list-group-item">
          <h4>
            <NavLink to={`/venue/${venue.id}`}>{venue.name} </NavLink>
            <Rating rating={venue.rating} />
          </h4>
          <span className="span badge pull-right badge-default">
            {formatDistance(venue.distance)}
          </span>
          <p className="address"> {venue.address}</p>
          <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink} />
        </div>
      </div>
    </div>
  );
};
export default Venue;
