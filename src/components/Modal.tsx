import {
  View,
  Text,
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

type props = ModalProps & {
  isOpen: boolean;
  withInput: boolean;
};

const Modal = ({ isOpen, withInput, children, ...rest }: props) => {
  const content = withInput ? (
    <KeyboardAvoidingView className="flex-1 justify-center items-center p-3 bg-zinc-900/40">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className="flex-1 justify-center items-center p-3 bg-zinc-900/40">
      {children}
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RNModal>
  );
};

export default Modal;
