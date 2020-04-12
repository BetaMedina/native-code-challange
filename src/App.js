import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    
    const repositoriesUpdated = repositories.map(repository => {
     
      if (repository.id === id) {
        return response.data;
      } 

      return repository;
    });

    setRepositories(repositoriesUpdated);
  }

  getAllRepositories = () => {
    api.get("repositories").then(res => {
      setRepositories(res.data);
    });
  };

  useEffect(() => {
    getAllRepositories();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={repository => repository.id}
          data={repositories}
          renderItem={({ item:repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              {repository.techs.map((res, index) => (
                <View key={index} style={styles.techsContainer}>
                  <Text style={styles.tech}>{res}</Text>
                </View>
              ))}

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1"
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold"
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff"
  },
  likesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  likeText: {
    fontWeight: "bold"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "red"
  }
});
