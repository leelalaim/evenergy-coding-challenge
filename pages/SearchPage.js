import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import { Card } from "../components/Card";
import { Search } from "../components/Search";
import { Loader } from "../components/Loader";

export const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const dataUrl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&compact=true&verbose=false&key='e05ac04b-3ec5-436b-893a-978da4b706d1`;

  const fetchData = () => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((err) => alert(`Error: ${err}`));
  };

  const searchFunction = (text) => {
    if (text) {
      const newData = stations.filter((item) => {
        const itemData = item
          ? item.AddressInfo.Town.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredStations(newData);
      setSearch(text);
      setShowAll(false);
    } else {
      setFilteredStations(stations);
      setSearch(text);
      setShowAll(false);
    }
  };

  // When user presses "Charge" button a POST request would be sent with the data

    // const charge = (id) => {
  //   fetch("https://example.ev.energy/chargingsession", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user: 1,
  //       car_id: 1,
  //       charger_id: { id },
  //     }),
  //   })
  // };


  return (
    <SearchConatiner>
      <Search
        headerText="Enter the name of the nearest city"
        onChangeText={(text) => searchFunction(text)}
        value={search}
        placeholder="Search here"
      />
      {loading && <Loader />}
      {showAll &&
        stations.map((station, index) => {
          return (
            <>
              <Card
                title={station.AddressInfo.Title}
                address={station.AddressInfo.AddressLine1}
                postcode={station.AddressInfo.Postcode}
                town={station.AddressInfo.Town}
                btnText="Charge"
              />
            </>
          );
        })}
      <CardWrapper>
        {filteredStations &&
          !showAll &&
          filteredStations.map((station) => {
            return (
              <Card
                title={station.AddressInfo.Title}
                address={station.AddressInfo.AddressLine1}
                postcode={station.AddressInfo.Postcode}
                town={station.AddressInfo.Town}
                btnText="Charge"
              />
            );
          })}
      </CardWrapper>
    </SearchConatiner>
  );
};

const SearchConatiner = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const CardWrapper = styled.View`
  flex: 1;
`;
