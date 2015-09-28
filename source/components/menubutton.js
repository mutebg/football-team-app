var React = require('react-native');
var { Icon } = require('react-native-icons');
var {
  StyleSheet,
  TouchableOpacity,
  Component,
} = React;

class MenuButton extends Component{

  constructor(props) {
    super(props);
    this.state = {
      icon: 'material|menu'
    };
  }

  componentDidMount() {
    if ( this.props.icon ) {
      this.setState({
        icon: 'material|' + this.props.icon
      })
    }
  }

  handlePress(e) {
    if ( this.props.icon == 'menu' || !this.props.icon ) {
      this.context.menuActions.toggle();
    }
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress.bind(this)} >
          <Icon
            name={this.state.icon}
            size={32}
            color='#ffffff'
            style={styles.menuButton}
          />
      </TouchableOpacity>
    );
  }
};

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
