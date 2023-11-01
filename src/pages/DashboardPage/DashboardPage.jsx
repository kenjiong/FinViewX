import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-daisyui";
import AddAssetForm from "../../components/AssetForm/AddAssetForm";
import AddLiabilityForm from "../../components/LiabilityForm/AddLiabilityForm";
import EditAssetForm from "../../components/AssetForm/EditAssetForm";
import EditLiabilityForm from "../../components/LiabilityForm/EditLiabilityForm";
import * as assetsService from "../../utilities/assets-service";
import * as liabilitiesService from "../../utilities/liabilities-service";
import debug from "debug";

const log = debug("finviewx:src:DashboardPage");

export default function DashboardPage({ user }) {
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const userId = user._id;

  const totalAssets = assets.reduce((acc, asset) => acc + asset.value, 0);
  const totalLiabilities = liabilities.reduce(
    (acc, liability) => acc + liability.value,
    0
  );
  const netWorth = totalAssets - totalLiabilities;

  const fetchAssets = async () => {
    try {
      const data = await assetsService.getAllAssets(userId);
      setAssets(data);
    } catch (error) {
      log(error);
    }
  };

  const fetchLiabilities = async () => {
    try {
      const data = await liabilitiesService.getAllLiabilities(userId);
      setLiabilities(data);
    } catch (error) {
      log(error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [userId]);

  useEffect(() => {
    fetchLiabilities();
  }, [userId]);

  const handleDeleteAsset = async (event) => {
    const assetId = event.currentTarget.getAttribute("assetId");
    try {
      console.log("asset2", assetId);
      await assetsService.deleteAsset(assetId);
      console.log(assetId);
      await fetchAssets();
    } catch (error) {
      console.log(error);
      log(error);
    }
  };

  const handleDeleteLiability = async (event) => {
    const liabilityId = event.currentTarget.getAttribute("liabilityId");
    try {
      await liabilitiesService.deleteLiability(liabilityId);
      fetchLiabilities();
    } catch (error) {
      log(error);
    }
  };

  const handleShowAddAsset = () => {
    setShowAssetForm(!showAssetForm);
  };

  const handleShowAddLiability = () => {
    setShowLiabilityForm(!showLiabilityForm);
  };

  return (
    <>
      {showAssetForm ? (
        <>
          <AddAssetForm
            assets={assets}
            fetchAssets={fetchAssets}
            setShowAssetForm={setShowAssetForm}
          />
        </>
      ) : showLiabilityForm ? (
        <>
          <AddLiabilityForm
            liabilities={liabilities}
            fetchLiabilities={fetchLiabilities}
            setShowLiabilityForm={setShowLiabilityForm}
          />
        </>
      ) : (
        <>
          <div className="text-center">
            <h3 className="mb-5 text-5xl font-bold">
              Your Financial Dashboard
            </h3>
            {netWorth < 0 ? (
              <p className="mb-5 text-xl">
                Net Worth: -S$
                {Math.abs(netWorth).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            ) : (
              <p className="mb-5 text-xl">
                Net Worth: S$
                {netWorth.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
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
                            <span key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                              <Link to="/asset/edit" state={{asset: asset}}>
                              <Button>
                                Edit Asset
                              </Button>
                              </Link>
                              {" "}
                              |{" "}
                              <button
                                onClick={handleDeleteAsset}
                                assetId={asset._id}
                              >
                                Delete Asset
                              </button>
                            </span>
                            <br />
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
                            <span key={liability._id}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/liability/edit" state={{liability: liability}}>
                              <Button>
                                Edit Liability
                              </Button>
                              </Link>
                              {" "}
                              |{" "}
                              <button
                                onClick={handleDeleteLiability}
                                liabilityId={liability._id}
                              >
                                Delete Liability
                              </button>
                            </span>
                            <br />
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
                            <span key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/asset/edit" state={{asset: asset}}>
                              <Button>
                                Edit Asset
                              </Button>
                              </Link>
                              <EditAssetForm
                                asset={asset}
                                fetchAssets={fetchAssets}
                              />{" "}
                              |{" "}
                              <button
                                onClick={handleDeleteAsset}
                                assetId={asset._id}
                              >
                                Delete Asset
                              </button>
                            </span>
                            <br />
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
                            <span key={liability._id}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/liability/edit" state={{liability: liability}}>
                              <Button>
                                Edit Liability
                              </Button>
                              </Link>
                              {" "}
                              |{" "}
                              <button
                                onClick={handleDeleteLiability}
                                liabilityId={liability._id}
                              >
                                Delete Liability
                              </button>
                            </span>
                            <br />
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
                            <span key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/asset/edit" state={{asset: asset}}>
                              <Button>
                                Edit Asset
                              </Button>
                              </Link>{" "}
                              |{" "}
                              <button
                                onClick={handleDeleteAsset}
                                assetId={asset._id}
                              >
                                Delete Asset
                              </button>
                            </span>
                            <br />
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
                            <span key={liability._id}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/liability/edit" state={{liability: liability}}>
                              <Button>
                                Edit Liability
                              </Button>
                              </Link>
                              {" "}
                              |{" "}
                              <button
                                onClick={handleDeleteLiability}
                                liabilityId={liability._id}
                              >
                                Delete Liability
                              </button>
                            </span>
                            <br />
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
                            <span key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/asset/edit" state={{asset: asset}}>
                              <Button>
                                Edit Asset
                              </Button>
                              </Link>{" "}
                              |{" "}
                              <button
                                onClick={handleDeleteAsset}
                                assetId={asset._id}
                              >
                                Delete Asset
                              </button>
                            </span>
                            <br />
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
                            <span key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/asset/edit" state={{asset: asset}}>
                              <Button>
                                Edit Asset
                              </Button>
                              </Link>
                              {" "}
                              |{" "}
                              <button
                                onClick={handleDeleteAsset}
                                assetId={asset._id}
                              >
                                Delete Asset
                              </button>
                            </span>
                            <br />
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
                            <span key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</span>
                            &nbsp;&nbsp;
                            <span>
                            <Link to="/asset/edit" state={{asset: asset}}>
                              <Button>
                                Edit Asset
                              </Button>
                              </Link>
                              {" "}
                              |{" "}
                              <button
                                onClick={handleDeleteAsset}
                                assetId={asset._id}
                              >
                                Delete Asset
                              </button>
                            </span>
                            <br />
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
