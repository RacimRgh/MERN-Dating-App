import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DescriptionTab from '../components/DescriptionTab';
import GoutsTab from '../components/GoutsTab';
import AstroTab from '../components/AstroTab';
import HousesTab from '../components/HousesTab';

const ProfileTabs = (props) => {
  const { activeTab, data } = props;
  return activeTab == 1 ? (
    <HousesTab fullState={data} />
  ) : activeTab == 2 ? (
    <AstroTab fullState={data} />
  ) : activeTab == 3 ? (
    <DescriptionTab fullState={data} />
  ) : activeTab == 4 ? (
    <GoutsTab fullState={data} />
  ) : (
    <AstroTab fullState={data} />
  );
};

const styles = StyleSheet.create({
  icons: {
    margin: 20,
    padding: 10,
    height: 40,
    width: 45,
    resizeMode: 'contain',
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  divider: {
    marginTop: 10,
    borderBottomColor: '#ccffff',
    borderBottomWidth: 1,
  },
});

export default ProfileTabs;
