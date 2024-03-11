import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../screens/admin/AdminDashboard';
import Login from '../screens/login/Login';
import ViewUser from '../screens/admin/ViewUser';
import ViewStore from '../screens/admin/ViewStore';
import ViewSector from '../screens/admin/ViewSector';

// Crie o navegador raiz
const Stack = createStackNavigator();

// Em seguida, defina suas telas e navegue entre elas

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ViewUser" component={ViewUser} />
        <Stack.Screen name="ViewStore" component={ViewStore} />
        <Stack.Screen name="ViewSector" component={ViewSector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;