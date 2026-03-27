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
  const navigation: any = useNavigation();

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

  // ✅ QR Scanner Logic
  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async codes => {
      if (!isScanning) return; 

      for (const code of codes) {
        setIsScanning(false);

        try {
          const data = code.value?.trim();
          if (!data) throw new Error('Invalid QR');

          const parts = data.split('/');
          const tableNumber = parts[parts.length - 1];
          setTargetTable(tableNumber);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Invalid table QR code');
          setIsScanning(true);
        }
      }
    },
  });

  if (!device)
    return <Text style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>Loading camera...</Text>;

  if (!hasPermission)
    return <Text style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>No camera permission</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        torch={flash}
        codeScanner={isScanning ? codeScanner : undefined}
      />

      <View style={styles.topRow}>
        <Text style={styles.scanTitle}>SCAN TABLE QR</Text>
      </View>

      <View style={styles.overlay}>
        <View style={styles.overlayTop} />
        <View style={styles.row}>
          <View style={styles.overlaySide} />
          <View style={styles.scanFrame} />
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />

        <View style={styles.flashContainer}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}
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

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BOX_SIZE = 260;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  topRow: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  scanTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  scanFrame: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  overlayTop: { flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' },
  overlayBottom: { flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' },
  overlaySide: { width: (SCREEN_WIDTH - BOX_SIZE) / 2, height: BOX_SIZE, backgroundColor: 'rgba(0,0,0,0.6)' },
  flashContainer: { position: 'absolute', bottom: 100, width: '100%', alignItems: 'center' },
  smallButton: { backgroundColor: 'orange', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default TableQrScanner;
