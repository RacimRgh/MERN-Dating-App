import React, { useContext } from 'react';
import {
  View,
  ScrollView,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const EditSection = (props) => {
  const { sectionTitle, data } = props;
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{sectionTitle}</Text>
        <View style={styles.divider} />
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View>
              <View style={styles.content}>
                <TextInput
                  placeholder={item !== undefined ? item : 'Pas mentionné'}
                  style={styles.contentText}
                  selectionColor="#757575"
                />
                <Icon
                  size={25}
                  name="arrow-right"
                  color="black"
                  type="SimpleLineIcons"
                />
              </View>
              {sectionTitle === 'Passions et goûts' ? (
                <TouchableOpacity>
                  <View style={styles.addButton}>
                    <Text style={styles.contentText}>Ajouter une passion</Text>
                    <Icon
                      size={25}
                      name="plus"
                      color="black"
                      type="SimpleLineIcons"
                    />
                  </View>
                </TouchableOpacity>
              ) : undefined}
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.title}>
              <Text style={styles.titleStyle}>{title.toUpperCase()}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.saveButtonStyle}>
          <Text style={styles.title}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    backgroundColor: '#fbe7c2',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: 15,
    marginTop: 5,
  },
  content: {
    backgroundColor: 'white',
    borderBottomStartRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginBottom: 10,
    marginTop: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
  contentText: {
    marginTop: 3,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 17,
  },
  saveButtonStyle: {
    zIndex: 9,
    height: 45,
    width: 100,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fbe7c2',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default EditSection;
