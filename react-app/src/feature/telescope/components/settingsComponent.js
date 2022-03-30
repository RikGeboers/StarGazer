import { IndexPath, Select, SelectItem, Card, Text, Divider } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import TelescopeService from '../../../services/external/telescope.service';
import { StyleSheet, View } from 'react-native';

export const SettingsComponent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  useEffect(() => {
    async function setTelescope() {
      await TelescopeService.setTelescope(props.telescopes[selectedIndex.row])
    }
    setTelescope()
  }, [selectedIndex]);

  return (
    <Card style={styles.card} header={Header}>
      <Text>
        If your telescope is not visible in the list below, it means that your telescope is not supported.
      </Text>
      <Divider style={styles.divider}/>
      <Select
        value={props.telescopes[selectedIndex.row]}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {props.telescopes.map((element => (
        <SelectItem title={element} key={element}/>
      )))}
      </Select>
    </Card>
  );
};

const Header = (props) => (
  <View {...props}>
      <Text category='h6'>Select your telescope</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
      margin: 10
  },
  divider: {
      marginBottom: 10,
      marginTop: 10,
  },
});
