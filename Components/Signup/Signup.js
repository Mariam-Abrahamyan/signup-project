import { useForm } from "react-hook-form";
import { Axios } from "../../Axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    Axios.post("signup", {
      name: data.name,
      surname: data.surname,
      login: data.login,
      password: data.password,
    }).then((result) => {
      console.log("from server", result.data);
      if (result.data.status == "success") {
        navigate("/");
      } else {
      }
    });
  };
  return (
    <div>
      <h3></h3>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div classNmae="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              //   className="form-control"
                              className={`form-control ${
                                errors.name ? "is-invalid" : ""
                              }`}
                              {...register("name", {
                                required: "Name is required",
                              })}
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              //   className="form-control"
                              className={`form-control ${
                                errors.surname ? "is-invalid" : ""
                              }`}
                              {...register("surname", {
                                required: "Surname is required",
                              })}
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Surname
                            </label>
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.surname.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="login"
                              id="form3Example3c"
                              //   className="form-control"
                              className={`form-control ${
                                errors.login ? "is-invalid" : ""
                              }`}
                              {...register("login", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                            {errors.login && (
                              <div className="invalid-feedback">
                                {errors.login.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              //    className="form-control"
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password must be at least 8 characters long",
                                },
                              })}
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password.message}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" />
                      <label className="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div> */}

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            for="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Signup;
