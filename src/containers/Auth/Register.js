import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/modules/auth';

import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';

const Register = ({ AuthActions, name, tag, username, password, passwordConfirm }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    AuthActions.changeInput({
      name,
      value,
      form: 'register'
    });
  }

  useEffect(() => {
    return () => AuthActions.initializeForm('register');
  }, [AuthActions]);

  return (
    <AuthContent title="회원가입">
      <InputWithLabel
        label="닉네임"
        name="name"
        placeholder="닉네임"
        value={name}
        onChange={handleChange}
      />
      <InputWithLabel
        label="태그번호"
        name="tag"
        placeholder="태그번호"
        value={tag}
        onChange={handleChange}
      />
      <InputWithLabel
        label="아이디"
        name="username"
        placeholder="아이디"
        value={username}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={handleChange}
      />
      <AuthButton>회원가입</AuthButton>
      <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
    </AuthContent>
  );
}

export default connect(
  (state) => ({
    form: state.auth.getIn(['register', 'form'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Register);