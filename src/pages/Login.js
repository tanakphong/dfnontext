import React from 'react';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup
  .object({
    username: yup.string().required('ชื่อผู้ใช้งาน ห้ามเว้นว่าง'),
    password: yup.string().required('รหัสผ่าน ห้ามเว้นว่าง'),
  })
  .required();

const Login = () => {
  // const [idToken, setIdToken] = useState('');
  const [profile, setProfile] = useState({});

  const initLine = () => {
    liff.init(
      { liffId: '1657045091-ygknAM22' },
      () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login({
            redirectUri: 'https://react-3ysojc.stackblitz.io/login',
          });
        }
      },
      (err) => console.error(err)
    );
  };

  const runApp = () => {
    // const idToken = liff.getIDToken();
    // setIdToken(idToken);
    register('token', { value: liff.getIDToken() });
    liff
      .getProfile()
      .then((profile) => {
        // console.log(profile);
        setProfile(profile);
      })
      .catch((err) => console.error(err));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const apiUrl = 'https://sg.jssr.co.th/users/authen';
      const resp = await axios.post(apiUrl, data);

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initLine();
  }, [profile.userId]);

  // console.log(watch('username'));

  return (
    <>
      <h2 className="text-center">เข้าสู่ระบบ</h2>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            ชื่อผู้ใช้งาน
          </label>
          <input
            type="text"
            id="username"
            aria-describedby="username"
            {...register('username', { required: true })}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username?.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            รหัสผ่าน
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password?.message}</div>
          )}
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
