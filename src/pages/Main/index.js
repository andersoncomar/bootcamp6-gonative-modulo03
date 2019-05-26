import React, { Fragment } from 'react';

import { StatusBar } from 'react-native';

import Modal from '~/components/Modal';
import Map from '~/components/Map';

const Main = () => (
  <Fragment>
    <StatusBar barStyle="light-content" />
    <Map />
    <Modal />
  </Fragment>
);

export default Main;
