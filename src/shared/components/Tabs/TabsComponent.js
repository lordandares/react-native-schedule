import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Touchable from '../Touchable/Touchable';
import tabsComponentStyles from './TabsComponent.style';
import { withStyles } from '../../withStyles';

type Props = {
  styles: any,
  children: any,
  activeTab: Number,
};

export class TabsComponent extends PureComponent<Props> {
  static defaultProps = {
    activeTab: 0,
  };

  handleIndexChanged = (relIndex) => {
    const { setActiveTab } = this.props;
    if (setActiveTab) { setActiveTab(relIndex); } else {
      // eslint-disable-next-line no-console
      console.tron.error('Tab index changed, but setActiveTab callback was not set.');
    }
  };

  render() {
    const { styles, children, activeTab }: Props = this.props;
    const filteredChildren = children.filter(child => !!child);

    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {filteredChildren.map(({ props: { tab: { label } } }, index) => (
            <Touchable
              key={label}
              style={styles.tabsContainer}
              onPress={() => {
                  if (index !== activeTab) {
                    this.swiper.scrollBy(index - activeTab);
                  }
                }}
            >
              <View style={[styles.tabContainer, index === activeTab ? styles.tabContainerActive : []]}>
                <Text style={[styles.tabText, index === activeTab ? styles.tabTextActive : []]}>
                  {label}
                </Text>
              </View>
            </Touchable>
          ))}
        </View>
        <Swiper
          onIndexChanged={this.handleIndexChanged}
          loop={false}
          index={activeTab}
          showsPagination={false}
          ref={(swiper) => { this.swiper = swiper; }}
          removeClippedSubviews={false}
        >
          {filteredChildren.map(child => (
            <View style={styles.contentContainer} key={child.props.tab.index}>
              {child}
            </View>))}
        </Swiper>
      </View>
    );
  }
}

export default withStyles(tabsComponentStyles)(TabsComponent);
