import React from "react";

function SortbarType(props) {
  const { sortbarType, setSortbarType } = props;
  return (
    <>
      <select
        className="alan_sortbartype"
        value={sortbarType}
        onChange={(e) => setSortbarType(e.target.value)}
      >
        <option value="">依商品分類</option>
        <option value="1">絨毛玩具</option>
        <option value="2">擬真模型</option>
        <option value="3">嬰兒背巾</option>
        <option value="4">文具用品</option>
        <option value="5">填充布偶</option>
        <option value="6">兒童衣飾</option>
      </select>
    </>
  );
}

export default SortbarType;