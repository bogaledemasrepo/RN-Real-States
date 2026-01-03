import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Animated,
    ColorValue,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Define the shape of our Props
interface ConfirmModalProps {
  show: boolean;
  mode?: 'delete' | 'activate';
  isProcessing?: boolean;
  title: string;
  subText: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  show, 
  mode = 'activate', 
  isProcessing = false, 
  title, 
  subText, 
  cancelText = 'Cancel', 
  confirmText = 'Confirm',
  onCancel,
  onConfirm 
}) => {
  // Animation refs with explicit types
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      Animated.parallel([
        Animated.spring(scaleAnim, { 
          toValue: 1, 
          friction: 8, 
          tension: 40, 
          useNativeDriver: true 
        }),
        Animated.timing(opacityAnim, { 
          toValue: 1, 
          duration: 200, 
          useNativeDriver: true 
        })
      ]).start();
    } else {
      // Reset animations when closed
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [show]);

  const isDelete = mode === 'delete';

  return (
    <Modal 
      transparent 
      visible={show} 
      animationType="none" 
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        
        <Animated.View 
          style={[
            styles.card, 
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }
          ]}
        >
          {/* Status Icon Wrapper */}
          <View style={[styles.iconCircle, isDelete ? styles.bgRed : styles.bgGreen]}>
            <Image 
              source={isDelete ? require('./assets/alert-circle.png') : require('./assets/success.png')} 
              style={[styles.innerIcon, { tintColor: (isDelete ? '#D32F2F' : '#00b828') as ColorValue }]} 
              resizeMode="contain"
            />
          </View>

          <View style={styles.textCenter}>
            <Text style={styles.mainTitle}>{title}</Text>
            <Text style={styles.subText}>{subText}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              disabled={isProcessing}
              onPress={onCancel} 
              style={[styles.btn, styles.btnCancel]}
              activeOpacity={0.7}
            >
              <Text style={styles.btnTextGray}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              disabled={isProcessing}
              onPress={onConfirm} 
              style={[styles.btn, isDelete ? styles.btnConfirmRed : styles.btnConfirmGreen]}
              activeOpacity={0.8}
            >
              {isProcessing ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.btnTextWhite}>{confirmText}</Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    // Professional Elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  bgRed: { backgroundColor: '#FFF5F5' },
  bgGreen: { backgroundColor: '#F0FFF4' },
  innerIcon: {
    width: 44,
    height: 44,
  },
  textCenter: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
  },
  btn: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  btnCancel: {
    backgroundColor: '#F5F5F7',
  },
  btnConfirmRed: {
    backgroundColor: '#D32F2F',
  },
  btnConfirmGreen: {
    backgroundColor: '#00b828',
  },
  btnTextGray: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666666',
  },
  btnTextWhite: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default ConfirmModal;