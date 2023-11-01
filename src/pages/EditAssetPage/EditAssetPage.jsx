import { useLocation } from "react-router-dom";
import EditAssetForm from "../../components/AssetForm/EditAssetForm";
import debug from "debug";

const log = debug("finviewx:src:EditAssetPage");

export default function EditAssetPage() {
  const location = useLocation();
  const { asset } = location.state;

  return (
    <>
      <EditAssetForm asset={asset}/>
    </>
  );
}
