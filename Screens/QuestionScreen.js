import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import Questions from '../AllQuestions';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const QuestionScreen = () => {
    const navigation=useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(299); // Total time in seconds (10 minutes)
  const [submit, setSubmit] = useState(false);
  const [optionArray, setOptionArray] = useState([]);
  const [optionTextArray,setoptionTextArray]=useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function HandlePress(optionId, selectedOption) {
    setSelectedId(optionId);
    setOptionArray([...optionArray, optionId]);
    if (selectedOption === Questions[index].answer) {
      setScore((prevScore) => prevScore + 1);
      setoptionTextArray([...optionTextArray,"good"]);
    }
    else
    {
      setoptionTextArray([...optionTextArray,"wrong"]);
    }
  }

  const HandleSubmit = () => {
    navigation.navigate('result',{
        score:score,
        optionArray:optionArray,
        optionTextArray:optionTextArray
    })
    setSubmit(true);
  };

  const minute = Math.floor(time / 60);
  const second = time % 60;

  const renderItems = ({ item }) => {
    return (
      <View key={item.id} style={styles.question_container}>
        <View style={styles.question_header}>
          <Text style={styles.question_number}>{item.id}.</Text>
          <Text style={styles.question}>{item.question}</Text>
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
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {submit === false ? (
          <View>
            <View style={styles.timer_view}>
              <Text style={styles.timer_text}>Remaining Time</Text>
              <Icon name="clockcircleo" size={20} />
              <View style={styles.time_display}>
                {minute < 10 ? <Text style={styles.time_text}>0</Text> : null}
                <Text style={styles.time_text}>{minute}</Text>
                <Text style={styles.time_text}>:</Text>
                {second < 10 ? <Text style={styles.time_text}>0</Text> : null}
                <Text style={styles.time_text}>{second}</Text>
              </View>
            </View>

            <View style={styles.question_container}>
              <View style={styles.question_header}>
                <Text style={styles.question_number}>{Questions[index].id}.</Text>
                <Text style={styles.question}>{Questions[index].question}</Text>
              </View>
              <View style={styles.all_option}>
                {['option1', 'option2', 'option3', 'option4'].map((option, idx) => (
                  <View key={idx} style={styles.radio_btn}>
                    <Text style={styles.options}>{`${String.fromCharCode(97 + idx)}) ${Questions[index][option]}`}</Text>
                    <RadioButton
                      value={idx + 1}
                      status={selectedId === idx + 1 ? 'checked' : 'unchecked'}
                      onPress={() => HandlePress(idx + 1, Questions[index][option])}
                      color="grey"
                    />
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.buttonsGroup}>
              <TouchableOpacity
                style={[styles.btns, { backgroundColor: index === 0 ? '#a3a39f' : 'black' }]}
                onPress={() =>{ setIndex(index - 1)}}
                disabled={index === 0}
              >
                <Icon name="doubleleft" color={'white'} marginTop={4} size={18} />
                <Text style={styles.btn_text}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btns, { backgroundColor: index < Questions.length - 1 ? '#50C878' : '#a6f8c2' }]}
                onPress={() => {
                  setIndex(index + 1);
                  setSelectedId(null);
                }}
                disabled={index >= Questions.length - 1}
              >
                <Text style={styles.btn_text}>Next</Text>
                <Icon name="doubleright" size={18} marginTop={4} color={'white'} />
              </TouchableOpacity>
            </View>

            {index === Questions.length - 1 && (
              <View style={styles.buttonsGroup}>
                <TouchableOpacity style={styles.Submit_btn} onPress={HandleSubmit}>
                  <Text style={styles.btn_text}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text>{score}/{Questions.length}</Text>
            <FlatList
              data={Questions}
              renderItem={renderItems}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  question_container: {
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
    fontSize: 18,
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
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5,
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
