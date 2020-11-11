import {StyleSheet} from 'react-native';
import Colors from '../Themes/Colors';

const listStyle = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: 'center',
  },
  container: {
    marginVertical: 25,
    marginHorizontal: 25,
  },
  titleText: {
    color: Colors.text,
    fontSize: 27,
    marginTop: 30,
  },
  text: {
    color: Colors.text,
    fontSize: 21,
  },
  item: {
    backgroundColor: Colors.card,
    padding: 35,
    marginVertical: 20,
    marginHorizontal: 16,
  },
});

export {listStyle};
