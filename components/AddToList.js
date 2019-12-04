import React from 'react'
//import Modal from 'react-native-modal'
import { View, StyleSheet, Button, Modal } from 'react-native'
import FirebaseWrapper from '../firebase/firebase'

export default class AddToListModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible || false,
      mediaType: this.props.mediaType || '',
      item: this.props.item || {},
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({ visible: this.props.visible })
    }
    if (this.props.mediaType !== prevProps.mediaType) {
      this.setState({ mediaType: this.props.mediaType })
    }
    if (this.props.item !== prevProps.item) {
      this.setState({ item: this.props.item })
    }
  }
  handleClick(listType) {
    FirebaseWrapper.getInstance().addMedia(
      this.state.mediaType,
      listType,
      this.state.item
    )
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        hasBackdrop={true}
        onBackdropPress={() => {
          this.setState({ visible: false })
          this.props.toggleModal()
        }}
      >
        <View style={styles.container}>
          <Button
            title='Add to Current'
            onPress={() => {
              this.handleClick('current')
              this.props.toggleModal()
            }}
          />
          <Button
            title='Add to Plan to'
            onPress={() => {
              this.handleClick('planTo')
              this.props.toggleModal()
            }}
          />
          <Button
            title='Add to Completed'
            onPress={() => {
              this.handleClick('completed')
              this.props.toggleModal()
            }}
          />
          <Button
            title='Add to Dropped'
            onPress={() => {
              this.handleClick('dropped')
              this.props.toggleModal()
            }}
          />
          <Button
            title='Add to On Hold'
            onPress={() => {
              this.handleClick('onHold')
              this.props.toggleModal()
            }}
          />
          <Button title='close' onPress={() => this.props.toggleModal()} />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
})
