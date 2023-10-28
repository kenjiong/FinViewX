import { useState } from "react";
import AddAssetForm from "../../components/AssetForm/AddAssetForm";
import AddLiabilityForm from "../../components/LiabilityForm/AddLiabilityForm";
// import EditAssetForm from "../../components/AssetForm/EditAssetForm";
// import EditLiabilityForm from "../../components/LiabilityForm/EditLiabilityForm";

export default function DashboardPage() {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [showEditAsset, setShowEditAsset] = useState(false);
  const [showEditLiability, setShowEditLiability] = useState(false);

  const netWorth = 0;

  return (
    <>
      {showAssetForm ? (
        <>
          <AddAssetForm />
        </>
      ) : showLiabilityForm ? (
        <>
          <AddLiabilityForm />
        </>
      ) : (
        <>
          <div className="text-center">
            <h3 className="mb-5 text-5xl font-bold">
              Your Financial Dashboard
            </h3>
            <p className="mb-5 text-xl">Net Worth: S${netWorth}</p>
            <div>
              <table>
                <tr>
                  <th>Assets</th>
                  <th>Liabilities</th>
                </tr>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
