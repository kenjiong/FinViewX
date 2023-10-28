export default function PremiumPage({user}) {
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
              {user.tier === "free" ?
              <tr>
              <td>&nbsp;</td>
              <td>Your Current Plan</td>
              <td><button>Sign Up for Premium today!</button></td>
              </tr>
              :
              <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>You are already on Premium!</td>
              </tr>
  }
          </tbody>
        </table>
      </div>
    </>
  );
}
