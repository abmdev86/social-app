import IsEmail from 'isemail';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  Button,
  CenteredContentBox,
  ErrorMessage,
  SmallHeader,
  TextInput,
  TextArea,
} from '../ui';

const Form = styled.div`
 width: 600px;
 margin: 32px;
`;

const FieldsTable = styled.table`
width: 100%;
td{
  padding: 8px,
  width: 50%;
}
`;

const FullWidthInput = styled(TextInput)`
    width: 100%;
`;

const FullWidthButton = styled(Button)`
    width: 100%;
`;
export const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  //helper function validating fields
  const validateForm = () => {
    if (!firstName || !lastName || !emailAddress) return 'Please Fill out all fields';
    if (!IsEmail(emailAddress)) return 'Please enter a valid email address';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  }

  // Clicks Create Account Button
  const onClickCreate = async () => {
    setErrorMessage('');

    // If any errors show error message and do not proceed.
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    // Firebase code here...
  }


  return (
    <CenteredContentBox>
      <Form>
        <SmallHeader>Create a new Account</SmallHeader>
        {errorMessage
          ? <ErrorMessage style={{ marginBottom: '16px', }}>{errorMessage}</ErrorMessage> : null}
        <FieldsTable>
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>
                <FullWidthInput
                  value={firstName}
                  placeholder='John'
                  onChange={e => setFirstName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>
                <FullWidthInput
                  value={lastName}
                  placeholder='Doe'
                  onChange={e => setLastName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Email Address:</td>
              <td>
                <FullWidthInput
                  value={emailAddress}
                  placeholder='john.doe@gmail.com'
                  onChange={e => setEmailAddress(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <FullWidthInput
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Confirm Password:</td>
              <td>
                <FullWidthInput
                  type='password'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Bio:</td>
              <td>
                <TextArea
                  rows='5'
                  value={bio}
                  placeholder='Tell others a little bit about yourself'
                  style={{ width: '100%' }}
                  onChange={e => setBio(e.target.value)} />
              </td>
            </tr>
          </tbody>
        </FieldsTable>
        <FullWidthButton
          onClick={onClickCreate}
        >Create Account</FullWidthButton>
      </Form>
  </CenteredContentBox>
)
}