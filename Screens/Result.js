import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import Questions from '../AllQuestions';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo'
const Result = ({route,navigation}) => {
    const [view,setView]=useState(false);
    const {score,optionArray,optionTextArray}=route.params;
  console.log('====================================');
  console.log(optionTextArray);
  console.log('====================================');

  const renderItems = ({ item }) => {
    return (
      <View key={item.id} style={styles.question_container}>
        <View style={styles.question_header}>
          {
            optionTextArray[item.id-1]==='good'?<Icon2 name='check'  marginTop={12} size={18} color={'green'} />:          <Icon2 name='cross' marginTop={12} size={20} color={'red'} />
          }
          <Text style={[styles.question_number,{color:optionTextArray[item.id-1]==='good'?'green':'red'}]}>{item.id}.</Text>
          <Text style={[styles.question,{color:optionTextArray[item.id-1]==='good'?'green':'red'}]}>{item.question}</Text>
        </View>
        <View style={styles.all_option}>
          {['option1', 'option2', 'option3', 'option4'].map((option, idx) => (
            <View key={idx} style={styles.radio_btn}>
              <Text style={styles.options}>{`${String.fromCharCode(97 + idx)}) ${item[option]}`}</Text>
              <RadioButton
                value={idx + 1}
                status={optionArray[item.id - 1] === idx + 1 ? 'checked' : 'unchecked'}
                color="grey"
              />
            </View>
          ))}
        </View>
        <Text style={{color:'black'}}>ans: {item.answer}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {
            view===false?
        <View style={styles.question_container2}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>Test Submited Successfully</Text>
            <Text style={{fontSize:20,color:'black',marginVertical: 20,}}>Total Score : {score}/{Questions.length}</Text>
            <TouchableOpacity style={styles.btns} onPress={()=>setView(true)}>
                <Text style={styles.btn_text}>View Result</Text>
            </TouchableOpacity>
        </View>:
      <FlatList
              data={Questions}
              renderItem={renderItems}
              keyExtractor={(item) => item.id.toString()}
            /> 
        }
      </View>
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  question_container: {
    height: 300,
    padding: 10,
    borderWidth:0.2,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical:5
  },
  question_container2: {
    height: 270,
    padding: 10,
    borderWidth:0.2,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems:'flex-start',
    justifyContent:'center'
  },
  radio_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  question_header: {
    flexDirection: 'row',
  },
  question_number: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    marginVertical: 10,
  },
  question: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'blue',
    marginVertical: 10,
  },
  options: {
    color: 'black',
  },
  all_option: {
    padding: 10,
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    gap: 40,
  },
  btns: {
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    gap: 5,
    backgroundColor:'blue'
  },
  btn_text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  Submit_btn: {
    padding: 10,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  timer_view: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  timer_text: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
  },
  time_display: {
    flexDirection: 'row',
  },
  time_text: {
    fontSize: 22,
  },
});
