import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Modal} from 'react-native'
import FirebaseWrapper from '../firebase/firebase'
import t from 'tcomb-form-native'
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';

// figure out auth

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};



export default function SignUpLogin(){
return (
    <View>

    <AuthModal type='Sign Up' handleSubmit={(email, password)=> FirebaseWrapper.getInstance().createUserEmailPassword(email, password)}/>
    <AuthModal type='Log in' handleSubmit={(email, password)=> FirebaseWrapper.getInstance().signInEmailPassword(email, password)}/>

    </View>

)

}

class AuthModal extends Component{
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  setModalVisible (visible){
    this.setState({modalVisible: visible})
  }

  handleSubmit(props){
    console.log('ARE THESE MY PROPS', props)
    this.props.handleSubmit(props.email, props.password)
  }

  render (){
  return (
    <View >
      <Modal
      animationType="slide"
      transparent={false}
      visible= {this.state.modalVisible} >
        <View style={styles.container}>
          {/* <Text> [x] </Text> */}
          <Form
          ref = { c => this._form = c}
          type={ User }
          options={ options }/>
          <Button
          title={this.props.type}
          onPress={()=> this.handleSubmit(this._form.getValue())} />
        </View>
      </Modal>

<View>
  <Button title={this.props.type} onPress={()=> this.setModalVisible(true)}/>
</View>

    </View>

  )
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1
  },

  formlabel: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }

})
