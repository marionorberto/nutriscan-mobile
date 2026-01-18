import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

export const LoadingOverlay = ({ visible }: { visible: boolean }) => (
  <Modal
    transparent={true}
    animationType="fade"
    visible={visible}
    onRequestClose={() => {}} // Impede fechar no botão voltar do Android
  >
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size={80} color="#24B370" />
        {/* Você pode adicionar um Texto abaixo se quiser */}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Cor escura translúcida
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    elevation: 5, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
