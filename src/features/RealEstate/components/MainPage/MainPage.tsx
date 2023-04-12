import React, { useEffect } from "react";

import PropertyList from "../PropertyList/PropertyList";
import { getRealEstatesData, setFilteredData } from "../../realEstateSlice";
import { RootState } from "../../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RealEstateSearchForm } from "../RealEstateSearchForm/RealEstateSearchForm";
import { CreatePropertyListing } from "../CreatePropertyListing/CreatePropertyListing";
import { ViewMode } from "../../../common/components/ViewMode/ViewMode";
import { EViewMode } from "../../interfaces/interfaces";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { properties, filteredProperties,viewMode } = useAppSelector(
    (state: RootState) => state.realEstates
  );
  useEffect(() => {
    dispatch(getRealEstatesData());
  }, []);

  return (
    <div>
      <ViewMode />
      <RealEstateSearchForm
        realEstates={properties}
        onSearch={(data) => {
          dispatch(setFilteredData(data));
        }}
      />
      <PropertyList properties={filteredProperties} />
       {viewMode === EViewMode.agent ? <CreatePropertyListing/> : null }
    </div>
  );
};

export default MainPage;
