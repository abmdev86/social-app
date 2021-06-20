import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Link
} from 'react-router-dom';

import {
  Button,
  CenteredContentBox,
  //ErrorMessage,
  // SmallHeader,
  Header,
} from '../ui';
const signIn = () => {

};
export const Home = () => {
  return (

      <CenteredContentBox>
        <Header> Social Space </Header>
        <ul>
        <li>New System Checker Feature. Find out what your pushing.</li>
        <li>
          
        </li>
        </ul>
        <Button><Link to='/sign-in'>Sign-In</Link></Button>
        <Button><Link to='/create-account'>Creat</Link></Button>

      </CenteredContentBox>




  );
};