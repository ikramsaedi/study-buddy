import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { bodyFontSize, doubleBaseUnit, accentColor } from '../styles/styles';

type MoreMenuProps = {
  visible: boolean;
  onClose: () => void;
  onCreateGroup: (groupName: string) => void;  // Update to accept group name
};

export function MoreMenu({ visible, onClose, onCreateGroup }: MoreMenuProps) {
  const handleCreateGroup = () => {
    Alert.alert("Not Implemented", "This feature isn't part of the MVP.");
    onClose(); // Close the menu after showing the alert
  };
  

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.moreMenu}>
            <TouchableOpacity onPress={handleCreateGroup} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Create Custom Group</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  moreMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '75%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  menuItem: {
    paddingVertical: doubleBaseUnit,
    paddingHorizontal: doubleBaseUnit,
    borderBottomWidth: 0.5,
    borderColor: '#D3D3D3',
  },
  menuItemText: {
    fontSize: bodyFontSize,
    color: accentColor,
    textAlign: 'center',
  },
  inputModal: {
    backgroundColor: 'white',
    padding: doubleBaseUnit,
    borderRadius: 10,
    width: '75%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: bodyFontSize,
    marginBottom: doubleBaseUnit,
    color: accentColor,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    width: '100%',
    padding: doubleBaseUnit,
    borderRadius: 5,
    fontSize: bodyFontSize,
    marginBottom: doubleBaseUnit,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  submitButton: {
    backgroundColor: accentColor,
    paddingVertical: doubleBaseUnit / 2,
    paddingHorizontal: doubleBaseUnit,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: doubleBaseUnit / 2,
    paddingHorizontal: doubleBaseUnit,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: bodyFontSize,
  },
});
