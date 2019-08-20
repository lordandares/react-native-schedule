// @flow
import React from 'react';
import { Text, View } from 'react-native';
import i18n from '../../../../shared/i18n/i18next';
import CustomIcon from '../../../../shared/customIcons/NextIcons';
import theme from '../../../../shared/theme';
import type { SiteSelectProps } from '../SiteSelect.types';
import Touchable from '../../../../shared/components/Touchable/Touchable';

import COMMON from '../../../../shared/constants/common';

function CustomerDetails(props: any) {
  const { styles, site } = props;
  return (
    <View style={styles.customerContainer}>
      <Text style={styles.sectionSubtitle}>{i18n.translate(COMMON.ADDRESS)}</Text>
      <Text
        id="address"
        style={styles.sectionContent}
      >
        {`${site.address1} ${site.city} ${site.state} ${site.zipCode}`}
      </Text>
      <Text style={styles.sectionSubtitle}>{i18n.translate(COMMON.CUSTOMER)}</Text>
      <Text id="customer" style={[styles.sectionContent, styles.sectionContentPrimary]}>{site.customerName}</Text>
    </View>
  );
}

function EmptySite(props: any) {
  const { styles } = props;
  return (
    <View style={styles.emptySiteContainer}>
      <CustomIcon name="sites" size={theme.size.unit * 16} color={theme.palette.grey.A100} style={styles.emptyIcon} />
    </View>
  );
}

function SiteSelect(props: SiteSelectProps) {
  const { styles } = props;
  const { site } = props.viewModel;
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{i18n.translate(COMMON.CUSTOMER_SITE).toUpperCase()}</Text>
      <Touchable disabled={!props.viewModel.isEnabled} onPress={props.viewModel.onSitePressed}>
        <View style={styles.siteContainer}>
          <CustomIcon name="sites" size={theme.size.unit24} color={theme.palette.grey[200]} />
          <Text style={props.viewModel.isEnabled ? styles.siteText : styles.disabledSiteText}>
            {site ? site.name : i18n.translate(COMMON.SELECT_SITE)}
          </Text>
          <View style={styles.spacer} />
          {props.viewModel.isEnabled && <CustomIcon
            name="caretright"
            style={styles.caret}
            size={theme.size.unit16}
            color={theme.palette.common.darkBlue}
            id="caret"
          />}
        </View>
      </Touchable>
      {site ?
        <CustomerDetails styles={styles} site={site} />
        :
        <EmptySite styles={styles} />
      }
    </View>
  );
}


export default SiteSelect;
