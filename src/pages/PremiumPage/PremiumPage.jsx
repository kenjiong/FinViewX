import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usersService from "../../utilities/users-service";
import debug from "debug";

const log = debug("finviewx:src:PremiumPage");

export default function PremiumPage({ user, setUser }) {
  const navigate = useNavigate();
  const userId = user._id;

  const handleUpdateTier = async (event) => {
    event.preventDefault();
    const newTier = {...user, tier: "premium"};
    try {
      const newUser = await usersService.updateTier(newTier, userId);
      localStorage.removeItem("token");
      localStorage.setItem("token", newUser.token);
      setUser(usersService.getUser());
      navigate("/dashboard");
    } catch (error) {
      // get new token
      log(error);
    }
  };

  return (
    <>
      <div className="text-center">
        <table>
          <tbody>
            <tr>
              <th>&nbsp;</th>
              <th>Free</th>
              <th>Premium</th>
            </tr>
            <tr>
              <td>See your finances in one view</td>
              <td>&#x2714;</td>
              <td>&#x2714;</td>
            </tr>
            <tr>
              <td>Track your emergency funds</td>
              <td>&#x2718;</td>
              <td>&#x2714;</td>
            </tr>
            <tr>
              <td>Plan your retirement</td>
              <td>&#x2718;</td>
              <td>&#x2714;</td>
            </tr>
            <tr>
              <td>Flex on the peasants with swag</td>
              <td>&#x2718;</td>
              <td>&#x2714;</td>
            </tr>
            {user.tier === "free" ? (
              <tr>
                <td>&nbsp;</td>
                <td>Your Current Plan</td>
                <td>
                  <button onClick={handleUpdateTier}>
                    Sign Up for Premium today!
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>You are already on Premium!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
