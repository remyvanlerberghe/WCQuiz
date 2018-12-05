import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { Query } from 'react-apollo';
import { getDataForWorldCup } from './api';

export default class WorldCup extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.year + ' World Cup',
    };
  };

  render() {
    return (
      <ScrollView>
        <Query query={getDataForWorldCup(this.props.navigation.state.params.year)}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :(</Text>;
            return (
              <List.Section title="Games">
                {data.worldcups[0].matches
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(({ homeTeam, awayTeam, homeScore, awayScore, round }, key) => {
                    return (
                      <List.Item
                        key={`match${key}`}
                        title={
                          <Text>{`${homeTeam.name} ${homeScore} vs. ${
                            awayTeam.name
                          } ${awayScore}`}</Text>
                        }
                        description={round}
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
