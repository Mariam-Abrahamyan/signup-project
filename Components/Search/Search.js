import { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import "./search.css";
import { Link } from "react-router-dom";
const Search = () => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (text) {
      Axios.get("/search/" + text).then((r) => {
        console.log(r.data.users);
        setUsers(r.data.users);
      });
    } else {
      setUsers([]);
    }
  }, [text]);
  return (
    <div>
      <h3>Search</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="flex">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <img src={user.profilePicture} />
              <p>
                {user.name} {user.surname}
              </p>
              <Link to={"/profile/account/" + user.id}>Go To Profile</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Search;
