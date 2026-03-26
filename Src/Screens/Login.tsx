import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
  CodeScanner,
  getCameraDevice,
} from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { useGetTable } from '../Hooks/table';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTableNumberStore } from '../store/TableNumberStore';

const TableQrScanner: React.FC = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [flash, setFlash] = useState<'off' | 'on'>('off');

  const setTableNumber = useTableNumberStore(
    state => state.setTableNumber,
  );

  const [targetTable, setTargetTable] = useState<string | null>(null);

  const { data: tableResponse, isFetching, error: tableError } = useGetTable(targetTable || '', !!targetTable && isScanning === false);

  useEffect(() => {
    if (tableResponse) {
      console.log('Table response:', tableResponse);
      const tableNumber = tableResponse?.tableNumber;

      if (tableNumber) {
        setTableNumber(tableNumber);
        navigation.navigate('TabNavigatort', {
          screen: 'Home',
        });
      } else {
        Alert.alert('Error', 'Table number missing');
        setIsScanning(true);
        setTargetTable(null);
      }
    }
  }, [tableResponse]);

  useEffect(() => {
    if (tableError) {
      console.error(tableError);
      const message = (tableError as any)?.error?.message || 'Invalid QR code';
      Alert.alert('Error', message);
      setIsScanning(true);
      setTargetTable(null);
    }
  }, [tableError]);

  const devices = useCameraDevices();
  const device = getCameraDevice(devices, 'back');

  // ✅ Request camera permission
  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };
    getPermissions();
  }, []);

  // ✅ QR Scanner Logic (UPDATED)
  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async codes => {
      if (!isScanning) return; // prevent multiple scans

      for (const code of codes) {
        setIsScanning(false);

        try {
          const data = code.value?.trim();
          if (!data) throw new Error('Invalid QR');

          const parts = data.split('/');
          const tableNumber = parts[parts.length - 1];


          const payload = {tableNumber :tableNumber}
          setTargetTable(tableNumber);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Invalid table QR code');
          setIsScanning(true);
        }
      }
    },
  });

  // ✅ UI States
  if (!device)
    return <Text style={{ color: 'white' }}>Loading camera...</Text>;

  if (!hasPermission)
    return <Text style={{ color: 'white' }}>No camera permission</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        torch={flash}
        codeScanner={isScanning ? codeScanner : undefined}
      />

      {/* 🔝 Top */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} />
        <Text style={styles.scanTitle}>SCAN TABLE QR</Text>
      </View>

      {/* 🔲 Overlay */}
      <View style={styles.overlay}>
        <View style={styles.overlayTop} />

        <View style={styles.row}>
          <View style={styles.overlaySide} />

          <View style={styles.scanFrame} />

          <View style={styles.overlaySide} />
        </View>

        <View style={styles.overlayBottom} />

        {/* 🔦 Flash Button */}
        <View style={styles.flashContainer}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() =>
              setFlash(flash === 'off' ? 'on' : 'off')
            }
          >
            <Text style={styles.buttonText}>
              {flash === 'off' ? 'Light' : 'Light On'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const BOX_SIZE = 260;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  topRow: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 80,
    alignItems: 'center',
    zIndex: 10,
  },

  scanTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scanFrame: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },

  overlayTop: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  overlayBottom: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  overlaySide: {
    width: 100,
    height: BOX_SIZE,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  flashContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },

  smallButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default TableQrScanner;