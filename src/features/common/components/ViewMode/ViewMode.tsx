import { Radio } from "antd";

import { EViewMode } from "../../../RealEstate/interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store/store";
import { setViewMode } from "../../../RealEstate/realEstateSlice";

export const ViewMode: React.FC = () => {
  const dispatch = useAppDispatch();
  const { viewMode } = useAppSelector((state: RootState) => state.realEstates);

  const handleModeChange = (e: any) => {
    dispatch(setViewMode(e.target.value));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      <Radio.Group value={viewMode} onChange={handleModeChange}>
        <Radio.Button value={EViewMode.user}>View as User</Radio.Button>
        <Radio.Button value={EViewMode.agent}>View as Agent</Radio.Button>
      </Radio.Group>
    </div>
  );
};
