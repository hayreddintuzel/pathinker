import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Validate from "../../helpers/validate";
import { useFormik } from "formik";
import { useDispatch, useMappedState } from "redux-react-hook";
import types from "./types";
import Header from "../components/Header";
//Material UI
import {Avatar, Button, TextField, Checkbox, Grid, Typography, Container, FormControlLabel} from '@material-ui/core';
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/AccountCircle';
import { SPaper, SLink } from "../components/Styled";

function Register() {
    const [t] = useTranslation();
    const dispatch = useDispatch();

    const { registered, user, isLoading, error } = useMappedState(mapState);

    const [isAgree, setisAgree] = useState(false)

    const validationSchema = Yup.object().shape({
        email: Validate.Email(),
        password: Validate.Password(),
    });

    const account = {
        email: "",
        password: "",
    };

    const handleChange = event => {
        setisAgree(event.target.checked);
    };

    const formik = useFormik({
        initialValues: account,
        validationSchema,
        onSubmit: values => {
            console.log(values);
            dispatch({ type: types.REGISTER_LOADING });
            dispatch({ type: types.REGISTER_REQUEST, payload: values });
        },
    });
    return (
        <>
        <Header form="register"></Header>
        <Container component="main" maxWidth="sm">
            <SPaper>
            <Grid container justify="center">
                <Avatar >
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Grid container justify="center" className="mt-2">
                <Typography component="h1" variant="h5" color="primary">
                    {t("register.signup")}
                </Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit} className="px-4 mt-4">
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth
                        {...formik.getFieldProps('email')}
                        placeholder={t('placeholder.email')}
                        error={formik.errors.email && formik.touched.email}
                        helperText={(formik.errors.email && formik.touched.email) && formik.errors.email}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth
                        {...formik.getFieldProps('password')}
                        type="password"
                        placeholder={t('placeholder.password')}
                        error={formik.errors.password && formik.touched.password}
                        helperText={(formik.errors.password && formik.touched.password) && formik.errors.password}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} className="mt-3">
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox  {...formik.getFieldProps('agreement')}  
                            onChange={handleChange}                        
                            />}
                            label={t('register.agree')}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!isAgree}
                    >
                    {t("register.signup")}
                    </Button>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item className="mt-4">
                        <SLink to="/login">
                            {t("register.already")}
                        </SLink>
                    </Grid>
                </Grid>
            </form>
            </SPaper>
        </Container>
        </>
    );
}

const mapState = state => ({
    registered: state.isRegistered,
    isLoading: state.isLoading,
    user: state.user,
    error: state.error
});

export default Register;
