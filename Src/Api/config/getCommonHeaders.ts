import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

let commonHeadersPromise: Promise<Record<string, string>> | null = null;

export async function getCommonHeaders() {
  if (!commonHeadersPromise) {
    commonHeadersPromise = (async () => {
      const platform = Platform.OS.toLocaleUpperCase();
      const appVersion = DeviceInfo.getVersion();
      const deviceUUID = await DeviceInfo.getUniqueId();
      const installDate = await DeviceInfo.getFirstInstallTime();

      return {
        platform,
        app_version: appVersion,
        device_uuid: deviceUUID,
        'x-source': 'APP',
        installation_date: new Date(installDate).toISOString(),
      };
    })();
  }

  return commonHeadersPromise;
}
