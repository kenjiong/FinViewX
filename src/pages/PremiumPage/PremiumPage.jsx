import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-daisyui";
import * as usersService from "../../utilities/users-service";
import debug from "debug";

const log = debug("finviewx:src:PremiumPage");

export default function PremiumPage({ user, setUser }) {
  const navigate = useNavigate();
  const userId = user._id;

  const handleUpdateTier = async (event) => {
    event.preventDefault();
    const newTier = { ...user, tier: "premium" };
    try {
      const newUser = await usersService.updateTier(newTier, userId);
      localStorage.removeItem("token");
      localStorage.setItem("token", newUser.token);
      setUser(usersService.getUser());
      navigate("/dashboard");
    } catch (error) {
      log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-2">
        <h2 className="mb-5 text-3xl font-bold text-accent">
          Upgrade your FinViewX experience today!
        </h2>
        <br />
        <div className="overflow-x-auto">
          <Table zebra="true">
            <Table.Head>
              <span />
              <span className="text-xl text-info">Free</span>
              <span className="text-xl text-success">Premium</span>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <span>See your finances in one view</span>
                <span>&#x2714;</span>
                <span>&#x2714;</span>
              </Table.Row>
              <Table.Row>
                <span>Track your emergency funds</span>
                <span>&#x2718;</span>
                <span>&#x2714;</span>
              </Table.Row>
              <Table.Row>
                <span>Plan your retirement</span>
                <span>&#x2718;</span>
                <span>&#x2714;</span>
              </Table.Row>
              <Table.Row>
                <span>Flex on the peasants with swag</span>
                <span>&#x2718;</span>
                <span>&#x2714;</span>
              </Table.Row>
              {user.tier === "free" ? (
                <Table.Row>
                  <span />
                  <span className="text-info">YOUR CURRENT PLAN</span>
                  <span>
                    <Button onClick={handleUpdateTier} color="success">
                      Sign Up for Premium today!
                    </Button>
                  </span>
                </Table.Row>
              ) : (
                <Table.Row>
                  <span />
                  <span />
                  <span className="text-success">
                    You are already on Premium!<br />
                    Thank you for your support ☺
                  </span>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
