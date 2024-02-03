import React from "react";
import ProfileBox from "./ProfileBox";
import RecordBox from "./RecordBox";
import Navbar from "../../../components/Navbar";

const MyPage = () => {
  return (
    <div style={{ display: "grid", gridTemplateRows: "7% 93%", height: "100%" }}>
      <div>
        <Navbar />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: 3.5 }}>
          <ProfileBox />
        </div>
        <div style={{ flex: 6.5 }}>
          <RecordBox />
        </div>
      </div>
    </div>
  );
};

export default MyPage;

<div style={{ display: "flex", width: "100%" }}>
  <div style={{ flex: 3, border: "1px solid black" }}>30%</div>
  <div style={{ flex: 7, border: "1px solid black" }}>70%</div>
</div>;
