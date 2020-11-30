import AsyncStorage from "@react-native-async-storage/async-storage";

const loadOfflineData = async (type:string) => {
  try {
    const value = await AsyncStorage.getItem(type);
    if (value === null)
      return '[]'
    console.log('loading offline data: ', value)
    return value as string;
  } catch (error) {
    console.log(error);
    return error as string
  }
}
const saveOfflineData = async (type:string, value:string) => {
  try {
    console.log(`trying to save recent ${type} fetch to cache: `, value)
    const saved = await AsyncStorage.setItem(type, value);
    return saved;
  } catch (error) {
    console.log(error);
  }  
}

export {
  loadOfflineData,
  saveOfflineData
}