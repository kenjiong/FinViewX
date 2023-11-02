import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
import SavingsChart from "../../components/SavingsChart/SavingsChart";
import * as savingsService from "../../utilities/savings-service";
import * as assetsService from "../../utilities/assets-service";
import debug from "debug";

const log = debug("finviewx:src:SavePage");

export default function SavePage({ user }) {
  const [savings, setSavings] = useState([]);
  const [assets, setAssets] = useState([]);
  const userId = user._id;

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const data = await savingsService.getEmergencyFund(userId);
        setSavings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchSavings();
  }, [userId]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await assetsService.getAllAssets(userId);
        setAssets(data);
      } catch (error) {
        log(error);
      }
    };
    fetchAssets();
  }, [userId]);

  const totalSavings = assets
    .filter((asset) => asset.type === "cash")
    .reduce((acc, asset) => acc + asset.value, 0);
  const totalEmergencyFund = savings[0]?.monthlyExpenses * savings[0]?.months;
  const shortfall = totalEmergencyFund - totalSavings;

  return (
    <>
      {user.tier === "free" ? (
        <>
          <div className="flex flex-col items-center justify-center mt-auto">
            <h3 className="mb-5 text-2xl text-accent">
              The Save feature is only available for Premium users!
            </h3>
            <br />
            <p className="mb-5 text-xl">
              Don't miss out - subscribe to Premium today!
            </p>
            <br />
            <Link to="/premium">
              <Button color="secondary">Subscribe</Button>
            </Link>
          </div>
        </>
      ) : user.tier === "premium" ? (
        savings[0]?.monthlyExpenses ? (
          <>
            <div className="flex flex-col items-center mt-auto">
              <SavingsChart
                totalSavings={totalSavings}
                totalEmergencyFund={totalEmergencyFund}
                shortfall={shortfall}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              {shortfall < 0 ? (
                <p className="text-success text-xl">
                  You've met your ideal emergency fund of <u>S$
                  {totalEmergencyFund.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</u>
                  !
                </p>
              ) : (
                <>
                  <p className="text-xl">
                    Your current savings: <u>S$
                    {totalSavings.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}</u>
                  </p>
                  <br />
                  <p className="text-xl text-accent">
                    You need another <u>S$
                    {shortfall.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}</u>{" "}
                    to achieve your ideal emergency fund.
                  </p>
                </>
              )}
            </div>
            <br />
            <div className="flex flex-col items-center justify-center">
              <Link to="/save/form" state={{ savings: savings[0] }}>
                <Button color="primary">
                 Edit your ideal emergency fund
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mt-auto">
              <p className="text-3xl mb-8">
                Your current savings: <u>S$
                {totalSavings.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</u>
              </p>
              <Link to="/save/form" state={{ savings: savings[0] }}>
                <Button color="primary">
                  Set your ideal emergency fund
                </Button>
              </Link>
            </div>
          </>
        )
      ) : (
        <div className="flex flex-col items-center mt-auto">
          <h2 className="text-3xl text-error">Something went wrong.</h2>
        </div>
      )}
    </>
  );
}
