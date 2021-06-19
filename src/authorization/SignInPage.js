import React from 'react';
import { SignInForm } from './SignInForm';
import { CenteredContentBox } from '../ui';

export const SignInPage = () => {
  return (
    <>
      <CenteredContentBox>
        <SignInForm />
      </CenteredContentBox>
    </>
  );
};