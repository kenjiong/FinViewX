import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Stats, Table } from "react-daisyui";
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
            <h3 className="mb-5 text-4xl text-accent">Welcome, {user.name}</h3>
            <Stats className="shadow font-sans">
              <Stats.Stat>
                <Stats.Stat.Item variant="figure" className="text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0"></path>
                    <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                    <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                    <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4"></path>
                    <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                    <path d="M5 15v1m0 -8v1"></path>
                  </svg>
                </Stats.Stat.Item>
                <Stats.Stat.Item variant="title">Total Assets</Stats.Stat.Item>
                <Stats.Stat.Item variant="value" className="text-success">
                  S$
                  {totalAssets.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Stats.Stat.Item>
                <Stats.Stat.Item variant="desc">&nbsp;</Stats.Stat.Item>
              </Stats.Stat>
              <Stats.Stat>
                <Stats.Stat.Item variant="figure" className="text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
                {netWorth < 0 ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Stats.Stat.Item variant="value" className="text-green-500">
                      S$
                      {netWorth.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      Your finances look healthy, keep it up!
                    </Stats.Stat.Item>
                  </>
                )}
              </Stats.Stat>
              <Stats.Stat>
                <Stats.Stat.Item variant="figure" className="text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
                <Stats.Stat.Item variant="desc">&nbsp;</Stats.Stat.Item>
              </Stats.Stat>
            </Stats>
            <div className="flex flex-row mt-10 gap-12">
              <div className="basis-1/2">
                <h2 className="text-3xl text-success mr-8">Assets</h2>
                <br />
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Cash
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Asset</span>
                          <span className="text-xl">Value (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {assets
                            .filter((asset) => asset.type === "cash")
                            .map((asset) => (
                              <Table.Row key={asset._id}>
                                <span className="text-xl">{asset.name}</span>
                                <span className="text-xl">
                                  {`${asset.value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}`}
                                </span>
                                <span>
                                  <Link
                                    to="/asset/edit"
                                    state={{ asset: asset }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Asset
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteAsset}
                                    assetId={asset._id}
                                  >
                                    Delete Asset
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Cash Investments
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Asset</span>
                          <span className="text-xl">Value (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {assets
                            .filter((asset) => asset.type === "investment")
                            .map((asset) => (
                              <Table.Row key={asset._id}>
                                <span className="text-xl">{asset.name}</span>
                                <span className="text-xl">
                                  {`${asset.value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}`}
                                </span>
                                <span>
                                  <Link
                                    to="/asset/edit"
                                    state={{ asset: asset }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Asset
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteAsset}
                                    assetId={asset._id}
                                  >
                                    Delete Asset
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    CPF
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Asset</span>
                          <span className="text-xl">Value (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {assets
                            .filter((asset) => asset.type === "cpf")
                            .map((asset) => (
                              <Table.Row key={asset._id}>
                                <span className="text-xl">{asset.name}</span>
                                <span className="text-xl">
                                  {`${asset.value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}`}
                                </span>
                                <span>
                                  <Link
                                    to="/asset/edit"
                                    state={{ asset: asset }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Asset
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteAsset}
                                    assetId={asset._id}
                                  >
                                    Delete Asset
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Insurance (Protection with cash value)
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Asset</span>
                          <span className="text-xl">Value (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {assets
                            .filter((asset) => asset.type === "insurance")
                            .map((asset) => (
                              <Table.Row key={asset._id}>
                                <span className="text-xl">{asset.name}</span>
                                <span className="text-xl">
                                  {`${asset.value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}`}
                                </span>
                                <span>
                                  <Link
                                    to="/asset/edit"
                                    state={{ asset: asset }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Asset
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteAsset}
                                    assetId={asset._id}
                                  >
                                    Delete Asset
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Properties
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Asset</span>
                          <span className="text-xl">Value (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {assets
                            .filter((asset) => asset.type === "property")
                            .map((asset) => (
                              <Table.Row key={asset._id}>
                                <span className="text-xl">{asset.name}</span>
                                <span className="text-xl">
                                  {`${asset.value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}`}
                                </span>
                                <span>
                                  <Link
                                    to="/asset/edit"
                                    state={{ asset: asset }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Asset
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteAsset}
                                    assetId={asset._id}
                                  >
                                    Delete Asset
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Others
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Asset</span>
                          <span className="text-xl">Value (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {assets
                            .filter((asset) => asset.type === "other")
                            .map((asset) => (
                              <Table.Row key={asset._id}>
                                <span className="text-xl">{asset.name}</span>
                                <span className="text-xl">
                                  {`${asset.value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}`}
                                </span>
                                <span>
                                  <Link
                                    to="/asset/edit"
                                    state={{ asset: asset }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Asset
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteAsset}
                                    assetId={asset._id}
                                  >
                                    Delete Asset
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleShowAddAsset}
                  className="mr-8 mt-12"
                  color="primary"
                >
                  Add New Asset
                </Button>
              </div>
              <div className="basis-1/2">
                <h2 className="text-3xl text-error mr-8">Liabilities</h2>
                <br />
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Credit Cards
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Liability</span>
                          <span className="text-xl">Amount (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {liabilities
                            .filter(
                              (liability) => liability.type === "creditcard"
                            )
                            .map((liability) => (
                              <Table.Row key={liability._id}>
                                <span className="text-xl">
                                  {liability.name}
                                </span>
                                <span className="text-xl">
                                  {`${liability.value.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}`}
                                </span>
                                <span>
                                  <Link
                                    to="/liability/edit"
                                    state={{ liability: liability }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Liability
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteLiability}
                                    liabilityId={liability._id}
                                  >
                                    Delete Liability
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Loans
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Liability</span>
                          <span className="text-xl">Amount (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {liabilities
                            .filter((liability) => liability.type === "loan")
                            .map((liability) => (
                              <Table.Row key={liability._id}>
                                <span className="text-xl">
                                  {liability.name}
                                </span>
                                <span className="text-xl">
                                  {`${liability.value.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}`}
                                </span>
                                <span>
                                  <Link
                                    to="/liability/edit"
                                    state={{ liability: liability }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Liability
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteLiability}
                                    liabilityId={liability._id}
                                  >
                                    Delete Liability
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-ghost">
                  <input type="checkbox" />
                  <div className="collapse-title text-2xl text-secondary">
                    Others
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto mx-auto">
                      <Table zebra="true">
                        <Table.Head>
                          <span className="text-xl">Liability</span>
                          <span className="text-xl">Amount (S$)</span>
                          <span />
                        </Table.Head>
                        <Table.Body>
                          {liabilities
                            .filter((liability) => liability.type === "other")
                            .map((liability) => (
                              <Table.Row key={liability._id}>
                                <span className="text-xl">
                                  {liability.name}
                                </span>
                                <span className="text-xl">
                                  {`${liability.value.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}`}
                                </span>
                                <span>
                                  <Link
                                    to="/liability/edit"
                                    state={{ liability: liability }}
                                  >
                                    <Button color="primary" size="sm">
                                      Edit Liability
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <Button
                                    color="accent"
                                    size="sm"
                                    onClick={handleDeleteLiability}
                                    liabilityId={liability._id}
                                  >
                                    Delete Liability
                                  </Button>
                                </span>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleShowAddLiability}
                  className="mr-8 mt-12"
                  color="primary"
                >
                  Add New Liability
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
