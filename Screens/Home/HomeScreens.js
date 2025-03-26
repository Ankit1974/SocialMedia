import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image , KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const chats = [
  {
    id: '1',
    name: 'Alex Johnson',
    message: 'Hey! Are we still on for...',
    time: '2:45 PM',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'Emily Clark',
    message: "I'll send the documents...",
    time: '1:30 PM',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Michael Brown',
    message: 'Can we reschedule our...',
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    unreadCount: 5,
  },
];

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.time}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" />
        <TextInput placeholder="Search chats..." style={styles.searchInput} />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList data={chats} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4F46E5',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 15,
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#F2F3FF', 
    borderRadius: 46,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 46,
    // Elevation for Android
    elevation: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#888',
  },
  unreadBadge: {
    backgroundColor: '#4F46E5',
    borderRadius: 15,
    width: 24,
    height: 24,
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default HomeScreen;






