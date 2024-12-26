import InputWithLabel from "./InputWithLabel";
import VenueList from "./VenueList";
import Header from "./Header";
import React, { useState } from "react";
import VenueDataService from "../services/VenueDataService";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const [coordinate, setCoordinate] = useState({ lat: 1, long: 1 });
  const [searchVenue,setSearchVenue] = useState("");
  const search = (event) => {
    setSearchVenue(event.target.value);
  };

  React.useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
    VenueDataService.nearbyVenues(coordinate.lat,coordinate.long)
    .then((response) => {
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    }).catch(() => {
      dispatch({ type: "FETCH_FAILURE" });
    });
  }, [coordinate.lat, coordinate.long]);
  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoordinate({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }, []);
  const filteredVenues=Array.isArray(venues)?venues.filter((venue) => { 
    return venue.name.toLowerCase().includes(searchVenue.toLowerCase());
  }):[];
  return (
    <div>
      <Header
        headerText="Mekanbul"
        motto="Civarınızdaki Mekanlarınızı Keşfedin!"
      />
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        type="text"
        isFocused
        onInputChange={search}
        value={searchVenue}
      />
      <hr />
      <div className="row">
      {isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        isSuccess && (
          <div className="row">
                <VenueList venues={filteredVenues} />
          </div>
        )
      )}
      </div>
    </div>
  );
};

export default Home;
