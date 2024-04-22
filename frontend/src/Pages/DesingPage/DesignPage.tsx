import React from "react";
import Table from "../../Components/Table/Table";
import RatioList from "../../Components/RatioList/RatioList";

type Props = {};

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Desing Page</h1>
      <h2>
        This is FinShark's design page.This is where we well house various
        design aspects off the app
      </h2>
      <RatioList />
      <Table />
    </>
  );
};

export default DesignPage;
