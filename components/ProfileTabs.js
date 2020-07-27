import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DescriptionTab from '../components/DescriptionTab';
import GoutsTab from '../components/GoutsTab';
import AstroTab from '../components/AstroTab';

const ProfileTabs = (props) => {
  const { activeTab } = props;
  return activeTab == 1 ? (
    <AstroTab />
  ) : activeTab == 2 ? (
    <AstroTab />
  ) : activeTab == 3 ? (
    <DescriptionTab />
  ) : activeTab == 4 ? (
    <GoutsTab />
  ) : (
    <AstroTab />
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
