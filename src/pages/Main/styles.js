import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: metrics.basePadding * 2,
  },

  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },

  instructions: {
    color: colors.light,
    fontSize: 14,
    marginTop: metrics.baseMargin,
    textAlign: 'center',
  },

  logo: {
    height: metrics.screenHeight * 0.1,
    marginBottom: metrics.baseMargin * 2,
  },

  welcome: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
