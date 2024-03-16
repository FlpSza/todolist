import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../screens/admin/AdminDashboard';
import Login from '../screens/login/Login';
import ViewUser from '../screens/admin/ViewUser';
import ViewStore from '../screens/admin/ViewStore';
import ViewSector from '../screens/admin/ViewSector';
import CadUser from '../screens/admin/CadUser'
import CadStore from '../screens/admin/CadStore'
import CadSector from '../screens/admin/CadSector'
import AsgDashboard from '../screens/users/AsgDashboard';
import CadPergunta from '../components/CadPergunta';
import BarDashboard from '../screens/users/BarDashboard'
import CaixaDashboard from '../screens/users/CaixaDashboard'
import CozinhaDashboard from '../screens/users/CozinhaDashboard'
import SalaoDashboard from '../screens/users/SalaoDashboard'
import ProducaoDashboard from '../screens/users/ProducaoDashboard'
import Asg from '../screens/checklist/Asg'


// Crie o navegador raiz
const Stack = createStackNavigator();

// Em seguida, defina suas telas e navegue entre elas

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="AsgDashboard" component={AsgDashboard}/>
        <Stack.Screen name="BarDashboard" component={BarDashboard}/>
        <Stack.Screen name="CaixaDashboard" component={CaixaDashboard}/>
        <Stack.Screen name="CozinhaDashboard" component={CozinhaDashboard}/>
        <Stack.Screen name="SalaoDashboard" component={SalaoDashboard}/>
        <Stack.Screen name="ProducaoDashboard" component={ProducaoDashboard}/>
        <Stack.Screen name="ViewUser" component={ViewUser} />
        <Stack.Screen name="ViewStore" component={ViewStore} />
        <Stack.Screen name="ViewSector" component={ViewSector} />
        <Stack.Screen name="CadUser" component={CadUser}/>
        <Stack.Screen name="CadStore" component={CadStore}/>
        <Stack.Screen name="CadSector" component={CadSector}/>
        <Stack.Screen name= "CadPergunta" component={CadPergunta}/>
        <Stack.Screen name= "Asg" component={Asg}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
