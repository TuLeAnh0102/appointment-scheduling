import React from "react";
import {CSpinner} from "@coreui/react";

function Loader() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <CSpinner color="info" />
  </div>
  );
}

export default Loader;
