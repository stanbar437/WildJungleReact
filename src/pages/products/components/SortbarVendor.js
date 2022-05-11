import React from "react";

function SortbarVendor(props) {
  const { sortbarVendor, setSortbarVendor } = props;
  return (
    <>
      <select
        className="alan_sortbartype"
        value={sortbarVendor}
        onChange={(e) => setSortbarVendor(e.target.value)}
      >
        <option value="">依品牌分類</option>
        <option value="1">Animal Moco</option>
        <option value="2">100+1</option>
        <option value="3">Wild Life</option>
        <option value="4">Happy Horse</option>
        <option value="5">mimi</option>
        <option value="6">Bisque</option>
        <option value="7">Baby Bites</option>
      </select>
    </>
  );
}

export default SortbarVendor;