import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Stats } from "react-daisyui";
import AddAssetForm from "../../components/AssetForm/AddAssetForm";
import AddLiabilityForm from "../../components/LiabilityForm/AddLiabilityForm";
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
      await assetsService.deleteAsset(assetId);
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
            <h3 className="mb-5 text-5xl font-bold text-accent">
              Your Financial Dashboard
            </h3>
            {netWorth < 0 ? (
              <>
                <Stats className="shadow font-sans">
                  <Stats.Stat>
                    <Stats.Stat.Item
                      variant="figure"
                      className="text-secondary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-businessplan"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0"></path>
                        <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                        <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                        <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                        <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                        <path d="M5 15v1m0 -8v1"></path>
                      </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">
                      Total Assets
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-success">
                      S$
                      {totalAssets.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      &nbsp;
                    </Stats.Stat.Item>
                  </Stats.Stat>
                  <Stats.Stat>
                    <Stats.Stat.Item
                      variant="figure"
                      className="text-secondary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-building-bank"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M3 21l18 0"></path>
                        <path d="M3 10l18 0"></path>
                        <path d="M5 6l7 -3l7 3"></path>
                        <path d="M4 10l0 11"></path>
                        <path d="M20 10l0 11"></path>
                        <path d="M8 14l0 3"></path>
                        <path d="M12 14l0 3"></path>
                        <path d="M16 14l0 3"></path>
                      </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">Net Worth</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-red-500">
                      -S$
                      {Math.abs(netWorth).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      Your finances are not looking so healthy
                    </Stats.Stat.Item>
                  </Stats.Stat>
                  <Stats.Stat>
                    <Stats.Stat.Item
                      variant="figure"
                      className="text-secondary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-cash-banknote-off"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M9.88 9.878a3 3 0 1 0 4.242 4.243m.58 -3.425a3.012 3.012 0 0 0 -1.412 -1.405"></path>
                        <path d="M10 6h9a2 2 0 0 1 2 2v8c0 .294 -.064 .574 -.178 .825m-2.822 1.175h-13a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h1"></path>
                        <path d="M18 12l.01 0"></path>
                        <path d="M6 12l.01 0"></path>
                        <path d="M3 3l18 18"></path>
                      </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">
                      Total Liabilities
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-error">
                      S$
                      {totalLiabilities.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      &nbsp;
                    </Stats.Stat.Item>
                  </Stats.Stat>
                </Stats>
              </>
            ) : (
              <>
                <Stats className="shadow font-sans">
                  <Stats.Stat>
                    <Stats.Stat.Item
                      variant="figure"
                      className="text-secondary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-businessplan"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0"></path>
                        <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                        <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                        <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                        <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                        <path d="M5 15v1m0 -8v1"></path>
                      </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">
                      Total Assets
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-success">
                      S$
                      {totalAssets.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      &nbsp;
                    </Stats.Stat.Item>
                  </Stats.Stat>
                  <Stats.Stat>
                    <Stats.Stat.Item
                      variant="figure"
                      className="text-secondary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-building-bank"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M3 21l18 0"></path>
                        <path d="M3 10l18 0"></path>
                        <path d="M5 6l7 -3l7 3"></path>
                        <path d="M4 10l0 11"></path>
                        <path d="M20 10l0 11"></path>
                        <path d="M8 14l0 3"></path>
                        <path d="M12 14l0 3"></path>
                        <path d="M16 14l0 3"></path>
                      </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">Net Worth</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-green-500">
                      S$
                      {Math.abs(netWorth).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      Your finances are healthy, keep it up!
                    </Stats.Stat.Item>
                  </Stats.Stat>
                  <Stats.Stat>
                    <Stats.Stat.Item
                      variant="figure"
                      className="text-secondary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-cash-banknote-off"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M9.88 9.878a3 3 0 1 0 4.242 4.243m.58 -3.425a3.012 3.012 0 0 0 -1.412 -1.405"></path>
                        <path d="M10 6h9a2 2 0 0 1 2 2v8c0 .294 -.064 .574 -.178 .825m-2.822 1.175h-13a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h1"></path>
                        <path d="M18 12l.01 0"></path>
                        <path d="M6 12l.01 0"></path>
                        <path d="M3 3l18 18"></path>
                      </svg>
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="title">
                      Total Liabilities
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="value" className="text-error">
                      S$
                      {totalLiabilities.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      &nbsp;
                    </Stats.Stat.Item>
                  </Stats.Stat>
                </Stats>
              </>
            )}
            <br />
            <br />
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
                            <p key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link to="/asset/edit" state={{ asset: asset }}>
                                <Button>Edit Asset</Button>
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
                      <span className="font-bold">Credit Cards</span>
                      <br />
                      {liabilities
                        .filter((liability) => liability.type === "creditcard")
                        .map((liability) => (
                          <>
                            <p key={liability._id}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link
                                to="/liability/edit"
                                state={{ liability: liability }}
                              >
                                <Button>Edit Liability</Button>
                              </Link>{" "}
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
                  <tr>
                    <td>
                      <span className="font-bold">Cash Investments</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "investment")
                        .map((asset) => (
                          <>
                            <p key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link to="/asset/edit" state={{ asset: asset }}>
                                <Button>Edit Asset</Button>
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
                      <span className="font-bold">Loans</span>
                      <br />
                      {liabilities
                        .filter((liability) => liability.type === "loan")
                        .map((liability) => (
                          <>
                            <p key={liability._id}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link
                                to="/liability/edit"
                                state={{ liability: liability }}
                              >
                                <Button>Edit Liability</Button>
                              </Link>{" "}
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
                  <tr>
                    <td>
                      <span className="font-bold">CPF</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "cpf")
                        .map((asset) => (
                          <>
                            <p key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link to="/asset/edit" state={{ asset: asset }}>
                                <Button>Edit Asset</Button>
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
                            <p key={liability._id}>{`${
                              liability.name
                            } - S$${liability.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link
                                to="/liability/edit"
                                state={{ liability: liability }}
                              >
                                <Button>Edit Liability</Button>
                              </Link>{" "}
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
                  <tr>
                    <td>
                      <span className="font-bold">{`Insurance (Protection with cash value)`}</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "insurance")
                        .map((asset) => (
                          <>
                            <p key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link to="/asset/edit" state={{ asset: asset }}>
                                <Button>Edit Asset</Button>
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
                  <tr>
                    <td>
                      <span className="font-bold">Properties</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "property")
                        .map((asset) => (
                          <>
                            <p key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link to="/asset/edit" state={{ asset: asset }}>
                                <Button>Edit Asset</Button>
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
                  <tr>
                    <td>
                      <span className="font-bold">Others</span>
                      <br />
                      {assets
                        .filter((asset) => asset.type === "other")
                        .map((asset) => (
                          <>
                            <p key={asset._id}>{`${
                              asset.name
                            } - S$${asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}</p>
                            &nbsp;&nbsp;
                            <span>
                              <Link to="/asset/edit" state={{ asset: asset }}>
                                <Button>Edit Asset</Button>
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
