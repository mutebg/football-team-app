var React = require('react-native');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  TouchableOpacity,
} = React;

var MenuButton = React.createClass({
  handlePress: function(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  },

  render: function() {
    return (
      <TouchableOpacity onPress={this.handlePress.bind(this)} >
          <Icon
            name='material|menu'
            size={32}
            color='#ffffff'
            style={styles.menuButton}
          />
      </TouchableOpacity>
    );
  }
});

MenuButton.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

var styles = {
  menuButton: {
    margin: 10,
    height: 32,
    width: 32,
  },
}

module.exports = MenuButton;
