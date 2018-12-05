import React, { Component } from 'react';
import { Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import { Query } from 'react-apollo';
import { convertIocCode } from 'convert-country-codes';
import { getAllWorldCups } from './api';
export default class Home extends Component {
  static navigationOptions = {
    title: 'Choose the World Cup',
  };

  getFlag = code => {
    const isoCodes = convertIocCode(code);
    if (!isoCodes) return `https://www.countryflags.io/eu/shiny/64.png`;
    else return `https://www.countryflags.io/${isoCodes.iso2}/shiny/64.png`;
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Query query={getAllWorldCups}>
          {({ loading, error, data }) => {
            if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
            if (error) return <Text>Error :(</Text>;
            return (
              <List.Section title="World Cups">
                {data.worldcups.map(({ name, year, host }, key) => {
                  return (
                    <List.Item
                      key={`match${key}`}
                      title={name}
                      onPress={() => this.props.navigation.navigate('WorldCup', { year })}
                      right={() => (
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={{
                            uri: this.getFlag(host[0].code),
                          }}
                        />
                      )}
                    />
                  );
                })}
              </List.Section>
            );
          }}
        </Query>
      </ScrollView>
    );
  }
}
