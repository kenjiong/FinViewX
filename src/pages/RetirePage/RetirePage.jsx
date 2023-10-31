import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
          <h3>The Retire feature is only available for Premium users!</h3>
          <br />
          <p>Don't miss out! Subscribe to Premium today!</p>
          <Link to="/premium">
            <button className="btn">Subscribe</button>
          </Link>
        </>
      ) : user.tier === "premium" ? (
        savings[0]?.monthlyExpenses ? (
          <>
            <div>
              <SavingsChart />
            </div>
            <div>
              <p>
                Your current savings: S$
                {totalSavings.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <br />
              {shortfall < 0 ? (
                <p>Congratulations! You have sufficient emergency funds!</p>
              ) : (
                <p>
                  You need another: S$
                  {shortfall.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>
            <div>
              <Link to="/save/form">
                <button>
                  Click here to set or edit your ideal emergency fund
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>
                Your current savings: S$
                {totalSavings.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <Link to="/save/form">
                <button>
                  Click here to set or edit your ideal emergency fund
                </button>
              </Link>
            </div>
          </>
        )
      ) : (
        <div>
          <h2>Something went wrong.</h2>
        </div>
      )}
    </>
  );
}
