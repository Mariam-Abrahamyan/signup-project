import { useForm } from "react-hook-form";
import { Axios } from "../../Axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);

    Axios.post("login", {
      login: data.email,
      password: data.password,
    }).then((result) => {
      console.log("from server", result.data);
      if (result.data.status === "success") {
        navigate("/profile");
      } else {
        console.log("Login failed:", result.data.message);
      }
    });
  };
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-outline mb-4">
          <input
            type="login"
            id="form2Example1"
            className={`form-control ${errors.login ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <label className="form-label" for="form2Example1">
            Email address
          </label>
          {errors.login && (
            <div className="invalid-feedback">{errors.login.message}</div>
          )}
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          <label className="form-label" for="form2Example2">
            Password
          </label>
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
};
export default Login;
