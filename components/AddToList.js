import React from 'react'
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import FirebaseWrapper from '../firebase/firebase'

export default class AddToListModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: this.props.visible || false,
      mediaType: this.props.mediaType || '',
      item: this.props.item || {}
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(listType){
    FirebaseWrapper.getInstance().addMedia(this.state.mediaType, listType, this.state.item)
  }

  render() {
    <View style={styles.container}>
    <Modal
      visible={this.props.visible}
      onTouchOutside = {()=>{
        this.setState({visible: false})
      }}
      width={.75}
    >
    <ModalContent>
      <ModalButton
        text="Add to Current"
        onPress={() => {this.handleClick('current')}}
      />
      <ModalButton
        text="Add to Plan to"
        onPress={() => {this.handleClick('planTo')}}
      />
      <ModalButton
        text="Add to Completed"
        onPress={() => {this.handleClick('completed')}}
      />
      <ModalButton
        text="Add to Dropped"
        onPress={() => {this.handleClick('dropped')}}
      />
      <ModalButton
        text="Add to On Hold"
        onPress={() => {this.handleClick('onHold')}}
      />
    </ModalContent>
  </Modal>
</View>
  }
}

<View style={styles.container}>
  <Modal
    visible={this.state.visible}
    footer={
      <ModalFooter>
        <ModalButton
          text="CANCEL"
          onPress={() => {}}
        />
        <ModalButton
          text="OK"
          onPress={() => {}}
        />
      </ModalFooter>
    }
  >
    <ModalContent>
      {...}
    </ModalContent>
  </Modal>
</View>
