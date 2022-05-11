import React from "react";

function SortbarPrice(props) {
  const { sortbarPrice, setSortbarPrice } = props;
  return (
    <>
      <select
        className="alan_sortbarprice"
        value={sortbarPrice}
        onChange={(e) => setSortbarPrice(e.target.value)}
      >
        <option value="">請選擇排序</option>
        <option value="1">以價格排序-由少至多</option>
        <option value="2">以價格排序-由多至少</option>
      </select>
    </>
  );
}

export default SortbarPrice;
