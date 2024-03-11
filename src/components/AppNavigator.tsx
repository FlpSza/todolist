import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../screens/admin/AdminDashboard';
import Login from '../screens/login/Login';
import CadUser from '../screens/admin/CadUser';
import CadStore from '../screens/admin/CadStore';
import CadSector from '../screens/admin/CadSector';

// Crie o navegador raiz
const Stack = createStackNavigator();

// Em seguida, defina suas telas e navegue entre elas

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CadUser" component={CadUser} />
        <Stack.Screen name="CadStore" component={CadStore} />
        <Stack.Screen name="CadSector" component={CadSector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
