import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RetirementChart from "../../components/RetirementChart/RetirementChart";
import * as retirementService from "../../utilities/retirement-service";
import * as assetsService from "../../utilities/assets-service";
import debug from "debug";

const log = debug("finviewx:src:RetirePage");

const calculateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default function RetirePage({ user }) {
  const [retirement, setRetirement] = useState([]);
  const [assets, setAssets] = useState([]);
  const userId = user._id;

  useEffect(() => {
    const fetchRetirement = async () => {
      try {
        const data = await retirementService.getRetirementGoal(userId);
        setRetirement(data);
      } catch (error) {
        log(error);
      }
    };
    fetchRetirement();
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

  const currentOA = assets
    .filter((asset) => asset.type === "cpf")
    .filter((asset) => asset.name === "OA")[0]?.value;
  const currentSA = assets
    .filter((asset) => asset.type === "cpf")
    .filter((asset) => asset.name === "SA")[0]?.value;
  const currentAge = calculateAge(retirement[0]?.birthDate);
  const shortfall = 0;

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
        retirement[0]?.monthlyExpenses ? (
          <>
            <div>
              <p>Your retirement goal:</p>
              <p>
                Retire at age {retirement[0]?.retirementAge} with monthly
                expenses of S$
                {retirement[0]?.monthlyExpenses.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                until age {retirement[0]?.lifeExpectancy}
              </p>
              <span>
                <Link to="/retire/form">
                  <button>Edit Retirement Goal</button>
                </Link>
              </span>
            </div>
            <br />
            <div>
              <span>
              <RetirementChart />
              </span>
            <span>
            {shortfall < 0 ? (
              <p>You've met your retirement goal!</p>
            ) : (
              <p>
                You need S$
                {shortfall.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} more in your CPF to achieve your retirement goal.
              </p>
            )}
            </span>
          </div>
          <div>
            <p>You currently have S${currentOA.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} in your CPF OA and S${currentSA.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} in your CPF SA.</p>
            <p>Your CPF balance is projected to be S${} at age 65 when you will start receiving CPF Life payouts.</p>
            <p>You have a S${} shortfall, which can be made up with an average monthly income of S${} until your intended retirement at age {retirement[0]?.retirementAge}</p>
          </div>
          </>
        ) : (
          <>
            <div>
              <span>You have not set a retirement goal yet!</span>
              <br />
              { currentOA && currentSA ? (
              <span>
                <Link to="/retire/form">
                  <button>Set Retirement Goal</button>
                </Link>
              </span>
              ) : (
              <span>Please enter both your CPF OA and SA values in your dashboard before you are able to set your retirement goal</span>
              )}
            </div>
          </>
      )) : (
        <div>
          <h2>Something went wrong.</h2>
        </div>
      )}
    </>
  );
}
