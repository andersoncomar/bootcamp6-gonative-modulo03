import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as ModalActions } from '~/store/ducks/modal';

import styles from './styles';

const Map = ({ users, showModal }) => (
  <MapView
    initialRegion={{
      latitude: -27.2177659,
      longitude: -49.6451598,
      latitudeDelta: 0.0042,
      longitudeDelta: 0.0031,
    }}
    style={styles.container}
    showsUserLocation
    loadingEnabled
    onLongPress={({ nativeEvent: { coordinate } }) => showModal(coordinate)}
  >
    {users.data.map(user => (
      <Marker key={String(user.id)} id={user.id} coordinate={user.coordinate} title={user.login}>
        <Image source={{ uri: user.avatar }} style={styles.annotationContainer} />
        <Callout title={user.login}>
          <View style={styles.calloutContainer}>
            <Text style={styles.name}>{user.name}</Text>
            {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
          </View>
        </Callout>
      </Marker>
    ))}
  </MapView>
);

Map.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    avatar: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
