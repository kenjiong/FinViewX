import { useEffect, useState } from "react";
import AddAssetForm from "../../components/AssetForm/AddAssetForm";
import AddLiabilityForm from "../../components/LiabilityForm/AddLiabilityForm";
// import EditAssetForm from "../../components/AssetForm/EditAssetForm";
// import EditLiabilityForm from "../../components/LiabilityForm/EditLiabilityForm";
import * as assetsService from "../../utilities/assets-service";
import * as liabilitiesService from "../../utilities/liabilities-service";

export default function DashboardPage({ user, setUser }) {
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [showEditAsset, setShowEditAsset] = useState(false);
  const [showEditLiability, setShowEditLiability] = useState(false);
  const userId = user._id;

  const totalAssets = assets.reduce((acc, asset) => acc + asset.value, 0);
  const totalLiabilities = liabilities.reduce(
    (acc, liability) => acc + liability.value,
    0
  );
  const netWorth = (totalAssets - totalLiabilities).toLocaleString();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await assetsService.getAllAssets(userId);
        setAssets(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssets();
  }, [userId]);

  useEffect(() => {
    const fetchLiabilities = async () => {
      try {
        const data = await liabilitiesService.getAllLiabilities(userId);
        setLiabilities(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLiabilities();
  }, [userId]);

  const handleShowAddAsset = () => {
    setShowAssetForm(!showAssetForm);
  };

  const handleShowAddLiability = () => {
    setShowLiabilityForm(!showLiabilityForm);
  };

  const handleShowEditAsset = () => {
    setShowEditAsset(!showEditAsset);
  };

  const handleShowEditLiability = () => {
    setShowEditLiability(!showEditLiability);
  };

  return (
    <>
      {showAssetForm ? (
        <>
          <AddAssetForm setUser={setUser} setShowAssetForm={setShowAssetForm} />
        </>
      ) : showLiabilityForm ? (
        <>
          <AddLiabilityForm
            setUser={setUser}
            setShowLiabilityForm={setShowLiabilityForm}
          />
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
                <tbody>
                  <tr>
                    <th className="mb-5 text-xl">Assets</th>
                    <th className="mb-5 text-xl">Liabilities</th>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-bold">Cash</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "cash")
                        .map((asset) => (
                          <>
                            <span key={asset.name}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Asset</button> |{" "}
                              <button>Delete Asset</button>
                            </span>
                          </>
                        ))}
                    </td>
                    <td>
                      <span className="font-bold">Credit Cards</span>
                      <br />
                      {liabilities
                        .filter((liability) => liability.type === "creditcard")
                        .map((liability) => (
                          <>
                            <span key={liability.name}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Liability</button> |{" "}
                              <button>Delete Liability</button>
                            </span>
                          </>
                        ))}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <span className="font-bold">Cash Investments</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "investment")
                        .map((asset) => (
                          <>
                            <span key={asset.name}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Asset</button> |{" "}
                              <button>Delete Asset</button>
                            </span>
                          </>
                        ))}
                    </td>
                    <td>
                      <span className="font-bold">Loans</span>
                      <br />
                      {liabilities
                        .filter((liability) => liability.type === "loan")
                        .map((liability) => (
                          <>
                            <span key={liability.name}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Liability</button> |{" "}
                              <button>Delete Liability</button>
                            </span>
                          </>
                        ))}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <span className="font-bold">CPF</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "cpf")
                        .map((asset) => (
                          <>
                            <span key={asset.name}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Asset</button> |{" "}
                              <button>Delete Asset</button>
                            </span>
                          </>
                        ))}
                    </td>
                    <td>
                      <span className="font-bold">Others</span>
                      <br />
                      {liabilities
                        .filter((liability) => liability.type === "other")
                        .map((liability) => (
                          <>
                            <span key={liability.name}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Liability</button> |{" "}
                              <button>Delete Liability</button>
                            </span>
                          </>
                        ))}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <span className="font-bold">{`Insurance (Protection with cash value)`}</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "insurance")
                        .map((asset) => (
                          <>
                            <span key={asset.name}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Asset</button> |{" "}
                              <button>Delete Asset</button>
                            </span>
                          </>
                        ))}
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <span className="font-bold">Properties</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "property")
                        .map((asset) => (
                          <>
                            <span key={asset.name}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Asset</button> |{" "}
                              <button>Delete Asset</button>
                            </span>
                          </>
                        ))}
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <span className="font-bold">Others</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "other")
                        .map((asset) => (
                          <>
                            <span key={asset.name}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString()}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <button>Edit Asset</button> |{" "}
                              <button>Delete Asset</button>
                            </span>
                          </>
                        ))}
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <button onClick={handleShowAddAsset}>
                        Add New Asset
                      </button>
                    </td>
                    <td>
                      <button onClick={handleShowAddLiability}>
                        Add New Liability
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
