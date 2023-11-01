import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RetirementChart from "../../components/RetirementChart/RetirementChart";
import * as retirementService from "../../utilities/retirement-service";
import * as assetsService from "../../utilities/assets-service";
import debug from "debug";

const log = debug("finviewx:src:RetirePage");

const calculateAge = (date) => {
  const today = new Date()
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
  const getCPFBalance = (age, retireAge) => {
    let cpfBalance;
    if (age > 54) {
      cpfBalance = (currentOA + currentSA) * (1.04 ^ (retireAge - age));
      return cpfBalance;
    } else {
      cpfBalance =
        (currentOA * (1.025 ^ (55 - age)) + currentSA * (1.04 ^ (55 - age))) *
        (1.04 ^ (retireAge - 55));
      return cpfBalance;
    }
  };
  const totalExpenses =
    retirement[0]?.monthlyExpenses *
    12 *
    (retirement[0]?.lifeExpectancy - retirement[0]?.retirementAge);
  const shortfall =
    totalExpenses - getCPFBalance(currentAge, retirement[0]?.retirementAge);

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
          currentOA && currentSA ? (
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
                <Link
                  to="/retire/form"
                  state={{
                    retirement: retirement[0]
                  }}
                >
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
                    })}{" "}
                    more to achieve your retirement goal.
                  </p>
                )}
              </span>
            </div>
            <div>
              <p>
                You currently have S$
                {currentOA?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                in your CPF OA and S$
                {currentSA?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                in your CPF SA.
              </p>
              <p>
                Your CPF balance is projected to be S$
                {getCPFBalance(
                  currentAge,
                  retirement[0]?.retirementAge
                )?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                at your intended retirement age of{" "}
                {retirement[0]?.retirementAge}.
              </p>
              <p>
                Your total estimated retirement expenses until age{" "}
                {retirement[0]?.lifeExpectancy} is S$
                {totalExpenses.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}.
              </p>
            </div>
          </>
        ) : (
          <span>
          Please enter both your CPF OA and SA values in your dashboard before you are able to view your retirement goal.
        </span>
        )) : (
          <>
            <div>
              <span>You have not set a retirement goal yet!</span>
              <br />
              {currentOA && currentSA ? (
                <span>
                  <Link
                    to="/retire/form"
                    state={{
                      retirement: retirement[0]
                    }}
                  >
                    <button>Set Retirement Goal</button>
                  </Link>
                </span>
              ) : (
                <span>
                  Please enter both your CPF OA and SA values in your dashboard
                  before you are able to set your retirement goal.
                </span>
              )}
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
