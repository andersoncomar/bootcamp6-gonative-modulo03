import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal as ModalComponent,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ModalActions } from '~/store/ducks/modal';
import { Creators as UsersActions } from '~/store/ducks/users';

import styles from './styles';

class Modal extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      visible: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
      cordinate: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      ]),
    }).isRequired,
    users: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    }).isRequired,
    hideModal: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    userInput: '',
  };

  handleInputChange = userInput => this.setState({ userInput });

  handleFormSubmit = () => {
    const { users } = this.props;

    if (users.loading) return;

    const { userInput } = this.state;

    if (!userInput) return;

    const {
      addUserRequest,
      modal: { coordinate },
    } = this.props;

    addUserRequest(userInput, coordinate);
    this.setState({ userInput: '' });
  };

  handleHideModal = () => {
    const { hideModal } = this.props;

    hideModal();
    this.setState({ userInput: '' });
  };

  render() {
    const { modal, users } = this.props;
    const { userInput } = this.state;

    return (
      <ModalComponent
        visible={modal.visible}
        transparent
        animationType="slide"
        onRequestClose={this.handleHideModal}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Adicionar novo local</Text>
            <TextInput
              style={styles.input}
              value={userInput}
              onChangeText={this.handleInputChange}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Usuário no Github"
              placeholderTextColor={styles.placeholder.color}
            />
            {users.error && <Text style={styles.error}>{users.error}</Text>}
            <View style={styles.buttonContainerView}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.buttonCancel]}
                onPress={this.handleHideModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.buttonSave]}
                onPress={this.handleFormSubmit}
              >
                {users.loading ? (
                  <ActivityIndicator color={styles.loading.color} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComponent>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...ModalActions, ...UsersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
