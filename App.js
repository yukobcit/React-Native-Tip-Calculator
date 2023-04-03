import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import { scale } from 'react-native-size-matters'; 
import {FlatList, SafeAreaView, TouchableOpacity} from 'react-native'

export default function App() {
  const [bill, setBill] = useState(0.00);
  const [selectedTip, setSelectedTip] = useState('');
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0.00);

  const tips = [
    { id: '1', percent: '10%' },
    { id: '2', percent: '15%' },
    { id: '3', percent: '18%' },
    { id: '4', percent: '20%' },
  ];
  
  const handleGenerateBill = () => {
    const randomBill = (Math.random() * 1000).toFixed(2);
    setBill(randomBill);
  };
  
  const handleTipSelection = (percent) => {
    setSelectedTip(percent);
  };

  useEffect(() => {
    if(!selectedTip) return;
    const tipAmount = (bill * parseFloat(selectedTip)) / 100;
    setTip(tipAmount.toFixed(2));
    setTotal((parseFloat(bill) + parseFloat(tipAmount)).toFixed(2));
  }, [bill, selectedTip]);

  const renderTip = ({ item }) => (
    <TouchableOpacity
      style={selectedTip === item.percent ? styles.selectedTipButton : styles.tipButton}
      onPress={() => handleTipSelection(item.percent)}
    >
      <Text style={selectedTip === item.percent ? styles.selectedTipText : styles.tipText}>
        {item.percent}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}> Tip Calculator </Text>

      <View style={styles.inputContainer}>       
      <TextInput
        placeholder="Enter Bill Amount"
        style={styles.billInput}
        value={bill.toString()}
        onChangeText={(bill) => setBill(bill)}
      ></TextInput>
       <TouchableOpacity onPress={handleGenerateBill} style={styles.generateButton}>
          <Text style={styles.buttonText}>Generate Bill</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={tips}
        renderItem={renderTip}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.tipsContainer}
      />
    <View style={styles.resultContainer}>       
    <Text style={styles.resultText}>Tip Amount: ${tip}</Text>
    <Text style={styles.resultText}>Total Bill: ${total}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  title:{
    fontSize: scale(20),
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  billInput: {
    height: 60,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    fontSize: scale(16),
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    height: 60,
    borderRadius: 5,
    marginLeft: 10,
    padding: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
  },
  tipsContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  tipButton: {
    backgroundColor: '#ddd',
    padding: 20,
    borderRadius: 10,
    width: '45%',
    marginBottom: 20,
  },
  selectedTipButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    width: '45%',
    marginBottom: 20,
  },
  tipText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  selectedTipText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  resultContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'flex-end',
  },
  resultText: {
    fontSize: scale(16),
    color: '#333',
    textAlign: 'center',
    margin: 10,
  },


});