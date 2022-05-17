import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/user";

function ProfileForm(props) {
  const [readOnly, setReadOnly] = useState(true);
  const { userDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { name, email, qualification, aboutme, phno, role } = userDetail;
  let { dob } = userDetail;
  dob = dob.split("T")[0];

  const formik = useFormik({
    initialValues: { name, email, dob, qualification, aboutme, phno, role },
    onSubmit: async (values) => {
      let modifiedValues = {};
      if (values) {
        Object.entries(values).forEach((entry) => {
          let key = entry[0];
          let value = entry[1];

          if (value !== userDetail[key]) {
            modifiedValues[key] = value;
          }
        });
      }

      await dispatch(updateUser(modifiedValues));
      setReadOnly(!readOnly);
    },
  });

  const handleEdit = (e) => {
    e.preventDefault();
    setReadOnly(!readOnly);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} mt={1}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            fullWidth
            required
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            inputProps={{ readOnly: readOnly }}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            required
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            required
            id="dob"
            name="dob"
            helperText="Date of Birth *"
            inputProps={{ readOnly: readOnly }}
            type="date"
            value={formik.values.dob}
            onChange={formik.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            required
            id="qualification"
            name="qualification"
            label="Qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            inputProps={{ readOnly: readOnly }}
            fullWidth
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            required
            id="aboutme"
            name="aboutme"
            label="About Me"
            multiline
            rows={8}
            // maxRows={4}
            value={formik.values.aboutme}
            onChange={formik.handleChange}
            inputProps={{ readOnly: readOnly }}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            required
            id="phno"
            name="phno"
            label="Phone No"
            type="number"
            value={formik.values.phno}
            onChange={formik.handleChange}
            inputProps={{ readOnly: readOnly }}
            fullWidth
          />
        </Grid>
        <Grid item md={6} mb={2} sm={12} xs={12}>
          <TextField
            fullWidth
            required
            id="role"
            name="role"
            label="Role"
            value={formik.values.role}
            onChange={formik.handleChange}
            disabled
          />
        </Grid>
      </Grid>

      {readOnly && (
        <Button variant="outlined" color="error" onClick={handleEdit}>
          Edit
        </Button>
      )}

      {!readOnly && (
        <>
          <Button variant="outlined" color="error" type="submit">
            Save
          </Button>{" "}
          &nbsp;
          <Button variant="outlined" onClick={handleEdit}>
            Back
          </Button>
        </>
      )}
    </form>
    //   )}
    // </Formik>
  );
}

export default ProfileForm;
