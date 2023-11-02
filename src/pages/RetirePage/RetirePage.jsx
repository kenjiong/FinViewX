import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
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
  const getCPFBalance = (age, retireAge) => {
    let cpfBalance;
    if (age > 54) {
      cpfBalance = (currentOA + currentSA) * 1.04 ** (retireAge - age);
      return cpfBalance;
    } else {
      cpfBalance =
        (currentOA * 1.025 ** (55 - age) + currentSA * 1.04 ** (55 - age)) *
        1.04 ** (retireAge - 55);
      return cpfBalance;
    }
  };
  const totalExpenses =
    retirement[0]?.monthlyExpenses *
    12 *
    (retirement[0]?.lifeExpectancy - retirement[0]?.retirementAge);
  const shortfall =
    totalExpenses - getCPFBalance(currentAge, retirement[0]?.retirementAge);
  const leftover =
    getCPFBalance(currentAge, retirement[0]?.retirementAge) - totalExpenses;

  return (
    <>
      {user.tier === "free" ? (
        <>
          <div className="flex flex-col items-center justify-center mt-auto">
            <h3 className="mb-5 text-2xl text-accent">
              The Retire feature is only available for Premium users!
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
        retirement[0]?.monthlyExpenses ? (
          currentOA && currentSA ? (
            <>
              <div className="flex flex-col items-center mt-auto mb-5">
                <p className="text-2xl mb-1 text-secondary">
                  Your retirement goal:
                </p>
                <p className="text-xl">
                  Retire at age {retirement[0]?.retirementAge} with monthly
                  expenses of S$
                  {retirement[0]?.monthlyExpenses.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  until age {retirement[0]?.lifeExpectancy}.
                </p>
              </div>
              <br />
              <div className="flex flex-col items-center mt-auto">
                <span className="mb-8">
                  <RetirementChart
                    currentOA={currentOA}
                    currentSA={currentSA}
                    retirementAge={retirement[0]?.retirementAge}
                    lifeExpectancy={retirement[0]?.lifeExpectancy}
                    cpfBalance={getCPFBalance(
                      currentAge,
                      retirement[0]?.retirementAge
                    )}
                    shortfall={shortfall}
                    leftover={leftover}
                  />
                </span>
                <span>
                  {shortfall < 0 ? (
                    <p className="text-2xl text-success">
                      You've met your retirement goal!
                    </p>
                  ) : (
                    <p className="text-2xl text-error">
                      You need <u>S$
                      {shortfall.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</u>{" "}
                      more to achieve your retirement goal.
                    </p>
                  )}
                </span>
              </div>
              <div className="flex flex-col items-center mt-10">
                <p className="text-xl">
                  You currently have <u>S$
                  {currentOA?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</u>{" "}
                  in your CPF OA and <u>S$
                  {currentSA?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</u>{" "}
                  in your CPF SA.
                </p>
                <p className="text-xl">
                  Your CPF balance is projected to be <u>S$
                  {getCPFBalance(
                    currentAge,
                    retirement[0]?.retirementAge
                  )?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</u>{" "}
                  at your intended retirement age of{" "}
                  {retirement[0]?.retirementAge}.
                </p>
                <p className="text-xl">
                  Your total estimated retirement expenses until age{" "}
                  {retirement[0]?.lifeExpectancy} is <u>S$
                  {totalExpenses.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</u>
                  .
                </p>
              </div>
              <div className="flex flex-col items-center mt-8">
                <Link
                  to="/retire/form"
                  state={{
                    retirement: retirement[0],
                  }}
                >
                  <Button color="primary">Edit Retirement Goal</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center mt-auto">
              <span className="text-2xl text-accent mb-6">
                Please enter both your CPF OA and SA values in your dashboard
                before you are able to view your retirement goal.
              </span>
              <Link to="/dashboard">
                <Button color="primary">Take me to my dashboard</Button>
              </Link>
            </div>
          )
        ) : (
          <>
            <div className="flex flex-col items-center mt-auto">
              <span className="text-3xl mb-6">You have not set a retirement goal yet!</span>
              <br />
              {currentOA && currentSA ? (
                <span>
                  <Link
                    to="/retire/form"
                    state={{
                      retirement: retirement[0],
                    }}
                  >
                    <Button color="primary">Set Retirement Goal</Button>
                  </Link>
                </span>
              ) : (
                <div className="flex flex-col items-center mt-auto">
                <span className="text-2xl text-accent mb-6">
                  Please enter both your CPF OA and SA values in your dashboard
                  before you are able to set your retirement goal.
                </span>
                <Link to="/dashboard">
                  <Button color="primary">Take me to my dashboard</Button>
                </Link>
              </div>
              )}
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
