import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../Axios";

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState({ success: null, message: "" });
  const { account } = useOutletContext();
  const [isPrivate, setIsPrivate] = useState(account.isPrivate);
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, senderName: "John Doe" },
    { id: 2, senderName: "Jane Smith" },
  ]);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setStatus({ success: null, message: "" });

    Axios.put("/updatePassword", data)
      .then((response) => {
        setStatus({ success: true, message: "Password changed successfully!" });
        navigate("/");
      })
      .catch((error) => {
        setStatus({
          success: false,
          message: "Password change failed. Please, try again.",
        });
      });
  };

  const handleUpdate = () => {
    Axios.post("changeProfileStatus").then((response) => {
      setIsPrivate(response.data.info);
    });
  };
  const acceptFriendRequest = (requestId) => {
    Axios.post("/acceptRequest", requestId)
      .then((response) => {
        if (response.data.status === "success") {
          setFriendRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== requestId),
          );
        }
      })
      .catch((error) => {
        console.error("Error accepting friend request:", error);
      });
  };

  const declineFriendRequest = (requestId) => {
    Axios.post("/declineRequest", requestId)
      .then((response) => {
        if (response.data.status === "success") {
          setFriendRequests((prevRequests) =>
            prevRequests.filter((request) => request.id != requestId),
          );
        }
      })
      .catch((error) => {
        console.error("Error declining friend request:", error);
      });
  };

  return (
    <div>
      <p>Your profile is {isPrivate ? "private" : "public"}</p>
      <button onClick={handleUpdate}>Switch</button>
      <h4>Friend Requests</h4>
      {friendRequests.map((user) => (
        <div key={user.id}>
          <p>{user.senderName} sent you a friend request.</p>
          <button
            className="btn btn-primary"
            onClick={() => acceptFriendRequest(user.id)}
          >
            Accept
          </button>
          <button
            className="btn btn-success"
            onClick={() => declineFriendRequest(user.id)}
          >
            Decline
          </button>
        </div>
      ))}
      <h3>Settings</h3>
      {status.message && (
        <p style={{ color: status.success ? "green" : "red" }}>
          {status.message}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="pldPassword">Current Password</label>
          <input
            type="password"
            id="oldPassword"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
          />
          {errors.oldPassword && (
            <p style={{ color: "red" }}>{errors.oldPassword.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword", {
              required: "New password is required",
            })}
          />
          {errors.newPassword && (
            <p style={{ color: "red" }}>{errors.newPassword.message}</p>
          )}
        </div>
        <div>
          <button type="submit" className="btn btn-success">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};
export default Settings;
