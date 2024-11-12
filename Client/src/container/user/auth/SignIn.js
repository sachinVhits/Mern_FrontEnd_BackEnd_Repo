import React, { useState } from "react";

import Index from "../../../component/Index.js";
import PageIndex from "../PageIndex.js";

import "./Auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = Index.useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (value, { resetForm }) => {
    if (value) {
      PageIndex.DataService()
        .post(PageIndex.Api.LOGIN, value)
        .then((res) => {
          if (res.status == 200) Index.toast.success(res.data.message);
          localStorage.setItem("token", res.data.data.token);
          setTimeout(() => {
            navigate("/user/dashboard");
          }, 3000);
          resetForm();
        })
        .catch((err) => {
          Index.toast.error(err.response.data.message);
          console.log(err);
        });
    }
    resetForm();
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <Index.Box className="signup-container">
      <Index.Card className="signup-card">
        <Index.Typography variant="h4" className="signup-header" gutterBottom>
          Log In
        </Index.Typography>
        <Index.Box>
          <Index.Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={PageIndex.userLoginValidationSchema}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => (
              <Index.Form className="signup-form">
                <Index.FormControl>
                  <Index.FormLabel htmlFor="email">Email</Index.FormLabel>
                  <Index.TextField
                    id="email"
                    name="email"
                    fullWidth
                    placeholder="your@email.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Index.FormControl>
                <Index.FormControl>
                  <Index.FormLabel htmlFor="password">Password</Index.FormLabel>
                  <Index.TextField
                    id="password"
                    name="password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <Index.InputAdornment position="end">
                          <Index.IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <Index.VisibilityOff />
                            ) : (
                              <Index.Visibility />
                            )}
                          </Index.IconButton>
                        </Index.InputAdornment>
                      ),
                    }}
                  />
                </Index.FormControl>
                <Index.Button type="submit" variant="contained" fullWidth>
                  Log In
                </Index.Button>
                <Index.Box className="signIn">
                  Don't have an account?{" "}
                  <Index.Link href="/" variant="body2">
                    Sign Up
                  </Index.Link>
                </Index.Box>
              </Index.Form>
            )}
          </Index.Formik>
        </Index.Box>
      </Index.Card>
    </Index.Box>
  );
};

export default Login;
