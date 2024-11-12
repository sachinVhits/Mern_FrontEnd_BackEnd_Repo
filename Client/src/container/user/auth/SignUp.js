import React, { useState } from "react";
import Index from "../../../component/Index.js";
import PageIndex from "../PageIndex.js";
import "./Auth.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    mobileNumber: "",
  };
  const handleSubmit = (value, { resetForm }) => {
    if (value) {
      PageIndex.DataService()
        .post(PageIndex.Api.REGISTRATION, value)
        .then((res) => {
          if (res.status == 201) Index.toast.success(res.data.message);
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
          Sign Up
        </Index.Typography>
        <Index.Box>
          <Index.Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={PageIndex.userRegistrationValidationSchema}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => (
              <Index.Form className="signup-form">
                <Index.FormControl>
                  <Index.FormLabel htmlFor="fullName">
                    Full Name
                  </Index.FormLabel>
                  <Index.TextField
                    id="fullName"
                    name="fullName"
                    fullWidth
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Full Name"
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Index.FormControl>
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
                <Index.FormControl>
                  <Index.FormLabel htmlFor="mobileNumber">
                    Mobile Number
                  </Index.FormLabel>
                  <Index.TextField
                    id="mobileNumber"
                    name="mobileNumber"
                    fullWidth
                    value={values.mobileNumber}
                    placeholder="123-456-7890"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                  />
                </Index.FormControl>
                <Index.Button type="submit" variant="contained" fullWidth>
                  Sign Up
                </Index.Button>
                <Index.Box className="signIn">
                  Already have an account?{" "}
                  <Index.Link href="/login" variant="body2">
                    Sign In
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

export default SignUp;
