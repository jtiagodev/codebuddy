/* eslint-disable */
import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import DefaultBoard from "./DefaultBoard";

const DefaultBoards = () => {
  console.log("RENDER DEFAULT BOARDS");
  const [data, setData] = useState({ hits: [] });
  //const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const result = await axios("http://localhost:1337/boards");
    setData(result.data);
    //setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []); // Is this

  return (
    <>
      {data &&
        _.map(data, board => {
          return <DefaultBoard board={board} />;
        })}
    </>
  );
  // if (loading) {
  //   return <span>LOADING</span>;
  // } else {
  //   data.map(board => {
  //     return <DefaultBoard board={board} />;
  //   });
  // }
};

export default DefaultBoards;
